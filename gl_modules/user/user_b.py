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
            'feel': post['posts']['feel']
        })

    return jsonify(f_actions=f_actions)


@user_bp.route('/delete_action')
def delete_action():
    from app import mongo

    post_id = request.args.get('post_id', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {'$pull': {"my_feelists.$[].post_ids": post_id}})

    return jsonify(deleted='deleted')


@user_bp.route('/delete_feelist')
def delete_feelist():
    from app import mongo

    f_name = request.args.get('f_name', 0, type=str)

    mongo.db.users.update({"_id": ObjectId(session.get('user_id'))},
                          {"$pull": {"my_feelists": {"name": f_name}}})

    return jsonify(deleted='deleted')


@user_bp.route('/glob_action')
def add_to_glob():
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
        my_feelists[feelist['name']] = feelist['post_ids']
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


[{"_id": {"$oid": "5eb95203fff969fef5e45c15"}, "country_code": "it", "country": "Italy", "county": "Roma Capitale",
  "name": "gapek", "email": "gapek@globi.com",
  "password": "pbkdf2:sha256:150000$MDahCoxT$f9cb10bd9f77b992366b788a03681b99833b2fcfe1f32883973e4f11e14b7e40",
  "created_at": {"$date": 1589207059971}, "last_login": {"$date": 1589308293274}, "last_feel": "81", "likes": [],
  "flags": [], "user_feel": {"2020-05-11": "15", "2020-05-12": "100"},
  "posts": {"i_feel": ["good"], "because": ["i", "ate", "great", "food"], "feel": "86",
            "action": "eat more healthy food", "post_id": "5eb95237fff969fef5e45c16",
            "created_at": {"$date": 1589207111989}, "likes": 2, "flags": 1}, "added_me": ["5eb9540ffff969fef5e45c1b"]},
 {"_id": {"$oid": "5eb95203fff969fef5e45c15"}, "country_code": "it", "country": "Italy", "county": "Roma Capitale",
  "name": "gapek", "email": "gapek@globi.com",
  "password": "pbkdf2:sha256:150000$MDahCoxT$f9cb10bd9f77b992366b788a03681b99833b2fcfe1f32883973e4f11e14b7e40",
  "created_at": {"$date": 1589207059971}, "last_login": {"$date": 1589308293274}, "last_feel": "81", "likes": [],
  "flags": [], "user_feel": {"2020-05-11": "15", "2020-05-12": "100"},
  "posts": {"i_feel": ["little", "upset"], "because": ["zaiko", "doesnt", "want", "to", "play", "with", "me"],
            "feel": "15", "action": "try to play with other rabbits", "post_id": "5eb95277fff969fef5e45c17",
            "created_at": {"$date": 1589207175510}, "likes": 1, "flags": 1}, "added_me": ["5eb9540ffff969fef5e45c1b"]},
 {"_id": {"$oid": "5eb952c1fff969fef5e45c18"}, "country_code": "pl", "country": "Poland",
  "county": "Masovian Voivodeship", "name": "krywulka", "email": "krywulka@globi.com",
  "password": "pbkdf2:sha256:150000$zYqUhT8h$c42c77ffe513b5a12078340bade8a30a365f743ae69949d5a80199c61c5569f0",
  "created_at": {"$date": 1589207249816}, "last_login": {"$date": 1589207473666}, "last_feel": "97",
  "likes": ["5eb95237fff969fef5e45c16"], "flags": ["5eb95237fff969fef5e45c16"], "user_feel": {"2020-05-11": "97"},
  "posts": {"i_feel": ["super"], "because": ["i", "cant", "sit"], "feel": "75", "action": "do not sit",
            "post_id": "5eb95320fff969fef5e45c19", "created_at": {"$date": 1589207344030}, "likes": 1},
  "my_feelists": [{"name": "happy", "post_ids": ["5eb95237fff969fef5e45c16"]}],
  "added_me": ["5eb9540ffff969fef5e45c1b"]}]
