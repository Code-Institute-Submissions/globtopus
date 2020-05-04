from flask import Blueprint, request, jsonify

map_bp = Blueprint('map_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/map')

@map_bp.route('/_country_feel', methods=['POST'])
def country_feel():
    from app import mongo


    feels = {}
    current_people = {}

    country_feel = mongo.db.country_feel.aggregate(
        [
            {"$project": {"country_code": 1,"current_people":1, "current": {"$divide": ["$current_feelings", "$current_people"]}}},
            {"$sort": {"current": -1}},

        ]
    )
    for feel in country_feel:

        feels[feel['country_code']] = str(round(feel['current'], 2))
        current_people[feel['country_code']] = feel['current_people']

    return jsonify(feels=feels ,current_people=current_people)