import json
import random

import bson
from bson import ObjectId
from flask import Blueprint, jsonify, session, render_template, request
import datetime
from bson.json_util import dumps
from werkzeug.security import generate_password_hash

from gl_modules.shared.today import today_f

factory_bp = Blueprint('factory_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/factory')


@factory_bp.route('/check_svg')
def check_svg():
    return render_template('country_map.html')


@factory_bp.route('/store_map')
def store_map():
    from app import mongo
    c_map = request.args.get('c_map', 0, type=str)
    cc = request.args.get('cc', 0, type=str)
    svg_for = request.args.get('for', 0, type=str)

    if svg_for == 'world':
        world_map_array = c_map.split('==')
        world_map_array.pop()

        map_array = []

        for country in world_map_array:
            map_array.append({
                "cc": country.split('@')[0],
                "d": country.split('@')[1].split('***')[0],
                "cn": country.split('@')[1].split('***')[1],
                "cn2": country.split('@')[1].split('***')[2],

            })

        mongo.db.c_maps.insert_one({'cc': 'world', 'countries': map_array})

    else:

        c_map_array = c_map.split('|')
        c_map_array.pop()

        map_array = []
        for county in c_map_array:
            c_split = county.split('@')
            map_array.append({"name": c_split[0], "d": c_split[1]})

        mongo.db.c_maps.insert_one({'cc': cc, 'counties': map_array})

    return jsonify(text='inserted')


@factory_bp.route('/num_of_maps')
def num_of_maps():
    from app import mongo
    c_map = mongo.db.c_maps.find()
    number_of_maps = []
    for map in c_map:
        number_of_maps.append(map['cc'])

    return dumps(number_of_maps)


# @factory_bp.route('/load_map')
# def load_map():
#     from app import mongo
#     cc = request.args.get('cc', 0, type=str)
#
#     c_map = mongo.db.c_maps.find_one({'cc': cc}, {'_id': 0})['counties']
#     svg_map = []
#     for county in c_map:
#         svg_map.append({county['name']: county['d']})
#
#     return jsonify(c_map=svg_map, c_c=cc)


"""
   HOW TO UPDATE DAILY FEELING FOR USER 
"""


@factory_bp.route('/update_feel')
def update_feel():
    from app import mongo
    mongo.db.post_users.update(
        {"_id": ObjectId("5eb7d77e4e127c150fd2deaf")},
        {"$set": {

            'last_feel': 77,
            'user_feel.' + today_f(): 77}},
        upsert=True
    )

    return 'feelING updated'


"""
   HOW TO INSERT NEW USER 
"""


@factory_bp.route('/insert_user')
def insert_user():
    from app import mongo
    user = {}
    user['username'] = 'Marcel1977'
    user['email'] = 'marcos1977@globi.com'
    user['password'] = generate_password_hash('password')
    user['cc'] = 'sk'
    user['county'] = 'presovsky kraj'
    user['created_at'] = datetime.datetime.now()
    user['last_login'] = datetime.datetime.now()
    user['last_feel'] = 100
    user['user_feel'] = {datetime.datetime.now().strftime("%F"): 0}

    mongo.db.post_users.insert_one(user)

    return 'user inserted'


"""
  HOW TO DELETE OBJECT FROM ARRAY  
"""


@factory_bp.route('/delete_post')
def delete_post():
    from app import mongo

    mongo.db.post_users.update(
        {},
        {"$pull": {"posts": {"post_id": "5eb59ec03a7abd08e89d7b11"}}}

    )
    return 'deleted'


@factory_bp.route('/delete_actionq')
def delete_action():
    from app import mongo

    mongo.db.users.update(
        {"_id": ObjectId(session.get('user_id')), "my_feelists.name": 'happy'},
        {"$pull": {"post_ids": "5eb95320fff969fef5e45c19"}}

    )

    return 'deleted'


"""
  HOW TO INSERT OBJECT INTO ARRAY  
"""


@factory_bp.route('/insert_post')
def insert_post():
    from app import mongo

    mongo.db.post_users.update(
        {"_id": ObjectId("5eb7d32e6e86e78947bfad09")},
        {
            "$push": {
                "posts":
                    {"i_feel": "user super excelent", "because": "user id super i can do it",
                     "feel": 100,
                     "actions": "user id super learn new things", "post_id": str(ObjectId())}

            }
        }, True
    )
    return 'inserted'


"""
  HOW TO UPDATE OBJECT IN ARRAY  
"""


@factory_bp.route('/update_post')
def update_post():
    from app import mongo
    mongo.db.post_users.update(
        {"_id": ObjectId("5eb7d32e6e86e78947bfad09"), "posts.post_id": "5eb7d37500d8fd94bafa2f03", },
        {"$set": {"posts.$.feel_like": 'super great', "posts.$.because": 'I know how to update document',
                  "posts.$.actions": 'i am new checking user id and post id before update user keep learning'}}
    )

    return 'updated'


"""
   HOW TO GET SINGLE POST BY ID FROM USER  
"""


@factory_bp.route('/get_post')
def get_post():
    from app import mongo
    # https://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection
    # https://stackoverflow.com/questions/30333299/pymongo-bson-convert-python-cursor-cursor-object-to-serializable-json-object
    # post =dumps( list( mongo.db.post_users.aggregate([
    #
    #     {"$match": {'posts.post_id': ObjectId("5eb59ec03a7abd08e89d7b00")}},
    #     {"$project": {
    #         "posts": {"$filter": {
    #             "input": '$posts',
    #             "as": 'post',
    #             "cond": {"$eq": ["$$post.post_id", ObjectId("5eb59ec03a7abd08e89d7b00")]}
    #         }},
    #         "_id": 0
    #     }}
    # ]))[0]['posts'][0])

    post = list(mongo.db.post_users.aggregate([

        {"$match": {"_id": ObjectId("5eb7d32e6e86e78947bfad09"), 'posts.post_id': "5eb7d37500d8fd94bafa2f03"}},
        {"$project": {
            "posts": {"$filter": {
                "input": '$posts',
                "as": 'post',
                "cond": {"$eq": ["$$post.post_id", "5eb7d37500d8fd94bafa2f03"]}
            }},
            "_id": 0
        }}
    ]))[0]['posts'][0]

    single_post = {}
    for detail in post:
        if detail != "post_id":
            single_post[detail] = post[detail]
    print(post)
    return jsonify(single_post)


"""
   HOW TO GET ALL POSTS FROM USER 
"""


@factory_bp.route('/get_posts')
def get_posts():
    from app import mongo
    user = mongo.db.post_users.find_one({"_id": ObjectId("5eb7d32e6e86e78947bfad09")})
    user_posts = {}
    for post in user['posts']:
        user_posts['feel_like'] = post['feel_like']
        user_posts['because'] = post['because']
        user_posts['action'] = post['actions']
        if 'likes' in post:
            user_posts['likes'] = post['likes']
        else:
            user_posts['likes'] = 0

        if 'additions' in post:
            user_posts['additions'] = post['additions']
        else:
            user_posts['additions'] = 0

        if 'flags' in post:
            user_posts['flags'] = post['flags']
        else:
            user_posts['flags'] = 0

    return jsonify(user_posts)


"""
   UPDATE EXISTING FEELIST 
"""


@factory_bp.route('/add_to_feelist')
def add_to_feelist():
    from app import mongo

    feelist_name = 'good'

    mongo.db.post_users.update(
        {"_id": ObjectId("5eb7d77e4e127c150fd2deaf"), "my_feelists.name": feelist_name},
        {"$addToSet": {"my_feelists.$.post_ids": "23"}},
        upsert=True
    )

    return 'added to feelist'


"""
   CREATE NEW FEELIST 
"""


@factory_bp.route('/create_new_feelist')
def create_new_feelist():
    from app import mongo

    feelist_name = 'sad'

    """
       NEW FEELIST 
    """

    mongo.db.users.update(
        {"_id": ObjectId("5eb9540ffff969fef5e45c1b")},
        {
            "$push": {
                "my_feelists":
                    {"name": feelist_name, "post_ids": ["5e34556fff969fef5e45c1b"]}

            }
        }, upsert=True
    )

    return 'created new feelist'


"""
   ACTIONS FOR POSTS, LIKE, ADD, FLAG 
"""


@factory_bp.route('/like_post')
def like_post():
    from app import mongo
    # post likes
    mongo.db.post_users.update(
        {"posts.post_id": "5eb59ec03a7abd08e89d7b11"},
        {"$inc":
             {"posts.$.likes": 1,
              }}
        ,
        upsert=True
    )
    # users likes
    mongo.db.post_users.update(
        {"_id": ObjectId("5eb7d32e6e86e78947bfad09")},
        {"$addToSet":
             {"my_likes": "5eb59ec03a7abd08e89d7b11",
              }}
        ,
        upsert=True
    )
    return 'updated'


"""
   HOW TO GET IDS OF POSTS TO DISPLAY SAVED FEELIST'S ACTIONS
"""


@factory_bp.route('/get_ids_for_feelist')
def get_ids_for_feelist():
    from app import mongo

    ids = list(mongo.db.post_users.aggregate([

        {"$match": {'_id': ObjectId("5eb7d77e4e127c150fd2deaf")}},
        {"$project": {
            "my_feelists": {"$filter": {
                "input": '$my_feelists',
                "as": 'feelist',
                "cond": {"$eq": ["$$feelist.name", "sad"]}
            }},
            "_id": 0
        }}
    ]))[0]['my_feelists'][0]['post_ids']

    return jsonify(ids)


"""
   HOW TO GET FEELISTS ACTIONS  
"""


@factory_bp.route('/get_feelist')
def get_feelist():
    from app import mongo

    actions = []

    #   here user will want to get actions for the feelist
    #   he has user ids he liked, so we will get those users first
    #
    #   here we can replace users ids for post ids
    #   it will save us one loop
    #
    #
    #
    users = mongo.db.post_users.find({
        "posts.users_who_liked_it": {"$in": [
            "5eb5df9141b4c83d7ca2b84e"]}},
        {'_id': 1, 'posts': 1, "name": 1})  # "5eb5df9141b4c83d7ca2b84e" is authorized user id/ it can be just post_ids

    users = list(users)
    user_name = users[0]['name']
    user_id = str(users[0]['_id'])

    # for user in users:

    # "1" is authorized user id
    for post in list(users)[0]['posts']:
        if "1" in post['users_who_liked_it']:
            actions.append({
                'name': user_name,
                'i feel': post['feel_like'],
                'because': post['because'],
                'action': post['actions'],
                'user_id': user_id,
            })

    return jsonify(actions)


"""
   FOR TESTING PURPOSES, POPULATE WORLD DATA 
"""


@factory_bp.route('/create_world_data')
def world_data():
    from app import mongo

    world_people = 0
    world_feelings = 0
    world_data = {}

    for key, value in countryListAlpha2.items():

        for i in range(1, 365):
            num_of_people = random.randint(1, 10001)
            feelings = random.randint(1, 100)
            day = str((datetime.datetime.now() - datetime.timedelta(days=365 - i)).strftime("%F"))

            world_people += num_of_people
            world_feelings += num_of_people * feelings

            world_data[day] = {day: {'num_of_people': world_people
                , 'sum_of_feelings': world_feelings, 'day': day}}

        world_people = 0
        world_feelings = 0

    for item in world_data:
        mongo.db.world_feel.insert(world_data[item][item])

    return 'world_data'


# get countries where feeling is between range
"""
   HOW TO GET COUNTRIES IN THE RANGE OF FEELINGS 
"""


@factory_bp.route('/20_country')
def twenty_country():
    from app import mongo

    country_feel = mongo.db.country_feel.find(
        {"$and": [{"$expr": {"$lt": [{"$divide": ["$total_feelings", "$total_people"]}, 60]}},
                  {"$expr": {"$gt": [{"$divide": ["$total_feelings", "$total_people"]}, 40]}}]},

        {'_id': 0})
    data = {}
    for feel in country_feel:
        data[get_country_name(feel["country_code"])] = round(feel['total_feelings'] / feel['total_people'], 2)

    return jsonify(data)


"""
   HOW TO GET COUNTRY WITH COUNTIES 
"""


@factory_bp.route('/cc_with_counties')
def cc_with_counties():
    from app import mongo
    countries = mongo.db.c_maps.find({}, {'_id': 0, 'cc': 1, 'counties.name': 1})
    countries_arr = {}
    counties = []
    for country in countries:
        if country['cc'] != 'world':
            for county in country['counties']:
                counties.append(county['name'])
            # countries_arr.append({country['cc'] : counties})
            countries_arr[country['cc']] = counties
            counties = []

    session['c_w_c'] = countries_arr
    return session.get('c_w_c')


"""
   FOR TESTING PURPOSES
   MAIN FUNCTION TO POPULATE WORLD FEELING COLLECTION AND COUNTRY FEELINGS COLLECTIONS 
"""


@factory_bp.route('/create_countries_data')
def countries_data():
    from app import mongo
    feels = {}
    world = {}
    current_people = 0
    current_feelings = 0
    total_people = 0
    total_feelings = 0
    counter = 0

    world_people = 0
    world_feelings = 0
    world_data = {}

    for key, value in countryListAlpha2.items():

        country_code = key.lower()
        for i in range(1, 366):
            num_of_people = random.randint(1, 10001)
            if counter < 30:

                feelings = random.randint(1, 20)
            elif counter < 70:
                feelings = random.randint(20, 40)
            elif counter < 130:
                feelings = random.randint(40, 60)
            elif counter < 200:
                feelings = random.randint(60, 80)
            elif counter < 247:
                feelings = random.randint(80, 100)

            day = str((datetime.datetime.now() - datetime.timedelta(days=366 - i)).strftime("%F"))

            feels[day] = {'num_of_people': num_of_people,
                          'sum_of_feelings': num_of_people * feelings}
            total_people += num_of_people
            total_feelings += num_of_people * feelings

            world_people += num_of_people
            world_feelings += num_of_people * feelings

            world_data[day] = {day: {'num_of_people': world_people
                , 'sum_of_feelings': world_feelings, 'day': day}}

            if (i > 357):
                current_people += num_of_people
                current_feelings += num_of_people * feelings

        world[counter] = {"country_code": country_code, 'feels': feels, 'total_people': total_people,
                          'total_feelings': total_feelings}

        mongo.db.country_feel.insert({"country_code": country_code, 'feels': feels, 'total_people': total_people,
                                      'total_feelings': total_feelings})
        counter += 1
        total_people = 0
        total_feelings = 0
        current_people = 0
        current_feelings = 0

    for item in world_data:
        mongo.db.world_feel.insert(world_data[item][item])

    return jsonify(world)


@factory_bp.route('/create_counties')
def create_counties():
    from app import mongo
    feels = {}
    counties = []

    total_people = 0
    total_feelings = 0
    counter = 0

    for key, value in countryListAlpha2.items():

        country_code = key.lower()

        for county in cc_with_counties()[country_code]:

            for i in range(1, 91):
                num_of_people = random.randint(1, 101)
                if (counter % 5 == 0):

                    feelings = random.randint(1, 20)
                elif (counter % 5 == 1):
                    feelings = random.randint(20, 40)
                elif (counter % 5 == 2):
                    feelings = random.randint(40, 60)
                elif (counter % 5 == 3):
                    feelings = random.randint(60, 80)
                elif (counter % 5 == 4):
                    feelings = random.randint(80, 100)
                else:
                    feelings = random.randint(1, 100)

                day = str((datetime.datetime.now() - datetime.timedelta(days=91 - i)).strftime("%F"))

                feels[day] = {'num_of_people': num_of_people,
                              'sum_of_feelings': num_of_people * feelings}
                total_people += num_of_people
                total_feelings += num_of_people * feelings

            # counties.append({"cc": country_code,'cl':county, 'feels': feels, 'total_people': total_people,
            #                               'total_feelings': total_feelings})
            mongo.db.stats.insert({"cc": country_code, 'cl': county, 'feels': feels, 'total_people': total_people,
                                   'total_feelings': total_feelings})
            counter += 1
            total_people = 0
            total_feelings = 0

    return 'counties inserted : ' + str(counter)


@factory_bp.route('/create_countries_data2')
def countries_data2():
    from app import mongo

    total_people = 0
    total_feelings = 0

    counter = 0

    world_people = 0
    world_feelings = 0

    world = []
    world_feel = {}

    country_people = {}
    country_feelings = {}
    country_people_n = 0
    country_feelings_n = 0

    countries = []
    country_feel = {}

    county_people = {}
    county_feelings = {}
    county_people_n = 0
    county_feelings_n = 0

    counties = {}
    county_feel = {}

    counties_array = []

    for i in range(1, 3):

        if (counter < 10):

            feelings = random.randint(1, 20)
        elif (counter < 30):
            feelings = random.randint(20, 40)
        elif (counter < 90):
            feelings = random.randint(40, 60)
        elif (counter < 120):
            feelings = random.randint(60, 80)
        elif (counter < 145):
            feelings = random.randint(80, 100)

        day = str((datetime.datetime.now() - datetime.timedelta(days=3 - i)).strftime("%F"))

        for key, value in countryListAlpha2.items():

            country_code = key.lower()

            for county in cc_with_counties()[country_code]:
                # return dumps(cc_with_counties()[country_code])
                num_of_people = random.randint(1, random.randint(1, 500))

                county_feel[day] = {'num_of_people': num_of_people,
                                    'sum_of_feelings': num_of_people * feelings}

                county_people_n += num_of_people
                county_feelings_n += num_of_people * feelings

                country_people_n += num_of_people
                country_feelings_n += num_of_people * feelings

                total_people += num_of_people
                total_feelings += num_of_people * feelings

                county_people[county] = county_people_n
                county_feelings[county] = county_feelings_n

            counties_array.append({'cc': country_code, 'name': county, 'total_people': county_people_n,
                                   'total_feelings': county_feelings_n,
                                   'feels': county_feel})
            county_people_n = 0
            county_feelings_n = 0

            # counties.append({'name': county, 'total_people': county_people, 'total_feelings': county_feelings,
            #                  'feels': county_feel})

            counties[country_code] = counties_array
            # county_feel = {}
            # mongo.db.stats.insert(
            #     {'name': county, 'total_people': county_people, 'total_feelings': county_feelings,
            #      'feels': county_feel})

            # mongo.db.stats.insert(
            #     counties[country_code])

            country_feel[day] = {'num_of_people': country_people_n,
                                 'sum_of_feelings': country_feelings_n}

        country_people[country_code] = country_people_n

        country_feelings[country_code] = country_feelings_n

        country_people_n = 0
        country_feelings_n = 0

        countries.append({'name': country_code, 'total_people': country_people[country_code],
                          'total_feelings': country_feelings[country_code],
                          'feels': country_feel})

        country_feel = {}

        # mongo.db.stats.insert({'name': country_code, 'total_people': country_people, 'total_feelings': country_feelings,
        #                       'feels': county_feel})

        world_people += country_people[country_code]
        world_feelings += country_feelings[country_code]

        world_feel[day] = {'num_of_people': world_people,
                           'sum_of_feelings': world_feelings}

    world.append({'name': 'world', 'total_people': total_people, 'total_feelings': total_feelings,
                  'feels': world_feel})

    counter += 1
    return jsonify(counties)
    # mongo.db.stats.insert({"world": world, 'total_people': total_people, 'total_feelings': country_feelings,
    #                           'feels': county_feel})

    # mongo.db.country_feel.insert({"country_code": country_code, 'feels': feels, 'total_people': total_people,
    # 'total_feelings': total_feelings})
    counter += 1
    total_people = 0
    total_feelings = 0
    current_people = 0
    current_feelings = 0

    # for item in world_data:
    # mongo.db.world_feel.insert(world_data[item][item])

    return jsonify(counties)


@factory_bp.route('/create_countries_data3')
def countries_data3():
    from app import mongo

    total_people = 0
    total_feelings = 0

    counter = 0

    world_people = 0
    world_feelings = 0

    world = []
    world_feel = {}

    country_people = {}
    country_feelings = {}
    country_people_n = 0
    country_feelings_n = 0

    countries = []
    country_feel = {}

    county_people = {}
    county_feelings = {}
    county_people_n = 0
    county_feelings_n = 0

    counties = []
    county_feel = {}

    feels = {}
    feels_cc = {}
    feels_world = {}
    county_feels = {}
    country_feels = {}
    world_feels = {}

    _county = {}
    _country = {}
    _world = {}
    num_of_ = []
    all_counties = []
    stats = []
    # return dumps(cc_with_counties().keys())

    for contry_c, value in countryListAlpha2.items():

        country_code = contry_c.lower()

        for county in cc_with_counties()[country_code]:

            for i in range(1, 4):
                day = str((datetime.datetime.now() - datetime.timedelta(days=4 - i)).strftime("%F"))
                num_of_people = random.randint(1, 1001)
                feelings = num_of_people * random.randint(1, 100)

                if county not in all_counties:
                    feels[day] = {'num_of_people': num_of_people, 'sum_of_feelings': feelings}
                    county_feels[county] = {'num_of_people': county_people_n, 'sum_of_feelings': county_feelings_n,
                                            'county_feels': feels}
                    counter += num_of_people
                    county_people_n += num_of_people
                    county_feelings_n += feelings
                    country_people_n += num_of_people
                    country_feelings_n += feelings
                    world_people += num_of_people
                    world_feelings += feelings

                    total_people += num_of_people
                    total_feelings += feelings

                    num_of_.append('county_people ' + county + '  ' + str(county_people_n))
                    stats.append({'cl': county, 'county_day': feels})
                    county_people_n = 0

                    all_counties.append(county)

        country_feels[country_code] = {'num_of_people': country_people_n, 'sum_of_feelings': country_feelings_n,
                                       'country_feels': feels_cc}
        feels_cc[day] = {'num_of_people': country_people_n, 'sum_of_feelings': country_feelings_n}
        num_of_.append('country_people ' + country_code + '  ' + str(country_people_n))
        stats.append({'cc': country_code, 'country_day': feels_cc})
        country_people_n = 0
        country_feelings_n = 0

    num_of_.append('world_people ' + str(world_people))
    feels_world[day] = {'num_of_people': world_people, 'sum_of_feelings': world_feelings}
    stats.append({'cc': 'world', 'world_day': feels_world})
    world_feels = {'num_of_people': total_people, 'sum_of_feelings': total_feelings, 'world_feels': feels_world
                   }
    return jsonify(num_of_, stats)


@factory_bp.route('/create_users')
def create_users():
    from app import mongo
    country_users = {}
    users = []
    posts = []
    i_feel_arr = [
        ['very', 'good'],
        ['little', 'bit', 'tired'],
        ['very', 'happy'],
        ['bored'],
        ['sad'],
        ['super'],
        ['exited'],
        ['angry'],
        ['joyful'],
        ['surprised'],

    ]
    because_arr = [
        ['i', 'am', 'going', 'for', 'a', 'walk', 'to', 'the', 'forrest'],
        ['i', 'was', 'up', 'all', 'night'],
        ['i', 'just', 'finished', 'my', 'assignment'],
        ['i', 'have', 'nothing', 'to', 'do'],
        ['the', 'whole', 'world', 'is', 'on', 'stand', 'by'],
        ['my', 'neighbour', 'just', 'won', 'a', 'lottery', 'today'],
        ['we', 'are', 'going', 'on', 'a', 'family', 'trip'],
        ['my', 'boss', 'just', 'gave', 'me', 'pay', 'rise'],
        ['all', 'the', 'shops', 'are', 'closed'],
        ['i', 'just', 'realized', 'that', 'my', 'website', 'got', 'really', 'popular'],
    ]
    """
    source :
       https://www.inc.com/ss/jeff-haden/things-remarkable-people-think-every-day 
    """
    action_arr = [
        'Most of the time we should worry about what other people think -- but not if it stands in the way of living the lives we really want to live. If you really want to start a business but worry that people might say you\'re crazy, do it anyway. Pick one thing you haven\'t tried because you\'re concerned about what other people think or say, and just go do it. It\'s your life. Live it your way.',
        'Everyone needs help. Admitting we need isn\'t a sign of weakness; it\'s a sign of self-confidence and strength. And it\'s a great behavior to model. Besides, asking another person for help instantly recognizes their skills and values and conveys your respect and admiration. And while that\'s reason enough to ask someone for advice, for an opinion, or for a helping hand, you also get the help you really need.',
        'You have plans. You have goals. You have ideas. Who cares? You have nothing until you actually do something. Every day we let hesitation and uncertainty stop us from acting on our ideas. Pick one plan, one goal, or one idea. And get started. Just take one small step. The first step is by far the hardest. Every successive step will be a lot easier. ',
        'Often the easiest way to be different is to do what others are unwilling to do. Pick one thing other people won\'t do. It can be simple. It can be small. Doesn\'t mater. Whatever it is, do it. Instantly you\'ll be a little different from the rest of the pack. Then keep going. Every day, think of one thing to do that no one else is willing to do. After a week you\'ll be uncommon. After a month you\'ll be special. After a year you\'ll be incredible, and you definitely won\'t be like anyone else.',
        'The most paralyzing fear is fear of the unknown. (At least it is for me.) Yet nothing ever turns out to be as hard or as scary as you think. Plus it\'s incredibly exciting to overcome a fear. You get that, \"I can\'t believe I just did that!\" rush, a thrill you may not have experienced for a long time. Try something scary: physically, mentally, or emotionally. Trust yourself to figure out how to overcome any problems that arise. You will.',
        'Accomplishments are based on actions, not on thoughts--yet the thought is always father to the deed. Achievement starts with an idea, a perspective, a point of view, or even just an attitude.',
        'Realize that happiness is a choice. Fifty percent of how happy you are lies within your control, so start doing more things that will make you happier.',
        'Everybody gets bored sometimes. But, if you really think about it, feelings of boredom are pretty strange. After all, there\'s a whole wide world full of stuff to do. How could humans ever lack for something to keep us occupied?',
        'There is a definite payoff to making real (not just professional or social media) friends. Increasing your number of friends correlates to higher subjective well being, doubling your number of friends is like increasing your income by 50 percent in terms of how happy you feel.',
        'According to one study, couples that expressed gratitude in their interactions with each other resulted in increases in relationship connection and satisfaction the next day--both for the person expressing thankfulness and (no big surprise) for the person receiving it. (In fact, the authors of the study said gratitude was like a "booster shot" for relationships.)',
        'Happy people focus on what they have, not on what they don\'t have. It\'s motivating to want more in your career, relationships, bank account, etc., but thinking about what you already have, and expressing gratitude for it, will make you a lot happier.It will also remind you that even if you still have huge dreams, you have already accomplished a lot--and should feel genuinely proud.',
        'Goals you don\'t pursue aren\'t goals, they\'re dreams, and dreams make you happy only when you\'re dreaming.Pursuing goals, though, does make you happy.',
        'So be grateful for what you have, and then actively try to achieve more. If you\'re pursuing a huge goal, make sure that every time you take a small step closer to achieving it, you pat yourself on the back.',
        'Don\'t compare where you are now with where you someday hope to be. Compare where you are now to where you were a few days ago. Then you\'ll get dozens of bite-size chunks of fulfillment--and a never-ending supply of things to be thankful for.',
        'You know the old cliché regarding the starving yet happy artist? Turns out it\'s true: artists are considerably more satisfied with their work than non-artists--even though the pay tends to be considerably lower than in other skilled fields.',
        'Everyone has at least a few things they do incredibly well. Find ways to do those things more often. You\'ll be a lot happier.And probably a lot more successful.',
        'Make choices that are right for you. Say things you really want to say to the people who most need to hear them. Express your feelings. Stop and smell a few roses. Make friends, and stay in touch with them.'
    ]
    for key, value in countryListAlpha2.items():
        country_code = key.lower()

        for i in range(1, 11):
            for e in range(1, random.randint(3, 9)):
                posts.append({
                    'i_feel': i_feel_arr[random.randint(0, 9)],
                    'because': because_arr[random.randint(0, 9)],
                    'action': action_arr[random.randint(0, 16)],
                    'post_id': str(ObjectId()),
                    'created_at': datetime.datetime.now() - datetime.timedelta(
                        days=random.randint(1, 10)),
                    'likes': random.randint(0, 77),
                    'feel': random.randint(1, 100)
                })
            users.append({'country_code': country_code,
                          'country': get_country_name(country_code),
                          'name': 'user_' + country_code + '_' + str(i),
                          'email': 'user_' + country_code + '_' + str(i) + '_@globi.com',
                          'password': generate_password_hash('password'),
                          'created_at': datetime.datetime.now(),
                          'last_login': datetime.datetime.now(),
                          'last_feel': random.randint(1, 100),
                          'user_feel': {
                              (datetime.datetime.now() - datetime.timedelta(days=10)).strftime("%F"): random.randint(1,
                                                                                                                     100),
                              (datetime.datetime.now() - datetime.timedelta(days=9)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=8)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=7)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=6)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=5)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=4)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=3)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=2)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                              (datetime.datetime.now() - datetime.timedelta(days=1)).strftime("%F"): random.randint(1,
                                                                                                                    100),
                          },
                          'posts': posts

                          })
            # mongo.db.users.insert_one(users[0])
            # users = []
            posts = []
        mongo.db.users.insert_many(users)
        users = []
        # return dumps(users)

        # country_users[country_code] = users


"""
   HOW TO CHECK IF CURRENTLY LOGGED IN USER ALREADY CREATED HIS DAILY FEEL 
"""


@factory_bp.route('/check_user')
def check_user():
    from app import mongo
    if (mongo.db.todays_users.find_one({
        "day": datetime.datetime.now().strftime("%F"),
        "users": {"$in": ['5eb3e568qf95642e8068f7']},

    })):

        user = 0
    else:
        user = 1
    return jsonify(user)


"""
    HOW TO GET COUNTRIES WITH FEELINGS  (TOP 10, 30,.....)
"""


@factory_bp.route('/get_countries')
def get_countries():
    from app import mongo
    c_feels = []

    country_feel = mongo.db.country_feel.aggregate(
        [
            {"$project": {"country_code": 1, "current": {"$divide": ["$current_feelings", "$current_people"]}}},
            {"$sort": {"current": -1}},
            {"$limit": 10}
        ]
    )
    for feel in country_feel:
        c_feels.append({'cc': feel['country_code'], "current": feel['current']})

    return jsonify(c_feels)


# @factory_bp.route('/insert_country_dict')
# def insert_country_dict():
#     c_dict = []
#     from app import mongo
#     for code, name in countryListAlpha2.items():
#
#         mongo.db.countries.insert({'cc' : code.lower(), 'name': name})
#     return  'insert_country_dict done'
"""
   HOW TO GET COUNTRY PROGRESS FOR 10,30,.....DAYS 
"""


@factory_bp.route('/get_country_progress')
def country_progress():
    from app import mongo
    results = []

    feels = mongo.db.country_feel.find_one(
        {'country_code': 'af'},

        {'feels': 1, '_id': 0})

    for feel in feels['feels']:
        if feel <= datetime.datetime.now().strftime("%F") and feel >= (
                (datetime.datetime.now() - datetime.timedelta(days=10)).strftime("%F")):
            results.append(
                {'day': feel, 'feel': feels['feels'][feel]['sum_of_feelings'] / feels['feels'][feel]['num_of_people']})

    return jsonify(results)


"""
   HELPER FUNCTION TO GET COUNTRY NAME ACCORDING TO COUNTRY CODE 
"""


@factory_bp.route('/get_country_name')
def get_country_name(c_code):
    """GOING TO DB ONLY ONCE PER SESSION AS THIS DATA IS NEVER CHANGING... TO DO : CHECK CACHE"""
    if not session.get('countries'):
        countries = {}
        from app import mongo

        all_countries = mongo.db.countries.find()
        for country in all_countries:
            countries[country['cc']] = country['name']

        session['countries'] = countries
    else:
        countries = session.get('countries')

    return countries[c_code]


countryListAlpha2 = {"CA": "Canada",
                     "AF": "Afghanistan",
                     "AL": "Albania",
                     "DZ": "Algeria",
                     "AS": "American Samoa",
                     "AD": "Andorra",
                     "AO": "Angola",
                     "AI": "Anguilla",
                     # "AQ": "Antarctica",
                     "AG": "Antigua and Barbuda",
                     "AR": "Argentina",
                     "AM": "Armenia",
                     "AW": "Aruba",
                     "AU": "Australia",
                     "AT": "Austria",
                     "AZ": "Azerbaijan",
                     "BS": "Bahamas (the)",
                     "BH": "Bahrain",
                     "BD": "Bangladesh",
                     "BB": "Barbados",
                     "BY": "Belarus",
                     "BE": "Belgium",
                     "BZ": "Belize",
                     "BJ": "Benin",
                     "BM": "Bermuda",
                     "BT": "Bhutan",
                     "BO": "Bolivia (Plurinational State of)",
                     "BQ": "Bonaire, Sint Eustatius and Saba",
                     "BA": "Bosnia and Herzegovina",
                     "BW": "Botswana",
                     # "BV": "Bouvet Island",
                     "BR": "Brazil",
                     # "IO": "British Indian Ocean Territory (the)",
                     "BN": "Brunei Darussalam",
                     "BG": "Bulgaria",
                     "BF": "Burkina Faso",
                     "BI": "Burundi",
                     "CV": "Cabo Verde",
                     "KH": "Cambodia",
                     "CM": "Cameroon",

                     "KY": "Cayman Islands (the)",
                     "CF": "Central African Republic (the)",
                     "TD": "Chad",
                     "CL": "Chile",
                     "CN": "China",
                     # "CX": "Christmas Island",
                     # "CC": "Cocos (Keeling) Islands (the)",
                     "CO": "Colombia",
                     "KM": "Comoros (the)",
                     "CD": "Congo (the Democratic Republic of the)",
                     "CG": "Congo (the)",
                     "CK": "Cook Islands (the)",
                     "CR": "Costa Rica",
                     "HR": "Croatia",
                     "CU": "Cuba",
                     "CW": "Curaçao",
                     "CY": "Cyprus",
                     "CZ": "Czechia",
                     "CI": "Côte d'Ivoire",
                     "DK": "Denmark",
                     "DJ": "Djibouti",
                     "DM": "Dominica",
                     "DO": "Dominican Republic (the)",
                     "EC": "Ecuador",
                     "EG": "Egypt",
                     "SV": "El Salvador",
                     "GQ": "Equatorial Guinea",
                     "ER": "Eritrea",
                     "EE": "Estonia",
                     "SZ": "Eswatini",
                     "ET": "Ethiopia",
                     "FK": "Falkland Islands (the) [Malvinas]",
                     "FO": "Faroe Islands (the)",
                     "FJ": "Fiji",
                     "FI": "Finland",
                     "FR": "France",
                     "GF": "French Guiana",
                     "PF": "French Polynesia",
                     # "TF": "French Southern Territories (the)",
                     "GA": "Gabon",
                     "GM": "Gambia (the)",
                     "GE": "Georgia",
                     "DE": "Germany",
                     "GH": "Ghana",
                     "GI": "Gibraltar",
                     "GR": "Greece",
                     "GL": "Greenland",
                     "GD": "Grenada",
                     "GP": "Guadeloupe",
                     "GU": "Guam",
                     "GT": "Guatemala",
                     "GG": "Guernsey",
                     "GN": "Guinea",
                     "GW": "Guinea-Bissau",
                     "GY": "Guyana",
                     "HT": "Haiti",
                     # "HM": "Heard Island and McDonald Islands",
                     "VA": "Holy See (the)",
                     "HN": "Honduras",
                     "HK": "Hong Kong",
                     "HU": "Hungary",
                     "IS": "Iceland",
                     "IN": "India",
                     "ID": "Indonesia",
                     "IR": "Iran (Islamic Republic of)",
                     "IQ": "Iraq",
                     "IE": "Ireland",
                     "IM": "Isle of Man",
                     "IL": "Israel",
                     "IT": "Italy",
                     "JM": "Jamaica",
                     "JP": "Japan",
                     "JE": "Jersey",
                     "JO": "Jordan",
                     "KZ": "Kazakhstan",
                     "KE": "Kenya",
                     "KI": "Kiribati",
                     "KP": "Korea (the Democratic People's Republic of)",
                     "KR": "Korea (the Republic of)",
                     "KW": "Kuwait",
                     "KG": "Kyrgyzstan",
                     "LA": "Lao People's Democratic Republic (the)",
                     "LV": "Latvia",
                     "LB": "Lebanon",
                     "LS": "Lesotho",
                     "LR": "Liberia",
                     "LY": "Libya",
                     "LI": "Liechtenstein",
                     "LT": "Lithuania",
                     "LU": "Luxembourg",
                     "MO": "Macao",
                     "MG": "Madagascar",
                     "MW": "Malawi",
                     "MY": "Malaysia",
                     "MV": "Maldives",
                     "ML": "Mali",
                     "MT": "Malta",
                     "MH": "Marshall Islands (the)",
                     "MQ": "Martinique",
                     "MR": "Mauritania",
                     "MU": "Mauritius",
                     "YT": "Mayotte",
                     "MX": "Mexico",
                     "FM": "Micronesia (Federated States of)",
                     "MD": "Moldova (the Republic of)",
                     "MC": "Monaco",
                     "MN": "Mongolia",
                     "ME": "Montenegro",
                     "MS": "Montserrat",
                     "MA": "Morocco",
                     "MZ": "Mozambique",
                     "MM": "Myanmar",
                     "NA": "Namibia",
                     "NR": "Nauru",
                     "NP": "Nepal",
                     "NL": "Netherlands (the)",
                     "NC": "New Caledonia",
                     "NZ": "New Zealand",
                     "NI": "Nicaragua",
                     "NE": "Niger (the)",
                     "NG": "Nigeria",
                     "NU": "Niue",
                     "NF": "Norfolk Island",
                     "MP": "Northern Mariana Islands (the)",
                     "NO": "Norway",
                     "OM": "Oman",
                     "PK": "Pakistan",
                     "PW": "Palau",
                     "PS": "Palestine, State of",
                     "PA": "Panama",
                     "PG": "Papua New Guinea",
                     "PY": "Paraguay",
                     "PE": "Peru",
                     "PH": "Philippines (the)",
                     "PN": "Pitcairn",
                     "PL": "Poland",
                     "PT": "Portugal",
                     "PR": "Puerto Rico",
                     "QA": "Qatar",
                     "MK": "Republic of North Macedonia",
                     "RO": "Romania",
                     "RU": "Russian Federation (the)",
                     "RW": "Rwanda",
                     "RE": "Réunion",
                     # "BL": "Saint Barthélemy",
                     "SH": "Saint Helena, Ascension and Tristan da Cunha",
                     "KN": "Saint Kitts and Nevis",
                     "LC": "Saint Lucia",
                     # "MF": "Saint Martin (French part)",
                     "PM": "Saint Pierre and Miquelon",
                     "VC": "Saint Vincent and the Grenadines",
                     "WS": "Samoa",
                     "SM": "San Marino",
                     "ST": "Sao Tome and Principe",
                     "SA": "Saudi Arabia",
                     "SN": "Senegal",
                     "RS": "Serbia",
                     "SC": "Seychelles",
                     "SL": "Sierra Leone",
                     "SG": "Singapore",
                     "SX": "Sint Maarten (Dutch part)",
                     "SK": "Slovakia",
                     "SI": "Slovenia",
                     "SB": "Solomon Islands",
                     "SO": "Somalia",
                     "ZA": "South Africa",
                     # "GS": "South Georgia and the South Sandwich Islands",
                     "SS": "South Sudan",
                     "ES": "Spain",
                     "LK": "Sri Lanka",
                     "SD": "Sudan (the)",
                     "SR": "Suriname",
                     # "SJ": "Svalbard and Jan Mayen",
                     "SE": "Sweden",
                     "CH": "Switzerland",
                     "SY": "Syrian Arab Republic",
                     "TW": "Taiwan (Province of China)",
                     "TJ": "Tajikistan",
                     "TZ": "Tanzania, United Republic of",
                     "TH": "Thailand",
                     "TL": "Timor-Leste",
                     "TG": "Togo",
                     "TK": "Tokelau",
                     "TO": "Tonga",
                     "TT": "Trinidad and Tobago",
                     "TN": "Tunisia",
                     "TR": "Turkey",
                     "TM": "Turkmenistan",
                     "TC": "Turks and Caicos Islands (the)",
                     "TV": "Tuvalu",
                     "UG": "Uganda",
                     "UA": "Ukraine",
                     "AE": "United Arab Emirates (the)",
                     "GB": "United Kingdom of Great Britain and Northern Ireland (the)",
                     # "UM": "United States Minor Outlying Islands (the)",
                     "US": "United States of America (the)",
                     "UY": "Uruguay",
                     "UZ": "Uzbekistan",
                     "VU": "Vanuatu",
                     "VE": "Venezuela (Bolivarian Republic of)",
                     "VN": "Viet Nam",
                     "VG": "Virgin Islands (British)",
                     "VI": "Virgin Islands (U.S.)",
                     "WF": "Wallis and Futuna",
                     "EH": "Western Sahara",
                     "YE": "Yemen",
                     "ZM": "Zambia",
                     "ZW": "Zimbabwe",
                     # "AX": "Åland Islands"
                     }
