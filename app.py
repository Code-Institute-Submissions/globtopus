import os

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)

import gl_modules.authorize.authorize_b as authorize_m
import gl_modules.landing.landing_b as landing_m
import gl_modules.user.user_b as user_m
import gl_modules.shared.shared_b as shared_m

app.register_blueprint(landing_m.landing_bp, url_prefix='/')
app.register_blueprint(user_m.user_bp, url_prefix='/')
app.register_blueprint(shared_m.shared_bp, url_prefix='/')
app.register_blueprint(authorize_m.authorize_bp, url_prefix='/')
