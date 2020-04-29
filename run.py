import os
import string

from bson import ObjectId
from flask import Flask, render_template, redirect, url_for, request, flash, session, json, jsonify
from flask_pymongo import PyMongo
import datetime
from werkzeug.security import check_password_hash, generate_password_hash
import re

app = Flask(__name__)
app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)


@app.route('/')
def index():
    # mongo.db.feels.remove({})
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

    return render_template('index.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)


def update_world_feel(people, feeling):
    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
      TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
      WITHOUT ADDING EXTRA PERSON TO THE MIX
      - LAST FEELING + CURRENT FEELING"""

    """if logged in user changing his feel, we will just recalculate his feel
     without adding new person to the mix, 
     if new user we will ad 1 person to the mix"""

    mongo.db.world_feel.update(
        {"day": datetime.datetime.now().strftime("%F")},
        {"$inc":
             {"num_of_people": people,
              "sum_of_feelings": feeling}}
        ,
        upsert=True
    )


def update_country_feel(country_code, people, feeling):
    today = today_f()

    """if logged in user changing his feel, we will just recalculate his feel
     without adding new person to the mix, 
     if new user we will ad 1 person to the mix"""

    mongo.db.country_feel.update(
        {"country_code": country_code},
        {"$inc":
             {"feels." + today + ".num_of_people": people,
              "feels." + today + ".sum_of_feelings": feeling}}
        ,
        upsert=True
    )


def today_f():
    return datetime.datetime.now().strftime("%F")


def sanitize(string):
    """REMOVING ALL NON ALPHA-NUMERIC
    https://stackoverflow.com/questions/1276764/stripping-everything-but-alphanumeric-chars-from-a-string-in-python
    """
    santized = []
    for stringy in string.replace(',',' ').split():
        santized.append(re.sub(r'\W+', '',stringy).lower())
    return santized



@app.route('/add_your_feel', methods=['POST'])
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

    update_world_feel(0, int(form_data['user_feel']) - int(session.get('user_feel')))
    """updating user feel during the day, when he feels differently"""
    today = today_f()
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'user_feel.' + today: form_data['user_feel']}})

    """updating country feel"""
    update_country_feel(session.get("user_country_code"), 0,
                        int(form_data['user_feel']) - int(session.get('user_feel')))
    session['user_feel'] = form_data["user_feel"]

    flash('Thank you ' + session.get('user_name'))
    return redirect(url_for('index'))


@app.route('/admin')
def admin():
    return render_template('admin.html')


"""show log in form"""


@app.route('/sign_in')
def sign_in():
    return render_template('sign_in.html')


"""log user into application"""


@app.route('/login', methods=['POST'])
def login():
    form_data = request.form.to_dict()

    user_to_check = mongo.db.users.find({"email": form_data['email']})

    if form_data['user_feel'] == '':
        """remembering user email and displaying it 
        in the form or redirect, so that user doesn't have to type 
        it again"""
        session['form_email'] = form_data['email']

        flash('Please select how you feel!')

        return redirect(url_for('sign_in'))

    form_data['last_login'] = datetime.datetime.now()
    user_password = ''
    user_name = ''
    user_email = ''

    for field in user_to_check:
        user_password = field['password']
        user_name = field['name']
        user_email = field['email']
        last_login = field['last_login']
        country_code = field['country_code']

        user_feelist = field['feelist']
        last_feel = field['last_feel']
    """if we have user with those credentials we will log user """
    if check_password_hash(user_password, form_data['password']) and user_email == form_data['email']:

        mongo.db.users.update(
            {"email": user_email},
            {"$set": {'last_login': datetime.datetime.now(), 'user_feel.' + today_f(): form_data['user_feel']}},
            upsert=True
        )

        session.clear()

        session['user_name'] = user_name
        session['last_login'] = last_login
        session['user_country_code'] = country_code
        session['user_feelist'] = user_feelist

        session_user(form_data)
        """updating country feel"""
        update_country_feel(country_code, 0, int(form_data['user_feel']) - int(last_feel))
        """updating world feel"""
        update_world_feel(0, int(form_data['user_feel']) - int(last_feel))

        session['user_feel'] = form_data['user_feel']

        return redirect(url_for('user'))
    else:
        session['form_email'] = form_data['email']
        flash('Please provide valid email and password')
        return redirect(url_for('sign_in'))


""""show register form"""


@app.route('/sign_up')
def sign_up():
    # mongo.db.world_feel.insert_many([
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=3)).strftime("%F"),
    #         "num_of_people": 456,
    #         "sum_of_feelings": 45657
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=4)).strftime("%F"),
    #         "num_of_people": 3443,
    #         "sum_of_feelings": 34566
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=5)).strftime("%F"),
    #         "num_of_people": 432,
    #         "sum_of_feelings": 54455
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=6)).strftime("%F"),
    #         "num_of_people": 1234,
    #         "sum_of_feelings": 87654
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=7)).strftime("%F"),
    #         "num_of_people": 222,
    #         "sum_of_feelings": 66645
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=8)).strftime("%F"),
    #         "num_of_people": 123,
    #         "sum_of_feelings": 45656
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=9)).strftime("%F"),
    #         "num_of_people": 233,
    #         "sum_of_feelings": 34343
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=10)).strftime("%F"),
    #         "num_of_people": 2344,
    #         "sum_of_feelings": 53221
    #     },
    #     {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=11)).strftime("%F"),
    #         "num_of_people": 345,
    #         "sum_of_feelings": 54332
    #     }, {
    #
    #         "day": (datetime.datetime.now() - datetime.timedelta(days=2)).strftime("%F"),
    #         "num_of_people": 456,
    #         "sum_of_feelings": 45657
    #     }
    # ]
    # )

    return render_template('sign_up.html')


"""register new user"""


@app.route('/register', methods=['POST'])
def register():
    form_data = request.form.to_dict()

    user_email = form_data['email']
    """IF USER DIDN'T SELECT HOW HE FEELS WE WILL FLASH MESSAGE
    TO SELECT HIS FEELINGS WITH FORM DATA RETURNED BACK TO HIM
    SO THAT HE DOESN'T NEED TO TYPE IT AGAIN"""
    if form_data['user_feel'] == '':
        sticky_form(form_data)

        flash('Please select how you feel!')
        return redirect(url_for('sign_up'))

    if form_data['country_code'] == '':
        sticky_form(form_data)

        flash('Please select location on the map!')

        return redirect(url_for('sign_up'))
    """if we have user with this email, we will not register user"""
    if list(mongo.db.users.find({"email": form_data['email']})):

        flash(user_email + ' :  is already registered')

        sticky_form(form_data)

        return redirect(url_for('sign_up'))


    else:
        """UPDATING WORLD FEEL WITH NEW USER FEELINGS"""
        update_world_feel(1, int(form_data['user_feel']))
        """INSERTING INTO FEELS TABLE"""

        """creating new user in country feel"""
        update_country_feel(form_data["country_code"], 1, int(form_data['user_feel']))

        """we will register user and set his id into session 
        redirect to user dashboard and change nav to logout instead of login | sign up"""
        session.clear()

        form_data['created_at'] = datetime.datetime.now()
        form_data['last_login'] = datetime.datetime.now()
        form_data['password'] = generate_password_hash('password')
        form_data['feelist'] = {}

        session_user(form_data, True)

        form_data['user_feel'] = {datetime.datetime.now().strftime("%F"): form_data['user_feel']}
        form_data['last_feel'] = form_data['user_feel']

        mongo.db.users.insert_one(form_data)

        return redirect(url_for('user'))


def session_user(form_data, register=False):
    session['authorized_user'] = True
    session['user_email'] = form_data['email']
    session['user_feel'] = form_data['user_feel']

    if register:
        session['user_name'] = form_data['name']
        session['last_login'] = form_data['last_login']
        session['user_country_code'] = form_data['country_code']
        session['user_feelist'] = form_data['feelist']


def sticky_form(form_data):
    session['form_country_code'] = form_data['country_code']
    session['form_country'] = form_data['country']
    session['form_county'] = form_data['county']
    session['form_email'] = form_data['email']
    session['form_name'] = form_data['name']
    session['form_location'] = form_data['country'] + '-' + form_data['county']


"""log user out"""


@app.route('/logout')
def logout():
    """recording users last feel before logout"""
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'last_feel': session.get('user_feel')}}

    )
    session.clear()
    return redirect(url_for('index'))


@app.route('/user')
def user():
    initials = ''
    user_initials = session.get('user_name').split(' ')
    authorized_user = mongo.db.users.find_one({'email': session.get('user_email')})
    today = datetime.datetime.now().strftime("%F")
    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    session['user_feelist'] = authorized_user['feelist']

    return render_template('user.html', user=authorized_user, today=today)


"""user likes action or adds action to his feelist"""


@app.route('/_actions')
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


@app.route('/_search')
def search():
    q =  sanitize(request.args.get('q', 0, type=str).lower()) #array

    results = []

    feelists = mongo.db.feels.find(

        {"$or": [
            {"i_feel": {"$in": q}}, # q is array
            {"because": {"$in": q}}# q is array
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


if __name__ == '__main__':
    app.run(
        port=os.environ.get('PORT'),
        host=os.environ.get('IP'),
        debug=True)
