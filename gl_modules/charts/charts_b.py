import datetime
import random
from gl_modules.factory.factory_b import get_country_name
from flask import Blueprint, request, jsonify

charts_bp = Blueprint('charts_bp', __name__,
                      template_folder='templates',
                      static_folder='static',
                      static_url_path='assets/charts')


@charts_bp.route('/_chart_data')
def world_feel():
    from app import mongo
    num_of_days = request.args.get('num_of_days', 0, type=int)
    num_of_countries = request.args.get('num_of_countries', 0, type=int)
    chart_type = request.args.get('type', 0, type=str)
    country_code = request.args.get('country_code', 0, type=str)

    if chart_type == 'world':

        day_feels = []
        days = []

        feels = mongo.db.world_feel.find(
            {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=num_of_days)).strftime("%F")}})

        for feel in feels:
            days.append(feel['day'])
            day_feels.append(int(feel['sum_of_feelings']) / int(feel['num_of_people']))

        return jsonify(feels=day_feels, labels=days, B_colors=get_colors(num_of_days))

    elif chart_type == 'countries':

        from app import mongo

        countries = []
        country_codes = []
        feels = []
        country_feel = mongo.db.country_feel.aggregate(
            [
                {"$project": {"country_code": 1, "current": {"$divide": ["$current_feelings", "$current_people"]}}},
                {"$sort": {"current": -1}},
                {"$limit": num_of_countries}
            ]
        )
        for feel in country_feel:
            countries.append(get_country_name(feel['country_code']))
            country_codes.append(feel['country_code'])
            feels.append(str(round(feel['current'], 2)))

        return jsonify(feels=feels, labels=countries, B_colors=get_colors(num_of_countries),
                       country_codes=country_codes)
    elif chart_type == 'country':
        day_feels = []
        days = []

        feels = mongo.db.country_feel.find_one(
            {'country_code': country_code},

            {'feels': 1, '_id': 0})

        for day in feels['feels']:
            if day <= datetime.datetime.now().strftime("%F") and day >= (
                    (datetime.datetime.now() - datetime.timedelta(days=num_of_days)).strftime("%F")):
                day_feels.append(feels['feels'][day]['sum_of_feelings'] / feels['feels'][day]['num_of_people'])
                days.append(day)
        """day_feels[::-1] reversing array to display dates from oldest to newest"""
        return jsonify(feels= day_feels[::-1], labels= days[::-1], B_colors=get_colors(num_of_days),country_name=get_country_name(country_code))


def get_colors(number):
    colors = []
    for i in range(0, number):
        colors.append('#' + str(random.randint(111111, 999999)))

    return colors
