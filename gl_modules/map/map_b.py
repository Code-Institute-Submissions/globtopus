from flask import Blueprint

map_bp = Blueprint('map_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/map')