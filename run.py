import os

from flask import Flask, render_template, redirect, url_for, request, flash, session, json
from flask_pymongo import PyMongo
import datetime
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)


@app.route('/')
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

    world_feel = 0 if sum(sum_of_feelings) == 0  else sum(sum_of_feelings) / sum(num_of_people)

    return render_template('index.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)


def new_person(increase):
    return 0 if not increase else 1


def new_feeling(user_feel,increase):
    return (- int(session.get('user_feel')) + user_feel) if not increase else user_feel


def update_world_feel( people, feeling):
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


@app.route('/add_your_feel', methods=['POST'])
def add_your_feel():
    """INSERTING INTO FEELS TABLE"""
    form_data = request.form.to_dict()
    mongo.db.feels.insert_one(request.form.to_dict())
    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
       TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
       WITHOUT ADDING EXTRA PERSON TO THE MIX 
       - LAST FEELING + CURRENT FEELING"""

    update_world_feel(0, int(form_data['user_feel']) - int(session.get('user_feel')) )
    """updating user feel during the day, when he feels differently"""
    today = today_f()
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'user_feel.' + today: form_data['user_feel']}})

    """updating country feel"""
    update_country_feel(session.get("user_country_code"), 0, int(form_data['user_feel']) - int(session.get('user_feel')) )
    session['user_feel'] = form_data["user_feel"]



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

    form_data['last_login'] = datetime.datetime.now()

    user_to_check = mongo.db.users.find({"email": form_data['email']})

    user_password = ''
    user_name = ''
    user_email = ''

    for item in user_to_check:
        user_password = item['password']
        user_name = item['name']
        user_email = item['email']
        last_login = item['last_login']
        country_code = item['country_code']
        user_feel = item['user_feel']

    if form_data['user_feel'] == '':
        session['form_email'] = form_data['email']

        flash('Please select how you feel!')

        return redirect(url_for('sign_in'))

    """if we have user with those credentials we will log user """
    if check_password_hash(user_password, form_data['password']) and user_email == form_data['email']:

        mongo.db.users.update(
            {"email": user_email},
            {"$set": {'last_login': datetime.datetime.now(),'user_feel.'+today_f() : form_data['user_feel']}})

        session.clear()

        session['user_name'] = user_name
        session['last_login'] = last_login
        session['user_country_code'] = country_code

        session_user(form_data)
        """updating country feel"""
        update_country_feel(country_code, 0, int(form_data['user_feel'] ) - int(user_feel[today_f()]))
        """updating world feel"""
        update_world_feel(0, int(form_data['user_feel'] ) - int(user_feel[today_f()]))

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
        update_country_feel(form_data["country_code"], 1,int(form_data['user_feel']) )

        """we will register user and set his id into session 
        redirect to user dashboard and change nav to logout instead of login | sign up"""
        session.clear()

        form_data['created_at'] = datetime.datetime.now()
        form_data['last_login'] = datetime.datetime.now()
        form_data['password'] = generate_password_hash('password')

        session_user(form_data)

        form_data['user_feel'] = {datetime.datetime.now().strftime("%F"): form_data['user_feel']}

        mongo.db.users.insert_one(form_data)

        session['user_name'] = form_data['name']
        session['last_login'] = form_data['last_login']
        session['user_country_code'] = form_data['country_code']

        return redirect(url_for('user'))


def session_user(form_data):
    session['authorized_user'] = True
    session['user_email'] = form_data['email']
    session['user_feel'] = form_data['user_feel']


def sticky_form(form_data):
    session['form_country_code'] = form_data['country_code']
    session['form_country'] = form_data['country']
    session['form_county'] = form_data['county']
    session['user_email'] = form_data['email']
    session['form_name'] = form_data['name']
    session['form_location'] = form_data['country'] + '-' + form_data['county']


"""log user out"""


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/user')
def user():
    initials = ''
    user_initials = session.get('user_name').split(' ')

    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    return render_template('user.html')


if __name__ == '__main__':
    app.run(
        port=os.environ.get('PORT'),
        host=os.environ.get('IP'),
        debug=True)
