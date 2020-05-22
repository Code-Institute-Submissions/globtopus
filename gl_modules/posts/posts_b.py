import datetime

from bson import ObjectId
from flask import Blueprint, request, jsonify, session, redirect, url_for, flash
from bson.json_util import dumps
from gl_modules.shared.sanitize import sanitize
from gl_modules.shared.today import today_f
from gl_modules.shared.update_feel import update_world_feel, update_country_feel
from gl_modules.user.user_b import feelists

posts_bp = Blueprint('posts_bp', __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='assets/posts')

"""USER CAN SEARCH FOR GLOBS, THAT OTHER GLOBBERS POSTED
MATCHED BY THE WAY HE FEELS AT THE MOMENT AND HE CAN SEE ACTIONS 
OTHER GLOBBERS TOOK WHEN THEY FELT THE SAME WAY

TO DO : ADD OPTION OF SELECTING COUNTRY FROM WHICH USER GETS GLOBS"""


@posts_bp.route('/create_post', methods=['POST'])
def create_post():
    """INSERTING INTO FEELS TABLE"""
    form_data = request.form.to_dict()
    if form_data['user_feel'] == '':
        flash('Please select how you feel!')

        return redirect(url_for('landing_bp.index'))

    from app import mongo
    """
       ADDING NEWLY CREATED POST TO USER'S POSTS ARRAY 
    """
    mongo.db.users.update(
        {"_id": ObjectId(session.get('user_id'))},
        {
            "$push": {
                "posts":
                    {"i_feel": sanitize(form_data['i_feel'], 'array'),
                     "because": sanitize(form_data['because'], 'array'),
                     "feel": form_data['user_feel'],
                     "action": form_data['action'],
                     "post_id": str(ObjectId()),
                     "created_at": datetime.datetime.now(),
                     }

            }
        }, True
    )

    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
      IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
       WITHOUT ADDING EXTRA PERSON TO THE MIX 
       - LAST FEELING + CURRENT FEELING"""

    update_world_feel(mongo, 0, int(form_data['user_feel']) - int(session.get('user_feel')))
    """updating user feel during the day, when he feels differently"""

    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'user_feel.' + today_f(): form_data['user_feel']}})

    """updating country feel"""
    update_country_feel(mongo, session.get("user_country_code"), 0,
                        int(form_data['user_feel']) - int(session.get('user_feel')))
    session['user_feel'] = form_data["user_feel"]

    flash('Thank you ' + session.get('user_name'))
    return redirect(url_for('landing_bp.index'))


@posts_bp.route('/update_post')
def update_post():
    post_id = request.args.get('post_id', 0, type=str)
    i_feel = request.args.get('i_feel', 0, type=str)
    because = request.args.get('because', 0, type=str)
    action = request.args.get('action', 0, type=str)

    from app import mongo
    mongo.db.users.update(
        {"_id": ObjectId(session.get('user_id')), "posts.post_id": post_id},
        {"$set": {"posts.$.i_feel": sanitize(i_feel, 'array'),
                  "posts.$.because": sanitize(because, 'array'),
                  "posts.$.action": action,
                  "posts.$.updated_at": datetime.datetime.now(),

                  }}
    )

    return jsonify(updated='updated')


@posts_bp.route('/_search')
def search():
    """sanitizing input and returning array of words"""
    q = sanitize(request.args.get('q', 0, type=str).lower(), 'array')  # array
    cc = request.args.get('cc', 0, type=str)

    results = []
    from app import mongo

    """SEARCHING DB FOR WORDS USER TYPES IN SEARCH BOX IN 
        1. i_feel FIELD
            ( HOW OTHER GLOBBERS FELT WHEN THEY WERE POSTING GLOB),
        2. because FIELD ( REASON WHY THEY FELT THAT WAY ) 
    
    AND WE WILL DISPLAY i_feel and because VALUES ALONG 
    ACTIONS GLOBBERS TOOK TO FEEL THAT WAY OR BETTER"""
    if cc and q :
        search_results = mongo.db.users.aggregate([

            {"$unwind": '$posts'},
            {"$match": {"$or": [

                                {"posts.i_feel": {"$in": q}},  # q is array
                                {"posts.because": {"$in": q}}
                                ],
                        "$and": [
                            {"cc": cc},


                        ]
            }}
            ,
            {"$sort": {"posts.created_at": -1}},
            {"$limit": 20}

        ])

    elif cc != '':
        search_results = mongo.db.users.aggregate([

            {"$unwind": '$posts'},
            {"$match": {"$or": [
                                {"cc": cc},
                                {"posts.i_feel": {"$in": q}},  # q is array
                                {"posts.because": {"$in": q}}
                                ],
                       }}
            ,
            {"$sort": {"posts.created_at": -1}},
            {"$limit": 20}

        ])

    else:

        search_results = mongo.db.users.aggregate([

            {"$unwind": '$posts'},
            {"$match": {"$or": [
                {"posts.i_feel": {"$in": q}},  # q is array
                {"posts.because": {"$in": q}}
            ]
               }}
            ,
            {"$sort": {"posts.created_at": -1}},
            {"$limit": 20}

        ])
    #return dumps(search_results)
    for result in search_results:
        results.append(
            {
                'id': str(result['posts']['post_id']),
                'name': str(result['name']),
                'in_my_glob': 1 if 'added_me' in result and session.get('user_id') in result['added_me'] else 0,
                'user_id': str(result['_id']),
                'user_feel': int(result['posts']['feel']),
                'i_feel': (result['posts']['i_feel']),
                'because': (result['posts']['because']),
                'action': str(result['posts']['action']),
                'created_at': result['posts']['created_at'],
                'likes': result['posts']['likes'] if 'likes' in result['posts'] else 0,
                'additions': result['posts']['additions'] if 'additions' in result['posts'] else 0,
                'flags': result['posts']['flags'] if 'flags' in result['posts'] else 0

            }
        )

    """RETURNING SEARCH RESULTS TO USER, IF HE IS LOGGED IN HE CAN INTERACT WITH THEM"""

    return jsonify(result=results,
                   feelists=session.get('my_feelists') if session.get('my_feelists') else {},
                   authorized_user=True if session.get('authorized_user') else False)


"""INTERACTIONS WITH ACTIONS"""
"""USER CAN INTERACT WITH ACTIONS :
       1.  LIKE IT
       2.  ADD IT TO HIS FEELIST
       3.  FLAG IT AS INAPPROPRIATE"""

"""@action_num => WHICH OF THE ACTIONS IS USER INTERACTING WITH
                    BECAUSE 1 GLOB CAN HAVE UP TO 3 ACTIONS
                    SO IF USER LIKES,ADDS,FLAGS
                    ACTIONS WE WILL STORE IT WITH  @action_num AND
    @glob_id SO THAT WE KNOW EXACTLY WHICH ACTION FROM THE GLOB IT IS"""


@posts_bp.route('/_actions')
def actions():
    post_id = request.args.get('post_id', 0, type=str)
    action = request.args.get('action', 0, type=str)
    feelist_name = request.args.get('feelist_name', 0, type=str)
    new_feelist = request.args.get('new_feelist', 0, type=str)

    """USER MUST BE AUTHORIZED TO BE ABLE TO INTERACT WITH ACTIONS"""
    if not session.get('authorized_user'):
        return jsonify(result='not_authorized')

    """
       CHECK IF USER ALREADY LIKED/ADDED/FLAGGED POST 
    """

    added_to_feelist = False
    liked_or_flagged = False

    from app import mongo

    # if action == 'additions':
    #     added_to_feelist = mongo.db.users.find_one(
    #         {"_id": ObjectId(session.get('user_id')), "my_feelists." + feel_list + ".post_ids": {"$in": [post_id]}})

    if action == 'likes' or action == 'flags':
        liked_or_flagged = mongo.db.users.find_one(
            {"_id": ObjectId(session.get('user_id')), action: {"$in": [post_id]}})

    # return str(type(liked_or_flagged))

    if liked_or_flagged:
        return jsonify(result='already_added')

    if action == 'additions' and new_feelist == 'true':

        """
           CREATE NEW FEELIST FOR USER 
        """
        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id'))},
            {
                "$push": {
                    "my_feelists":
                        {"name": feelist_name.replace(" ", "_"), "post_ids": [post_id]}

                }
            }, upsert=True
        )
        session['my_feelists'] = feelists(
            mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})['my_feelists'])
    elif action == 'additions':
        """
           UPDATE CURRENT FEELIST FOR USER 
         """
        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id')), "my_feelists.name": feelist_name},
            {"$addToSet": {"my_feelists.$.post_ids": post_id}},
            upsert=True
        )
        session['my_feelists'] = feelists(
            mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})['my_feelists'])
    else:
        """
            UPDATE LIKES OR FLAGS FOR POST
        """

        mongo.db.users.update(
            {"posts.post_id": post_id},
            {"$inc":
                 {"posts.$." + action: 1,
                  }}
            ,
            upsert=True
        )
        """
            UPDATE USERS LIKES OR FLAGS
        """

        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id'))},
            {"$addToSet":
                 {action: post_id,
                  }}
            ,
            upsert=True
        )
    session['my_likes'] = mongo.db.users.find_one({'_id': ObjectId(session.get('user_id'))})['likes']
    return jsonify(result=post_id, dumps=dumps(session.get('my_likes')))


@posts_bp.route('/user_posts')
def user_posts():
    user_id = request.args.get('user_id', 0, type=str)
    from app import mongo
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    user_posts = []
    if 'posts' in user:
        for post in user['posts']:
            user_posts.append({
                'name': user['name'],
                'i_feel': post['i_feel'],
                'because': post['because'],
                'action': post['action'],
                'created_at': post['created_at'].strftime("%F"),
                'post_id': post['post_id'],
                'likes': post['likes'] if 'likes' in post else 0,
                'flags': post['flags'] if 'flags' in post else 0,
                'additions': post['additions'] if 'additions' in post else 0,

            })

    return jsonify(user_posts=user_posts)


@posts_bp.route('/my_fav_posts')
def my_fav():
    from app import mongo
    posts = mongo.db.users.aggregate([

        {"$unwind": '$posts'},
        {"$match": {"posts.post_id": {"$in": session.get('my_likes')}}}

    ])

    favs = []
    for fav in posts:
        favs.append({'name': fav['name'],
                     'i_feel': fav['posts']['i_feel'],
                     'because': fav['posts']['because'],
                     'action': fav['posts']['action'],
                     'created_at': fav['posts']['created_at'].strftime("%F"),
                     'post_id': fav['posts']['post_id'],
                     'likes': fav['posts']['likes'] if 'likes' in fav['posts'] else 0,
                     'flags': fav['posts']['flags'] if 'flags' in fav['posts'] else 0,
                     'additions': fav['posts']['additions'] if 'additions' in fav['posts'] else 0, })

    return jsonify(my_favs=favs)


@posts_bp.route('/delete_post')
def delete_post():
    post_id = request.args.get('post_id', 0, type=str)

    from app import mongo

    mongo.db.users.update(
        {'_id': ObjectId(session.get('user_id'))},
        {"$pull": {"posts": {"post_id": post_id}}}

    )
    return jsonify(deleted='deleted')
