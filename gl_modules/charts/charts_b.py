import datetime
import random
from json import dump

from gl_modules.factory.factory_b import get_country_name
from flask import Blueprint, request, jsonify

charts_bp = Blueprint('charts_bp', __name__,
                      template_folder='templates',
                      static_folder='static',
                      static_url_path='assets/charts')


@charts_bp.route('/_chart_data')
def charts_data():
    from app import mongo

    """required data to display charts from AJAX REQUEST"""
    num_of_days = request.args.get('num_of_days', 0, type=int)
    num_of_countries = request.args.get('num_of_countries', 0, type=int)
    chart_type = request.args.get('type', 0, type=str)
    country_code = request.args.get('country_code', 0, type=str)

    """IF TYPE OF CHART IS world => WE WILL INITIALLY CALCULATE LAST 7 DAYS AND DISPLAY LINE CHART
        USER HAS OPTION OF SELECTING LONGER DURATIONS 30-9-180-360 DAYS
        
        IF TYPE IS countries    =>    WE WILL INITIALLY DISPLAY 10 TOP FEELING COUNTRIES
        AT ALL TIMES
        USER CAN SELECT TOP 30 OR ALL
        
        IF TYPE IS country =>   WE WILL INITIALLY DISPLAY PAST 7 DAYS PROGRESS OF SELECTED COUNTRY
        USER HAS OPTIONS OF 30-90-180-360 DAYS"""
    if chart_type == 'world':

        day_feels = []
        days = []

        feels = mongo.db.world_feel.find(
            {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=num_of_days)).strftime("%F")}})
        counter = 0
        for feel in feels:
            counter += 1
            days.append(feel['day'])
            day_feels.append( int(feel['sum_of_feelings']) / int(feel['num_of_people']) if int(feel['num_of_people']) != 0 else '')

        return jsonify(feels=day_feels, labels=days, B_colors=get_colors(num_of_days))

    elif chart_type == 'countries':

        from app import mongo

        countries = []
        country_codes = []
        feels = []
        """current feel past 7 days"""
        country_feel = mongo.db.country_feel.aggregate(
            [
                {"$project": {"country_code": 1, "total": {"$divide": ["$total_feelings", "$total_people"]}}},
                {"$sort": {"total": -1}},
                {"$limit": num_of_countries}
            ]
        )
        for feel in country_feel:
            countries.append(get_country_name(feel['country_code']))
            country_codes.append(feel['country_code'])
            feels.append(str(round(feel['total'], 2)))

        return jsonify(feels=feels, labels=countries, B_colors=get_colors(num_of_countries),
                       country_codes=country_codes)
    elif chart_type == 'country':
        day_feels = []
        days = []

        feels = mongo.db.country_feel.find_one(
            {'country_code': country_code},


           )
        """feels for the period of x past days"""
        for day in feels['feels']:

            if datetime.datetime.now().strftime("%F") >= day >= (
                    (datetime.datetime.now() - datetime.timedelta(days=num_of_days)).strftime("%F")):
                day_feels.append(feels['feels'][day]['sum_of_feelings'] / feels['feels'][day]['num_of_people'])

                days.append(day)

        """day_feels[::-1] reversing array to display dates from oldest to newest"""
        return jsonify(feels=day_feels, labels=days, B_colors=get_colors(num_of_days),
                       country_name=get_country_name(country_code))


"""COLORS FOR THE CHARTS IN charts.js AS EVERY COUNTRY NEED ONE COLOR
TO BE DISPLAYED NICELY, I AM GENERATING RANDOM NUMBERS FROM RANGE OF
NUMBERS AND APPENDING HASH TO IT"""


def get_colors(number):
    colors = []
    for i in range(0, number):
        colors.append('#' + str(random.randint(111111, 999999)))

    return colors
