import random

from flask import Blueprint, render_template, redirect, url_for, request, flash, session

import datetime
from werkzeug.security import check_password_hash, generate_password_hash

from gl_modules.shared.sanitize import sanitize
from gl_modules.shared.today import today_f
from gl_modules.shared.update_feel import update_country_feel, update_world_feel, update_county_feel
from gl_modules.user.user_b import feelists

authorize_bp = Blueprint('authorize_bp', __name__,
                         template_folder='templates',
                         static_folder='static',
                         static_url_path='assets/authorize')

""""show register form"""


@authorize_bp.route('/sign_up')
def sign_up():
    return render_template('authorize/sign_up.html')


""""show login form"""


@authorize_bp.route('/sign_in')
def sign_in():
    return render_template('authorize/sign_in.html')


"""log user into application"""


@authorize_bp.route('/login', methods=['POST'])
def login():
    from bson.json_util import dumps
    user = request.form.to_dict()
    from app import mongo
    user_to_check = mongo.db.users.find_one({"email": user['email']})
    if not user_to_check:
        session['form_email'] = user['email']
        flash('We have no user with those credentials','flash_error')

        return redirect(url_for('authorize_bp.sign_in'))

    # if db_feelists != []:
    #     for feelist in db_feelists:
    #
    #         user_feelists[feelist['name']] = feelist['post_ids']

    # return dumps(user_feelists)
    if user['user_feel'] == '':
        """remembering user email and displaying it 
        in the form or redirect, so that user doesn't have to type 
        it again"""
        session['form_email'] = user['email']

        flash('Please select how you feel!','flash_error')

        return redirect(url_for('authorize_bp.sign_in'))

    user_password = user_to_check['password']
    user_email = user_to_check['email']

    """if we have user with those credentials we will log user """
    if check_password_hash(user_password, user['password']) and user_email == user['email']:




        db_feelists = user_to_check['my_feelists'] if 'my_feelists' in user_to_check else []
        user['last_login'] = datetime.datetime.now()
        user_name = user_to_check['name']

        last_login = user_to_check['last_login']
        country_code = user_to_check['cc']
        cl = user_to_check['cl']

        feeling = int(user['user_feel']) - int(user_to_check['last_feel'])

        my_glob = user_to_check['my_globs'] if 'my_globs' in user_to_check else []
        my_likes = user_to_check['likes'] if 'likes' in user_to_check else []
        user_id = str(user_to_check['_id'])

        user_feelists = feelists(db_feelists)
        mongo.db.users.update(
            {"email": user_email},
            {"$set": {
                'last_login': datetime.datetime.now(),
                'last_feel': user['user_feel'],
                'user_feel.' + today_f(): user['user_feel']}},
            upsert=True
        )

        session.clear()

        session['user_name'] = user_name
        session['last_login'] = last_login
        session['user_country_code'] = country_code
        session['user_cl'] = cl
        session['my_feelists'] = user_feelists
        session['user_id'] = user_id
        session['my_globs'] = my_glob
        session['my_likes'] = my_likes
        session['last_feel'] = user['user_feel']

        session_user(user)

        """IF CURRENTLY LOGGED IN USER ALREADY SET HIS FEELING FOR THE DAY WE WILL NOT INCREASE 
        NUMBER OF PEOPLE IN world_feel and country_feel COLECTIONS , 
        WE WILL ONLY RECALCULATE FEELINGS 
        
        OTHERWISE IF IT IS FIRST LOGIN IN NEW DAY WE WILL INCREASE NUM OF PEOPLE 
        WHO EXPRESSED THEIR FEELINGS IN THAT DAY AND WILL ADD THEIR FEELINGS TO THE MIX"""

        if (mongo.db.todays_users.find_one({
            "day": datetime.datetime.now().strftime("%F"),
            "users": {"$in": [user_id]},

        })):

            increase_people = 0
        else:
            mongo.db.todays_users.update(
                {"day": datetime.datetime.now().strftime("%F")},
                {"$push": {'users': user_id}},
                upsert=True
            )

            increase_people = 1

        """updating country feel"""
        update_county_feel(mongo, country_code, cl, increase_people, feeling)

        """updating country feel"""
        update_country_feel(mongo, country_code, increase_people, feeling)
        """updating world feel"""
        update_world_feel(mongo, increase_people, feeling)

        session['user_feel'] = user['user_feel']
        """
           REDIRECT ADMIN TO ADMIN DASHBOARD 
        """
        if user['email'] == 'marcel@globi.com' and check_password_hash(user_password, user['password']):
            session['authorized_admin'] = True
            return redirect(url_for('admin_bp.admin'))

        return redirect(url_for('user_bp.user'))
    else:
        session['form_email'] = user['email']
        flash('Please provide valid email and password','flash_error')
        return redirect(url_for('authorize_bp.sign_in'))


"""register new user"""
á

@authorize_bp.route('/register', methods=['POST'])
def register():
    new_user = request.form.to_dict()

    user_email = new_user['email']
    """IF USER DIDN'T SELECT HOW HE FEELS WE WILL FLASH MESSAGE
    TO SELECT HIS FEELINGS WITH FORM DATA RETURNED BACK TO HIM
    SO THAT HE DOESN'T NEED TO TYPE IT AGAIN"""
    # if form_data['user_feel'] == '':
    #     sticky_form(form_data)
    #
    #     flash('Please select how you feel!')
    #     return redirect(url_for('authorize_bp.sign_up'))

    if new_user['cc'] == '':
        sticky_form(new_user)

        flash('Please select location on the map!','flash_error')

        return redirect(url_for('authorize_bp.sign_up'))
    """if we have user with this email, we will not register user"""
    from app import mongo
    if list(mongo.db.users.find({"name": new_user['name']})):

        flash(new_user['name'] + ' :  is already taken, please select different user name','flash_error')

        sticky_form(new_user)

        return redirect(url_for('authorize_bp.sign_up'))
    elif list(mongo.db.users.find({"email": user_email})):

        flash( user_email + ' :  is already registered, please select different email','flash_error')

        sticky_form(new_user)

        return redirect(url_for('authorize_bp.sign_up'))

    else:

        """we will register user and set his id into session 
        redirect to user dashboard and change nav to logout instead of login | sign up"""
        session.clear()

        # new user
        user_name_split = new_user['name'].split(' ')
        user_name = ''
        counter = 0
        for name in user_name_split:
            sanitize(name, 'string')
            user_name += sanitize(name, 'string') if counter == 0 else ' ' + sanitize(name, 'string')
            counter += 1

        new_user['name'] = user_name
        new_user['password'] = generate_password_hash(new_user['password'])
        new_user['created_at'] = datetime.datetime.now()
        new_user['last_login'] = datetime.datetime.now()
        new_user['last_feel'] = 0
        new_user['image_id'] = random.randint(0, 38)
        new_user['likes'] = []
        new_user['flags'] = []
        new_user['user_feel'] = {datetime.datetime.now().strftime("%F"): 0}
        new_user['cl'] = new_user['cl'].replace(' | ', '__').replace(' ', '_')
        del new_user['country']
        mongo.db.users.insert_one(new_user)

        # mongo.db.users.insert_one(new_user)
        flash('Thank you for signing up ' + new_user['name'] + '. You can log in now !','flash_success')
        return redirect(url_for('authorize_bp.sign_in'))


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
        session['user_country_code'] = form_data['cc']
        session['user_feel'] = form_data['user_feel']


def sticky_form(form_data):
    session['form_country_code'] = form_data['cc']
    session['form_country'] = form_data['country']
    session['form_county'] = form_data['cl']
    session['form_email'] = form_data['email']
    session['form_name'] = form_data['name']
