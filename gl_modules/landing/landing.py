from bson import ObjectId
from flask import Blueprint, render_template, request, flash, redirect, url_for, session, jsonify
import datetime

from app import mongo
from gl_modules.shared.today import sanitize, today_f
from gl_modules.shared.update_feel import update_world_feel, update_country_feel

landing_bp = Blueprint('landing_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets')


@landing_bp.route('/')
def index():
    num_of_people = []
    sum_of_feelings = []
    """GETTING FEELINGS FOR THE LAST 7 DAYS"""
    feels = mongo.db.world_feel.find(
        {"day": {"$gte": (datetime.datetime.now() - datetime.timedelta(days=6)).strftime("%F")}})

    for feel in feels:
        num_of_people.append(int(feel['num_of_people']))
        sum_of_feelings.append(int(feel['sum_of_feelings']))

    """SOME CALCULATIONS TO GET AVERAGE, DISPLAYING ROUNDED AND NOT ROUNDED VERSION OF FEELINGS"""

    world_feel = 0 if sum(sum_of_feelings) == 0 else sum(sum_of_feelings) / sum(num_of_people)

    return render_template('landing/landing.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)


@landing_bp.route('/add_your_feel', methods=['POST'])
def add_your_feel():
    """INSERTING INTO FEELS TABLE"""
    form_data = request.form.to_dict()
    if form_data['user_feel'] == '':
        flash('Please select how you feel!')

        return redirect(url_for('index'))

    form_data['user_email'] = session.get('user_email')
    form_data['user_name'] = session.get('user_name')
    form_data['i_feel'] = sanitize(form_data['i_feel'])
    form_data['because'] = sanitize(form_data['because'])
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

    mongo.db.feels.insert_one(form_data)

    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
       TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
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
    return redirect(url_for('index'))


@landing_bp.route('/_search')
def search():
    q = sanitize(request.args.get('q', 0, type=str).lower())  # array

    results = []

    feelists = mongo.db.feels.find(

        {"$or": [
            {"i_feel": {"$in": q}},  # q is array
            {"because": {"$in": q}}  # q is array
        ]}
    )
    # obj_id = "5ea738942f3d6b576e209382"
    # feelists = mongo.db.feels.find(
    #
    #     {"_id": ObjectId(obj_id)}
    # )

    for feel in feelists:
        results.append(
            {
                'id': str(feel['_id']),
                'user_name': str(feel['user_name']),
                'user_feel': int(feel['user_feel']),
                'feelings': feel['i_feel'],
                'because': (' ').join(feel['because']),
                'action_1': str(feel['action_1']),
                'action_2': str(feel['action_2']),
                'action_3': str(feel['action_3']),
                'action_1_likes': str(feel['action_1_likes']),
                'action_2_likes': str(feel['action_2_likes']),
                'action_3_likes': str(feel['action_3_likes']),
                'action_1_feelist': str(feel['action_1_feelist']),
                'action_2_feelist': str(feel['action_2_feelist']),
                'action_3_feelist': str(feel['action_3_feelist']),
                'action_1_flag': str(feel['action_1_flag']),
                'action_2_flag': str(feel['action_2_flag']),
                'action_3_flag': str(feel['action_3_flag']),

            }
        )

    return jsonify(result=results,
                   feelists=session.get('user_feelist') if session.get('user_feelist') else {},
                   authorized_user=True if session.get('authorized_user') else False)


@landing_bp.route('/_actions')
def actions():
    action_num = request.args.get('action_num', 0, type=str)
    glob_id = request.args.get('glob_id', 0, type=str)
    action = request.args.get('action', 0, type=str)
    feel_list = request.args.get('feel_list', 0, type=str)

    if not session.get('authorized_user'):
        return jsonify(result='not_authorized')

    """if we have feelist we will update feelist object (it is one level deeper then likes
    that's why ...)"""
    if feel_list:
        field_to_update = action + '.' + feel_list + '.' + glob_id

        """if we do not have feelist we will update likes object"""
    else:
        field_to_update = action + '.' + glob_id

    """check if user already liked/added action to his feelist"""

    alreday_added = mongo.db.users.find_one(
        {"email": session.get('user_email'), field_to_update: {"$in": [action_num]}},

    )
    if alreday_added:
        return jsonify(result='already_added')

    """update user likes/feelist if it is new like"""
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$push": {field_to_update: action_num}}
        ,
        upsert=True
    )

    """update feel likes/feelists if it is new like"""
    mongo.db.feels.update(
        {"_id": ObjectId(glob_id)},
        {"$inc":
             {"action_" + action_num + "_" + action: 1,
              }}
        ,
        upsert=True
    )

    return jsonify(result=glob_id)
