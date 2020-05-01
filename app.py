import os

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.getenv('MONGO_DBNAME')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)

import gl_modules.auth.auth
import gl_modules.landing.landing
import gl_modules.user.user
import gl_modules.shared.shared







app.register_blueprint(gl_modules.landing.landing.landing_bp, url_prefix='/')
app.register_blueprint(gl_modules.user.user.user_bp, url_prefix='/')
app.register_blueprint(gl_modules.shared.shared.shared_bp, url_prefix='/')
app.register_blueprint(gl_modules.auth.auth.auth_bp, url_prefix='/')
