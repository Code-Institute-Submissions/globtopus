from flask import Blueprint

assets_dist_bp = Blueprint('assets_dist_bp', __name__,
                      template_folder='templates',
                      static_folder='static',
                      static_url_path='assets/dist')