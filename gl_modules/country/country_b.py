import random

from bson.json_util import dumps
from flask import Blueprint, render_template, jsonify, session, request

from gl_modules.factory.factory_b import get_country_name

country_bp = Blueprint('country_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/country')


@country_bp.route('<country_code>', methods=['GET'])
def country(country_code):
    from app import mongo

    posts = []
    search_results = mongo.db.users.aggregate([

        {"$unwind": '$posts'},

        {"$match": {'country_code': country_code}},

        {"$sort": {"posts.created_at": -1}},
        {"$limit": 10}

    ])

    for result in search_results:
        posts.append(
            {
                'id': str(result['posts']['post_id']),
                'username': str(result['name']),
                'in_my_glob': 1 if 'added_me' in result and session.get('user_id') in result['added_me'] else 0,
                'user_id': str(result['_id']),
                'user_feel': int(result['posts']['feel']),
                'i_feel': ' '.join(result['posts']['i_feel']),
                'because': ' '.join(result['posts']['because']),
                'action': str(result['posts']['action']),
                'created_at': result['posts']['created_at'].strftime("%F %X"),
                'likes': result['posts']['likes'] if 'likes' in result['posts'] else 0,
                'additions': result['posts']['additions'] if 'additions' in result['posts'] else 0,
                'flags': result['posts']['flags'] if 'flags' in result['posts'] else 0

            }
        )

    return render_template('country/country.html', country_name=get_country_name(country_code), cc=country_code,
                           posts=posts, random=random)


@country_bp.route('/load_map')
def load_map():
    from app import mongo
    cc = request.args.get('cc', 0, type=str)

    county_feel = mongo.db.stats.aggregate(
        [

            {"$match": {'cc': cc}},

            {
                "$project":
                    {"_id" : 0,"cl": 1,
                     "total": {"$divide": ["$total_feelings", "$total_people"]}
                     }
            },
            {"$sort":
                 {"total": -1}
             },

        ]
    )
    feels={}
    for feel in county_feel:
        feels[feel['cl']] = feel['total']

    c_map = mongo.db.c_maps.find_one({'cc': cc}, {'_id': 0})['counties']
    svg_map = []
    for county in c_map:
        svg_map.append({county['name']: county['d']})

    return jsonify(c_map=svg_map, c_c=cc,feels=feels)
