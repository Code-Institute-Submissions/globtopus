import datetime

from flask import Blueprint, render_template, session, jsonify

user_bp = Blueprint('user_bp', __name__,
                    template_folder='templates',
                    static_folder='static', static_url_path='assets/user')


@user_bp.route('/user')
def user():
    from app import mongo
    initials = ''
    user_initials = session.get('user_name').split(' ')
    authorized_user = mongo.db.users.find_one({'email': session.get('user_email')})
    today = datetime.datetime.now().strftime("%F")
    days =''
    feelings = ''
    for single in user_initials:
        initials += single[0]

    session['initials'] = initials
    session['user_feelist'] = authorized_user['feelist']

    for day in authorized_user['user_feel']:

        days += day+'_'
        feelings += authorized_user['user_feel'][day]+'_'

    return render_template('user/user.html', user=authorized_user, today=today,days=days,feelings=feelings)

@user_bp.route('_my_feelist', methods=['POST'])
def my_feelist():
    from app import mongo

    authorized_user = mongo.db.users.find_one({'email': session.get('user_email')})
    list=[]
    for list_name in authorized_user['feelist']:

        list.append(list_name)

    return  jsonify(list=list)


