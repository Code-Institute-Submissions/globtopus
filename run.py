import os

from flask import Flask, render_template, redirect, jsonify, url_for, request

from flask_pymongo import PyMongo
import datetime





app = Flask(__name__)
app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

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
    world_feel = sum(sum_of_feelings) / sum(num_of_people)

    return render_template('index.html', feels=feels, world_feel=round(world_feel), wf_full=world_feel)

def update_world_feel(form):
    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
      TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
      WITHOUT ADDING EXTRA PERSON TO THE MIX
      - LAST FEELING + CURRENT FEELING"""

    mongo.db.world_feel.update(
        {"day": datetime.datetime.now().strftime("%F")},
        {"$inc":
             {"num_of_people": 1,
              "sum_of_feelings": int(form["user_feel"])}}
        ,
        upsert=True
    )

@app.route('/add_your_feel', methods=['POST'])
def add_your_feel():
    """INSERTING INTO FEELS TABLE"""
    mongo.db.feels.insert_one(request.form.to_dict())

    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
    TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
    WITHOUT ADDING EXTRA PERSON TO THE MIX 
    - LAST FEELING + CURRENT FEELING"""

    update_world_feel(request.form)

    return redirect(url_for('index'))


@app.route('/user')
def user():
    return render_template("user.html")


@app.route('/admin')
def admin():
    return render_template('admin.html')


@app.route('/sign_in')
def sign_in():
    """this is how to upsert to world_feel collection
        doing upsert instead of insert + update
        to make sure that we will catch new day
     """
    # mongo.db.world_feel.update(
    #     {"day": datetime.datetime.now().strftime("%F")},
    #     {"$inc":
    #          {"num_of_people": 1,
    #           "sum_of_feelings": 8}}
    #     ,
    #     upsert=True
    # )

    return render_template('sign_in.html',
                           )


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

@app.route('/register', methods=['POST'])
def register():
    """UPDATING WORLD FEEL WITH NEW USER FEELINGS"""
    update_world_feel(request.form)
    """INSERTING INTO FEELS TABLE"""

    mongo.db.users.insert_one(request.form.to_dict())

    return render_template('sign_up.html')

"""it should work"""
if __name__ == '__main__':
    app.run(
        port=os.environ.get('PORT'),
        host=os.environ.get('IP'),
        debug=True)
