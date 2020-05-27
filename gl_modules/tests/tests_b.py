import datetime
import random

from bson import ObjectId
from flask import Blueprint, render_template, jsonify, request, flash
from werkzeug.security import generate_password_hash

from gl_modules.shared.sanitize import sanitize

tests_bp = Blueprint('tests_bp', __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='assets/tests')


@tests_bp.route('/testing')
def testing():
    return render_template('tests/tests.html')


@tests_bp.route('/run_tests')
def run_tests():
    from app import mongo
    mongo.db.users.delete_many(
        {'cl': "Chorcaí__Cork"}


    )
    action_1 = request.args.get('action_1', 0, type=str)
    action_2 = request.args.get('action_2', 0, type=str)
    because_1 = request.args.get('because_1', 0, type=str)
    because_2 = request.args.get('because_2', 0, type=str)
    i_feel_1 = request.args.get('i_feel_1', 0, type=str)
    i_feel_2 = request.args.get('i_feel_2', 0, type=str)
    password_1 = request.args.get('password_1', 0, type=str)
    password_2 = request.args.get('password_2', 0, type=str)
    useremail_1 = request.args.get('useremail_1', 0, type=str)
    useremail_2 = request.args.get('useremail_2', 0, type=str)
    username_1 = request.args.get('username_1', 0, type=str)
    username_2 = request.args.get('username_2', 0, type=str)



    if list(mongo.db.users.find({"name": username_1})):
        return jsonify(error=True,results=username_1 + ' :  is already taken, please select different user name')

    elif list(mongo.db.users.find({"email": useremail_1})):
        return jsonify(error=True,results=useremail_1 + ' :  is already taken, please select different email')
    elif list(mongo.db.users.find({"email": useremail_2})):
        return jsonify(error=True,results=useremail_2 + ' :  is already taken, please select different user name')
    elif list(mongo.db.users.find({"name": username_2})):
        return jsonify(error=True,results=username_2 + ' :  is already taken, please select different email')

    user_1 = {}
    user_2 = {}
    user_name_split1 = username_1.split(' ')
    user_name1 = ''
    user_name_split2 = username_2.split(' ')
    user_name2 = ''
    counter = 0
    results = {}

    for name in user_name_split1:
        sanitize(name, 'string')
        user_name1 += sanitize(name, 'string') if counter == 0 else ' ' + sanitize(name, 'string')
        counter += 1

    user_1['name'] = user_name1
    user_1['email'] = useremail_1
    user_1['password'] = generate_password_hash(password_1)
    user_1['created_at'] = datetime.datetime.now()
    user_1['last_login'] = datetime.datetime.now()
    user_1['last_feel'] = 0
    user_1['image_id'] = random.randint(0, 38)
    user_1['likes'] = []
    user_1['flags'] = []
    user_1['user_feel'] = {datetime.datetime.now().strftime("%F"): 0}
    user_1['cl'] = 'Chorcaí__Cork'
    user_1['cc'] = 'ie'

    """
          INSERT USER #1 
    """
    try:
        mongo.db.users.insert_one(user_1)
        results['user_1_created'] = "pass"
    except:
        results['user_1_created'] = "no pass"

    for name in user_name_split2:
        sanitize(name, 'string')
        user_name2 += sanitize(name, 'string') if counter == 0 else ' ' + sanitize(name, 'string')
        counter += 1

    user_2['name'] = user_name2
    user_2['email'] = useremail_2
    user_2['password'] = generate_password_hash(password_2)
    user_2['created_at'] = datetime.datetime.now()
    user_2['last_login'] = datetime.datetime.now()
    user_2['last_feel'] = 0
    user_2['image_id'] = random.randint(0, 38)
    user_2['likes'] = []
    user_2['flags'] = []
    user_2['user_feel'] = {datetime.datetime.now().strftime("%F"): 0}
    user_2['cl'] = 'Chorcaí__Cork'
    user_2['cc'] = 'ie'

    """
         INSERT USER #2 
    """
    try:
        mongo.db.users.insert_one(user_2)
        results['user_2_created'] = "pass"
    except:
        results['user_2_created'] = "no pass"

    """
       INSERT POST FOR FIRST USER 
    """
    try:
        mongo.db.users.update(
            {"email": useremail_1},
            {
                "$push": {
                    "posts":
                        {"i_feel": sanitize(i_feel_1, 'array'),
                         "because": sanitize(because_1, 'array'),
                         "feel": random.randint(60, 99),
                         "action": action_1,
                         "post_id": str(ObjectId()),
                         "created_at": datetime.datetime.now(),
                         }

                }
            }, True
        )
        results['user_1_post_created'] = "pass"
    except:
        results['user_1_post_created'] = "no pass"

    """
       INSERT POST FOR SECOND USER 
    """
    try:
        mongo.db.users.update(
            {"email": useremail_2},
            {
                "$push": {
                    "posts":
                        {"i_feel": sanitize(i_feel_2, 'array'),
                         "because": sanitize(because_2, 'array'),
                         "feel": random.randint(60, 99),
                         "action": action_2,
                         "post_id": str(ObjectId()),
                         "created_at": datetime.datetime.now(),
                         }

                }
            }, True
        )
        results['user_2_post_created'] = "pass"
    except:
        results['user_2_post_created'] = "no pass"

    """
       ADD SECOND USER TO FIRST USER'S GLOBE      
    """
    second_user= mongo.db.users.find_one({"email": useremail_2})
    second_user_id = str(second_user['_id'])
    second_user_post_id = str(second_user['posts'][0]['post_id'])
    try:
        mongo.db.users.update(
            {"email": useremail_1},
            {
                "$addToSet": {
                    "my_globs": second_user_id

                }
            }, upsert=True
        )
        results['user_2_added_to_globe'] = "pass"
    except:
        results['user_2_added_to_globe'] = "no pass"

    """
       ADD SECOND USER'S POST TO FIRST USER'S FEELIST 
    """
    try:

        mongo.db.users.update(
            {"email": useremail_1},
            {
                "$push": {
                    "my_feelists":
                        {"name": "first_feelist", "post_ids": [second_user_post_id]}

                }
            }, upsert=True
        )
        results['user_2_added_to_feelist'] = "pass"
    except:
        results['user_2_added_to_feelist'] = "no pass"

    """
       FIRST USER LIKES SECOND USERS POST 
    """

    """
               UPDATE LIKES OR FLAGS FOR POST
    """
    try:
        mongo.db.users.update(
            {"posts.post_id": second_user_post_id},
            {"$inc":
                 {"posts.$." + 'likes': 1,
                  }}
            ,
            upsert=True
        )
        """
            UPDATE USERS LIKES OR FLAGS
        """

        mongo.db.users.update(
            {"email":useremail_1},
            {"$addToSet":
                 {'likes': second_user_post_id,
                  }}
            ,
            upsert=True
        )
        results['user_2_post_in_favorites'] = "pass"
    except:
        results['user_2_post_in_favorites'] = "no pass"


    return jsonify(results=results)
