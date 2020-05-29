import datetime

from bson import ObjectId
from flask import Blueprint, render_template, session, jsonify, request
from bson.json_util import dumps

from gl_modules.shared.today import today_f
from gl_modules.shared.update_feel import update_county_feel, update_world_feel, update_country_feel

user_bp = Blueprint('user_bp', __name__,
                    template_folder='templates',
                    static_folder='static', static_url_path='assets/user')

"""
   GETTING USERS DATA TO DISPLAY PROGRESS ON THE CHART AND HIS FEELIST
   TODO ; RETHINK THE FEELISTS IN SESSION 
"""
@user_bp.route('/user')
def user():
    from app import mongo

    initials = ''
    user_initials = session.get('user_name').split(' ')
    authorized_user = mongo.db.users.find_one({'_id': ObjectId(session.get('user_id'))})
    today = datetime.datetime.now().strftime("%F")
    days = ''
    feelings = ''

    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    if 'my_feelists' in authorized_user:
        session['my_feelists'] = feelists(authorized_user['my_feelists'])
    else:
        session['my_feelists'] = []

    for day in authorized_user['user_feel']:
        days += day + '_'
        feelings += str(authorized_user['user_feel'][day]) + '_'

    return render_template('user/user.html', user=authorized_user, today=today, days=days, feelings=feelings)


"""
   CHECK IF THE USER IS AUTHORIZED 
"""
@user_bp.route('/is_authorized')
def is_authorized():
    return jsonify(user=True if session.get('authorized_user') else False,feelists=session.get('my_feelists') if session.get('my_feelists') else {})


"""
   UPDATING USER FEELINGS, AND AT THE SAME TIME UPDATING WORLD, COUNTRY, COUNTY FEELINGS 
"""
@user_bp.route('/update_user_feeling')
def update_user_feeling():
    feeling = request.args.get('feeling', 0, type=int)

    from app import mongo


    mongo.db.users.update(
        {"_id": ObjectId(session.get('user_id'))},
        {"$set": {

            'last_feel': feeling,
            'user_feel.' + today_f(): feeling}},
        upsert=True
    )

    """
              UPDATING COUNTY FEELINGS 
           """
    update_county_feel(mongo, session.get('user_country_code'), session.get('user_cl'), 0, int(feeling) - int(session.get('last_feel')))

    """updating country feel"""
    update_country_feel(mongo, session.get('user_country_code'), 0, int(feeling) - int(session.get('last_feel')))
    """updating world feel"""
    update_world_feel(mongo, 0, int(feeling) - int(session.get('last_feel')))

    session['last_feel'] = feeling
    session['user_feel'] = feeling

    return jsonify(updated='updated')


"""
   USER FEELISTS 
"""

@user_bp.route('_my_feelist', methods=['POST', 'GET'])
def my_feelist():
    from app import mongo

    f_name = request.args.get('f_name', 0, type=str)
    f_actions = []
    feelist_ids = session.get('my_feelists')[f_name]

    posts = mongo.db.users.aggregate([

        {"$unwind": '$posts'},
        {"$match": {"posts.post_id": {"$in": feelist_ids}}}

    ])

    for post in posts:
        f_actions.append({
            'name': post['name'],
            'i_feel': post['posts']['i_feel'],
            'image_id': str(post['image_id']),
            'because': post['posts']['because'],
            'action': post['posts']['action'],
            'created_at': post['posts']['created_at'].strftime("%F"),
            'user_id': str(post['_id']),
            'post_id': post['posts']['post_id'],
            'feel': post['posts']['feel'],
            'likes': post['posts']['likes'] if 'likes' in post['posts'] else 0

        })

    return jsonify(f_actions=f_actions)


"""
   DELETING POST FROM FEELIST 
"""
@user_bp.route('/delete_action')
def delete_action():
    from app import mongo

    post_id = request.args.get('post_id', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {'$pull': {"my_feelists.$[].post_ids": post_id}})

    session['my_feelists'] = feelists(mongo.db.users.find_one({'_id': ObjectId(session.get('user_id'))})['my_feelists'])

    return jsonify(deleted='deleted')


"""
   DELETING FEELIST 
"""
@user_bp.route('/delete_feelist')
def delete_feelist():
    from app import mongo

    f_name = request.args.get('f_name', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {"$pull": {"my_feelists": {"name": f_name.replace(' ', '_')}}})

    return jsonify(deleted='deleted')


"""
   REMOVING POST ID FROM USER'S FAVOURITES 
"""
@user_bp.route('/remove_from_likes')
def remove_from_likes():
    post_id = request.args.get('post_id', 0, type=str)
    from app import mongo
    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {"$pull": {"likes": {"$in": [post_id]}}})

    session['my_likes'] = mongo.db.users.find_one({'_id': ObjectId(session.get('user_id'))})['likes']
    return jsonify(deleted='deleted')


"""
   ADDING OR REMOVING OTHER USERS TO/FROM GLOBE 
"""
@user_bp.route('/glob_action')
def glob_action():
    user_id = request.args.get('user_id', 0, type=str)
    user_action = request.args.get('user_action', 0, type=str)
    from app import mongo

    if user_action == 'added_to_glob':
        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id'))},
            {
                "$addToSet": {
                    "my_globs": user_id

                }
            }, upsert=True
        )

        mongo.db.users.update(
            {"_id": ObjectId(user_id)},
            {
                "$addToSet": {
                    "added_me": session.get('user_id')

                }
            }, upsert=True
        )

        my_globers()

        return jsonify(text='success')

    if user_action == 'removed_from_glob':
        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id'))},
            {
                "$pull": {
                    "my_globs": user_id

                }
            }
        )

        mongo.db.users.update(
            {"_id": ObjectId(user_id)},
            {
                "$pull": {
                    "added_me": session.get('user_id')

                }
            }
        )
        my_globers()

        return jsonify(text='success')


"""
   GETTING LIST OF USER GLOBE 
"""
@user_bp.route('/my_glob')
def my_glob():
    return jsonify(my_glob=my_globers())


"""
   PUBLIC USER'S DETAILS AND POSTS 
"""
@user_bp.route('/user/<user_id>')
def public_user(user_id):
    from app import mongo

    user = mongo.db.users.find_one({'_id': ObjectId(user_id)},
                                   {'password': 0, 'email': 0, 'user_feel': 0, 'added_me': 0})

    filename = 'images/avatars/'+str(user['image_id'])+'.png'
    return render_template('user/public_user.html', user=user, user_posts=user['posts'],filename=filename)


def feelists(db_feelists):
    my_feelists = {}
    for feelist in db_feelists:
        my_feelists[feelist['name'].replace('_', ' ')] = feelist['post_ids']
    return my_feelists


def my_globers():
    from app import mongo
    user = mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})
    session['my_globs'] = user['my_globs'] if 'my_globs' in user else []

    object_ids = []
    for id in session.get('my_globs'):
        object_ids.append(ObjectId(id))

    glob = list(mongo.db.users.find({'_id': {"$in": object_ids}}, {'_id': 1, 'name': 1}))
    my_glob = []
    for item in glob:
        my_glob.append({'id': str(item['_id']), 'name': item['name']})

    return my_glob
