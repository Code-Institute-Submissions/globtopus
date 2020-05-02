import datetime
import random

from flask import Blueprint, request, jsonify

charts_bp = Blueprint('charts_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/charts')
@charts_bp.route('/_world_feel')
def world_feel():
    from app import mongo
    num_of_days = request.args.get('num_of_days', 0, type=int)
    day_feels=[]
    days=[]
    colors = []
    feels = mongo.db.world_feel.find(
    {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=num_of_days*2)).strftime("%F")}})

    for feel in feels:

        days.append(feel['day'])
        day_feels.append(int(feel['sum_of_feelings']) / int(feel['num_of_people']))


    for i in range(1,num_of_days*2):

        colors.append('#'+ str(random.randint(111111,999999)))

    return jsonify(day_feels=day_feels,days=days,B_colors=colors)