from flask import Blueprint, request, jsonify

from gl_modules.factory.factory_b import get_country_name

map_bp = Blueprint('map_bp', __name__,
                   template_folder='templates',
                   static_folder='static',
                   static_url_path='assets/map')


@map_bp.route('/_country_feel', methods=['POST'])
def country_feel():
    from app import mongo

    feels = {}
    total_people = {}

    country_feel = mongo.db.country_feel.aggregate(
        [
            {"$project": {"country_code": 1, "total_people": 1,
                          "total": {"$divide": ["$total_feelings", "$total_people"]}}},
            {"$sort": {"total": -1}},

        ]
    )
    for feel in country_feel:
        feels[feel['country_code']] = str(round(feel['total'], 2))
        total_people[feel['country_code']] = feel['total_people']

    return jsonify(feels=feels, total_people=total_people)


@map_bp.route('/_range_countries')
def twenty_country():
    from app import mongo
    range = request.args.get('range',0, type=str)
    r_split = range.split('-')

    country_feel = mongo.db.country_feel.find(
        {"$and": [{"$expr": {"$gt": [{"$divide": ["$total_feelings", "$total_people"]}, int(r_split[0])]}},
                  {"$expr": {"$lt": [{"$divide": ["$total_feelings", "$total_people"]}, int(r_split[1])]}},

                  ]},
        {'_id': 0})
    countries = {}
    for feel in country_feel:
        countries[feel["country_code"]] = [
            round(feel['total_feelings'] / feel['total_people'], 2),
            get_country_name(feel["country_code"])
        ]

    return jsonify(countries=countries, size= len(countries) )
