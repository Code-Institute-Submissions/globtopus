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
    authorized_user = mongo.db.users.find_one({'email': session.get('user_email')})
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
        {"$match":  {"posts.post_id": {"$in": feelist_ids}}}

    ])

    for post in posts:
        f_actions.append({
            'name': post['name'],
            'i_feel': post['posts']['i_feel'],
            'because': post['posts']['because'],
            'action': post['posts']['action'],
            'user_id': str(post['_id']),
            'post_id':post['posts']['post_id'],
            'feel': post['posts']['feel']
        })

    return jsonify(f_actions=f_actions)

@user_bp.route('/delete_action')
def delete_action():
    from app import mongo

    post_id = request.args.get('post_id', 0, type=str)

    mongo.db.users.update({ "_id":ObjectId(session.get('user_id'))},
                          {'$pull': {"my_feelists.$[].post_ids": post_id}})

    return   jsonify(deleted='deleted')

@user_bp.route('/delete_feelist')
def delete_feelist():
    from app import mongo

    f_name = request.args.get('f_name', 0, type=str)

    mongo.db.users.update({ "_id":ObjectId(session.get('user_id'))},
                          { "$pull": {"my_feelists": {"name": f_name}}})

    return   jsonify(deleted='deleted')

def feelists(db_feelists):
    my_feelists = {}
    for feelist in db_feelists:
        my_feelists[feelist['name']] = feelist['post_ids']
    return my_feelists



