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
import gl_modules.assets_dist.assets_dist_b as assets_dist_m
import gl_modules.posts.posts_b as posts_m
import gl_modules.charts.charts_b as charts_m
import gl_modules.factory.factory_b as factory_m
import gl_modules.map.map_b as map_m
import gl_modules.country.country_b as country_m
import gl_modules.admin.admin_b as admin_m
import gl_modules.errors.errors_b as errors_m
import gl_modules.tests.tests_b as tests_m

app.register_blueprint(landing_m.landing_bp, url_prefix='/')
app.register_blueprint(user_m.user_bp, url_prefix='/')
app.register_blueprint(shared_m.shared_bp, url_prefix='/')
app.register_blueprint(authorize_m.authorize_bp, url_prefix='/')
app.register_blueprint(assets_dist_m.assets_dist_bp, url_prefix='/')
app.register_blueprint(posts_m.posts_bp, url_prefix='/')
app.register_blueprint(charts_m.charts_bp, url_prefix='/')
app.register_blueprint(factory_m.factory_bp, url_prefix='/')
app.register_blueprint(map_m.map_bp, url_prefix='/')
app.register_blueprint(admin_m.admin_bp, url_prefix='/')
app.register_blueprint(errors_m.errors_bp, url_prefix='/')
app.register_blueprint(tests_m.tests_bp, url_prefix='/')
app.register_blueprint(country_m.country_bp, url_prefix='/')





if __name__ == '__main__':
    app.run(
        port=os.environ.get('PORT'),
        host=os.environ.get('IP'),

        debug=True)
