import os

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)


from blueprint.landing.landing import landing_bp
from blueprint.user.user import user_bp
from blueprint.shared.shared import shared_bp
from blueprint.auth.auth import auth_bp






app.register_blueprint(landing_bp, url_prefix='/')
app.register_blueprint(user_bp, url_prefix='/')
app.register_blueprint(shared_bp, url_prefix='/')
app.register_blueprint(auth_bp, url_prefix='/')