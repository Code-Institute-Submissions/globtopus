from flask import Blueprint, render_template, redirect, url_for, request, flash, session

import datetime
from werkzeug.security import check_password_hash, generate_password_hash

from gl_modules.shared.sanitize import sanitize
from gl_modules.shared.today import today_f
from gl_modules.shared.update_feel import update_country_feel, update_world_feel

authorize_bp = Blueprint('authorize_bp', __name__,
                         template_folder='templates',
                         static_folder='static',
                         static_url_path='assets/authorize')

""""show register form"""


@authorize_bp.route('/sign_up')
def sign_up():
    # from app import mongo
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

    return render_template('authorize/sign_up.html')


""""show login form"""


@authorize_bp.route('/sign_in')
def sign_in():
    return render_template('authorize/sign_in.html')


"""log user into application"""


@authorize_bp.route('/login', methods=['POST'])
def login():
    form_data = request.form.to_dict()
    from app import mongo
    user_to_check = mongo.db.users.find({"email": form_data['email']})

    if form_data['user_feel'] == '':
        """remembering user email and displaying it 
        in the form or redirect, so that user doesn't have to type 
        it again"""
        session['form_email'] = form_data['email']

        flash('Please select how you feel!')

        return redirect(url_for('authorize_bp.sign_in'))

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
        update_country_feel(mongo, country_code, 0, int(form_data['user_feel']) - int(last_feel))
        """updating world feel"""
        update_world_feel(mongo, 0, int(form_data['user_feel']) - int(last_feel))

        session['user_feel'] = form_data['user_feel']

        return redirect(url_for('user_bp.user'))
    else:
        session['form_email'] = form_data['email']
        flash('Please provide valid email and password')
        return redirect(url_for('authorize_bp.sign_in'))


"""register new user"""


@authorize_bp.route('/register', methods=['POST'])
def register():
    form_data = request.form.to_dict()

    user_email = form_data['email']
    """IF USER DIDN'T SELECT HOW HE FEELS WE WILL FLASH MESSAGE
    TO SELECT HIS FEELINGS WITH FORM DATA RETURNED BACK TO HIM
    SO THAT HE DOESN'T NEED TO TYPE IT AGAIN"""
    if form_data['user_feel'] == '':
        sticky_form(form_data)

        flash('Please select how you feel!')
        return redirect(url_for('authorize_bp.sign_up'))

    if form_data['country_code'] == '':
        sticky_form(form_data)

        flash('Please select location on the map!')

        return redirect(url_for('authorize_bp.sign_up'))
    """if we have user with this email, we will not register user"""
    from app import mongo
    if list(mongo.db.users.find({"email": user_email})):

        flash(user_email + ' :  is already registered')

        sticky_form(form_data)

        return redirect(url_for('authorize_bp.sign_up'))


    else:
        """UPDATING WORLD FEEL WITH NEW USER FEELINGS"""
        update_world_feel(mongo, 1, int(form_data['user_feel']))
        """INSERTING INTO FEELS TABLE"""

        """creating new user in country feel"""
        update_country_feel(mongo, form_data["country_code"], 1, int(form_data['user_feel']))

        """we will register user and set his id into session 
        redirect to user dashboard and change nav to logout instead of login | sign up"""
        session.clear()

        form_data['created_at'] = datetime.datetime.now()
        form_data['last_login'] = datetime.datetime.now()
        form_data['password'] = generate_password_hash('password')
        form_data['feelist'] = {}
        form_data['name'] = sanitize(form_data['name'], 'string')


        session_user(form_data, True)

        form_data['user_feel'] = {datetime.datetime.now().strftime("%F"): form_data['user_feel']}
        form_data['last_feel'] = form_data['user_feel']

        mongo.db.users.insert_one(form_data)

        return redirect(url_for('user_bp.user'))


@authorize_bp.route('/logout')
def logout():
    """recording users last feel before logout"""
    from app import mongo
    mongo.db.users.update(
        {"email": session.get('user_email')},
        {"$set": {'last_feel': session.get('user_feel')}}

    )
    session.clear()
    return redirect(url_for('landing_bp.index'))


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
