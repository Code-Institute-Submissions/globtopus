import os
from flask import Flask, render_template, redirect, request, url_for, request
import pymongo

MONGODB_URI = os.getenv('MONGO_URI')

DBS_NAME = "globtopus_db"
COLLECTION_NAME = "users"
"""testing"""
app = Flask(__name__)


def mongo_connect(url):
    try:
        conn = pymongo.MongoClient(url)
        print('connected', url)
        return conn
    except pymongo.errors.ConnectionFailure as e:
        print('not connected %s') % e



@app.route('/')
def index():
    # conn = mongo_connect(MONGODB_URI)
    # coll = conn[DBS_NAME][COLLECTION_NAME]
    # documents = coll.find()
    return render_template('index.html',
                           MONGODB_URI=MONGODB_URI)




@app.route('/user')
def user():
    return render_template("user.html",
                           )


@app.route('/admin')
def admin():
    return render_template('admin.html',
                           )


@app.route('/sign_in')
def sign_in():
    return render_template('sign_in.html',
                           )


@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html',
                           )


"""it should work"""
if __name__ == '__main__':
    app.run(
        port=os.environ.get('PORT'),
        host=os.environ.get('IP'),
        debug=True)
