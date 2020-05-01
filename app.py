import os

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)

import gl_modules.authorize.authorize_b as authorize
import gl_modules.landing.landing_b as landing
import gl_modules.user.user_b as user
import gl_modules.shared.shared_b as shared

app.register_blueprint(landing.landing_bp, url_prefix='/')
app.register_blueprint(user.user_bp, url_prefix='/')
app.register_blueprint(shared.shared_bp, url_prefix='/')
app.register_blueprint(authorize.authorize_bp, url_prefix='/')
