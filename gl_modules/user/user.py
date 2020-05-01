import datetime

from flask import Blueprint, render_template, session

from app import mongo

user_bp = Blueprint('user_bp', __name__,
                    template_folder='templates',
                    static_folder='static', static_url_path='assets/user')


@user_bp.route('/user')
def user():
    initials = ''
    user_initials = session.get('user_name').split(' ')
    authorized_user = mongo.db.users.find_one({'email': session.get('user_email')})
    today = datetime.datetime.now().strftime("%F")
    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    session['user_feelist'] = authorized_user['feelist']

    return render_template('user/user.html', user=authorized_user, today=today)
