
import datetime

from flask import Blueprint, render_template

landing_bp = Blueprint('landing_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets_dist/landing')

"""LANDING PAGE WHERE USER CAN:
    1. SEE HOW DOES THE WORLD FEEL 
    2. ADD HIS OWN GLOB WITH HOW HE FEELS AND WHY AND WHAT DOES HE DO TO FEEL THIS WAY OR BETTER
    3. SEARCH FOR OTHER GLOBS BASED ON HOW HE FEELS
    4. CHECK VARIOUS CHARTS FROM WORLD FEEL PROGRESS TO TOP FEELING COUNTRIES TO COUNTRY PROGRESS OVER TIME
    5. SEE MAP WITH LAYERS COLOURED ACCORDING TO FEEL OF THE COUNTRY <- TO DO
    6. HE CAN LOGIN OR REGISTER IF HE WISHES TO DO SO
    """


@landing_bp.route('/')
def index():
    num_of_people = []
    sum_of_feelings = []
    """GETTING FEELINGS FOR THE LAST 30 DAYS"""
    from app import mongo
    feels = mongo.db.world_feel.find(
        {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=30)).strftime("%F")}})


    for feel in feels:
        num_of_people.append(int(feel['num_of_people']))
        sum_of_feelings.append(int(feel['sum_of_feelings']))

    """SOME CALCULATIONS TO GET AVERAGE, DISPLAYING ROUNDED AND NOT ROUNDED VERSION OF FEELINGS"""

    world_feel = 0 if sum(sum_of_feelings) == 0 else sum(sum_of_feelings) / sum(num_of_people)

    return render_template('landing/landing.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)



