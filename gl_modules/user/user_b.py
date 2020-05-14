import datetime

from bson import ObjectId
from flask import Blueprint, render_template, session, jsonify, request
from bson.json_util import dumps

user_bp = Blueprint('user_bp', __name__,
                    template_folder='templates',
                    static_folder='static', static_url_path='assets/user')


@user_bp.route('/user')
def user():
    from app import mongo

    initials = ''
    user_initials = session.get('user_name').split(' ')
    authorized_user = mongo.db.users.find_one({'_id': ObjectId(session.get('user_id'))})
    today = datetime.datetime.now().strftime("%F")
    days = ''
    feelings = 'yes'

    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    if 'my_feelists' in authorized_user:
        session['my_feelists'] = feelists(authorized_user['my_feelists'])
    else:
        session['my_feelists'] = []
        have_feelist = 'no'

    for day in authorized_user['user_feel']:
        days += day + '_'
        feelings += authorized_user['user_feel'][day] + '_'

    return render_template('user/user.html', user=authorized_user, today=today, days=days, feelings=feelings)


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
            'because': post['posts']['because'],
            'action': post['posts']['action'],
            'created_at': post['posts']['created_at'].strftime("%F"),
            'user_id': str(post['_id']),
            'post_id': post['posts']['post_id'],
            'feel': post['posts']['feel'],
            'likes':post['posts']['likes'] if 'likes' in post['posts'] else 0

        })

    return jsonify(f_actions=f_actions)


@user_bp.route('/delete_action')
def delete_action():
    from app import mongo

    post_id = request.args.get('post_id', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {'$pull': {"my_feelists.$[].post_ids": post_id}})

    session['my_feelists'] = feelists( mongo.db.users.find_one({'_id':ObjectId( session.get('user_id'))})['my_feelists'])

    return jsonify(deleted='deleted')


@user_bp.route('/delete_feelist')
def delete_feelist():
    from app import mongo

    f_name = request.args.get('f_name', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {"$pull": {"my_feelists": {"name": f_name.replace(' ','_')}}})

    return jsonify(deleted='deleted')

@user_bp.route('/remove_from_likes')
def remove_from_likes():
    post_id = request.args.get('post_id', 0, type=str)
    from app import mongo
    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {"$pull": {"likes": { "$in": [post_id]}}})

    session['my_likes'] = mongo.db.users.find_one({'_id':ObjectId( session.get('user_id'))})['likes']
    return jsonify(deleted='deleted')


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




@user_bp.route('/my_glob')
def my_glob():
    return jsonify(my_glob=my_globers())




def feelists(db_feelists):
    my_feelists = {}
    for feelist in db_feelists:
        my_feelists[feelist['name'].replace('_',' ')] = feelist['post_ids']
    return my_feelists


def my_globers():
    from app import mongo
    session['my_globs'] = mongo.db.users.find_one({"_id": ObjectId(session.get('user_id'))})['my_globs'] or []

    object_ids = []
    for id in session.get('my_globs'):
        object_ids.append(ObjectId(id))

    glob = list(mongo.db.users.find({'_id': {"$in": object_ids}}, {'_id': 1, 'name': 1}))
    my_glob = []
    for item in glob:
        my_glob.append({'id': str(item['_id']), 'name': item['name']})

    return my_glob



