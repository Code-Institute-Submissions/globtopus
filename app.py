import os

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)

import blueprint.auth.auth
import blueprint.landing.landing
import blueprint.user.user
import blueprint.shared.shared







app.register_blueprint(blueprint.landing.landing.landing_bp, url_prefix='/')
app.register_blueprint(blueprint.user.user.user_bp, url_prefix='/')
app.register_blueprint(blueprint.shared.shared.shared_bp, url_prefix='/')
app.register_blueprint(blueprint.auth.auth.auth_bp, url_prefix='/')
