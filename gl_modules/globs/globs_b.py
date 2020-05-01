from bson import ObjectId
from flask import Blueprint, request, jsonify, session

from gl_modules.shared.sanitize import sanitize

globs_bp = Blueprint('globs_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/globs')


@globs_bp.route('/_search')
def search():
    q = sanitize(request.args.get('q', 0, type=str).lower(), 'array')  # array

    results = []
    from app import mongo
    feelists = mongo.db.feels.find(

        {"$or": [
            {"i_feel": {"$in": q}},  # q is array
            {"because": {"$in": q}}  # q is array
        ]}
    )
    # obj_id = "5ea738942f3d6b576e209382"
    # feelists = mongo.db.feels.find(
    #
    #     {"_id": ObjectId(obj_id)}
    # )

    for feel in feelists:
        results.append(
            {
                'id': str(feel['_id']),
                'user_name': str(feel['user_name']),
                'user_feel': int(feel['user_feel']),
                'feelings': feel['i_feel'],
                'because': (' ').join(feel['because']),
                'action_1': str(feel['action_1']),
                'action_2': str(feel['action_2']),
                'action_3': str(feel['action_3']),
                'action_1_likes': str(feel['action_1_likes']),
                'action_2_likes': str(feel['action_2_likes']),
                'action_3_likes': str(feel['action_3_likes']),
                'action_1_feelist': str(feel['action_1_feelist']),
                'action_2_feelist': str(feel['action_2_feelist']),
                'action_3_feelist': str(feel['action_3_feelist']),
                'action_1_flag': str(feel['action_1_flag']),
                'action_2_flag': str(feel['action_2_flag']),
                'action_3_flag': str(feel['action_3_flag']),

            }
        )

    return jsonify(result=results,
                   feelists=session.get('user_feelist') if session.get('user_feelist') else {},
                   authorized_user=True if session.get('authorized_user') else False)




@globs_bp.route('/_actions')
def actions():
    action_num = request.args.get('action_num', 0, type=str)
    glob_id = request.args.get('glob_id', 0, type=str)
    action = request.args.get('action', 0, type=str)
    feel_list = request.args.get('feel_list', 0, type=str)

    if not session.get('authorized_user'):
        return jsonify(result='not_authorized')

    """if we have feelist we will update feelist object (it is one level deeper then likes
    that's why ...)"""
    if feel_list:
        field_to_update = action + '.' + feel_list + '.' + glob_id

        """if we do not have feelist we will update likes object"""
    else:
        field_to_update = action + '.' + glob_id

    """check if user already liked/added action to his feelist"""
    from app import mongo
    alreday_added = mongo.db.users.find_one(
        {"email": session.get('user_email'), field_to_update: {"$in": [action_num]}},

    )
    if alreday_added:
        return jsonify(result='already_added')

    """update user likes/feelist if it is new like"""
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$push": {field_to_update: action_num}}
        ,
        upsert=True
    )

    """update feel likes/feelists if it is new like"""
    mongo.db.feels.update(
        {"_id": ObjectId(glob_id)},
        {"$inc":
             {"action_" + action_num + "_" + action: 1,
              }}
        ,
        upsert=True
    )

    return jsonify(result=glob_id)