from bson import ObjectId
from flask import Blueprint, request, jsonify, session
from bson.json_util import dumps
from gl_modules.shared.sanitize import sanitize
from gl_modules.user.user_b import feelists

globs_bp = Blueprint('globs_bp', __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='assets/globs')

"""USER CAN SEARCH FOR GLOBS, THAT OTHER GLOBBERS POSTED
MATCHED BY THE WAY HE FEELS AT THE MOMENT AND HE CAN SEE ACTIONS 
OTHER GLOBBERS TOOK WHEN THEY FELT THE SAME WAY

TO DO : ADD OPTION OF SELECTING COUNTRY FROM WHICH USER GETS GLOBS"""


@globs_bp.route('/_search')
def search():
    """sanitizing input and returning array of words"""
    q = sanitize(request.args.get('q', 0, type=str).lower(), 'array')  # array

    results = []
    from app import mongo

    """SEARCHING DB FOR WORDS USER TYPES IN SEARCH BOX IN 
        1. i_feel FIELD
            ( HOW OTHER GLOBBERS FELT WHEN THEY WERE POSTING GLOB),
        2. because FIELD ( REASON WHY THEY FELT THAT WAY ) 
    
    AND WE WILL DISPLAY i_feel and because VALUES ALONG 
    ACTIONS GLOBBERS TOOK TO FEEL THAT WAY OR BETTER"""



    search_results = mongo.db.users.aggregate([

        {"$unwind": '$posts'}, {"$match": {"$or": [
            {"posts.i_feel": {"$in": q}},  # q is array
            {"posts.because": {"$in": q}}  # q is array
        ]} }

    ])
   # return dumps(search_results)
    for result in search_results:
        results.append(
            {
                'id': str(result['posts']['post_id']),
                'user_name': str(result['name']),
                'user_feel': int(result['posts']['feel']),
                'i_feel': (' ').join(result['posts']['i_feel']),
                'because': (' ').join(result['posts']['because']),
                'action': str(result['posts']['action']),
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


@globs_bp.route('/_actions')
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


    #return str(type(liked_or_flagged))

    if  liked_or_flagged:
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
                        {"name": feelist_name, "post_ids": [post_id]}

                }
            }, upsert=True
        )
        session['my_feelists'] = feelists(mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})['my_feelists'])
    elif action == 'additions':
        """
           UPDATE CURRENT FEELIST FOR USER 
         """
        mongo.db.users.update(
            {"_id": ObjectId(session.get('user_id')), "my_feelists.name": feelist_name},
            {"$addToSet": {"my_feelists.$.post_ids": post_id}},
            upsert=True
        )
        session['my_feelists'] = feelists(mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})['my_feelists'])
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

    return jsonify(result=post_id, dumps=dumps(session.get('my_feelists')))
