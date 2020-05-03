from flask import Blueprint, render_template, request, flash, redirect, url_for, session, jsonify
import datetime

from gl_modules.shared.today import today_f
from gl_modules.shared.sanitize import sanitize
from gl_modules.shared.update_feel import update_world_feel, update_country_feel

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
    """GETTING FEELINGS FOR THE LAST 7 DAYS"""
    from app import mongo
    feels = mongo.db.world_feel.find(
        {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=6)).strftime("%F")}})

    for feel in feels:
        num_of_people.append(int(feel['num_of_people']))
        sum_of_feelings.append(int(feel['sum_of_feelings']))

    """SOME CALCULATIONS TO GET AVERAGE, DISPLAYING ROUNDED AND NOT ROUNDED VERSION OF FEELINGS"""

    world_feel = 0 if sum(sum_of_feelings) == 0 else sum(sum_of_feelings) / sum(num_of_people)

    return render_template('landing/landing.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)


""" USER CREATING GLOB """


@landing_bp.route('/add_your_feel', methods=['POST'])
def add_your_feel():
    """INSERTING INTO FEELS TABLE"""
    form_data = request.form.to_dict()
    if form_data['user_feel'] == '':
        flash('Please select how you feel!')

        return redirect(url_for('landing_bp.index'))

    form_data['user_email'] = session.get('user_email')
    form_data['user_name'] = session.get('user_name')
    form_data['i_feel'] = sanitize(form_data['i_feel'], 'array')
    form_data['because'] = sanitize(form_data['because'], 'array')
    form_data['actions'] = {'text': [form_data['action_1'], form_data['action_2'], form_data['action_3']]}
    form_data['action_1_likes'] = 0
    form_data['action_2_likes'] = 0
    form_data['action_3_likes'] = 0
    form_data['action_1_flag'] = 0
    form_data['action_2_flag'] = 0
    form_data['action_3_flag'] = 0
    form_data['action_1_feelist'] = 0
    form_data['action_2_feelist'] = 0
    form_data['action_3_feelist'] = 0
    day = datetime.datetime.now()
    form_data['created_at'] = day

    from app import mongo
    mongo.db.feels.insert_one(form_data)

    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
      IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
       WITHOUT ADDING EXTRA PERSON TO THE MIX 
       - LAST FEELING + CURRENT FEELING"""

    update_world_feel(mongo, 0, int(form_data['user_feel']) - int(session.get('user_feel')))
    """updating user feel during the day, when he feels differently"""
    today = today_f()
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'user_feel.' + today: form_data['user_feel']}})

    """updating country feel"""
    update_country_feel(mongo, session.get("user_country_code"), 0,
                        int(form_data['user_feel']) - int(session.get('user_feel')))
    session['user_feel'] = form_data["user_feel"]

    flash('Thank you ' + session.get('user_name'))
    return redirect(url_for('landing_bp.index'))
