from flask import Blueprint

errors_bp = Blueprint('errors_bp', __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='assets/errors')

