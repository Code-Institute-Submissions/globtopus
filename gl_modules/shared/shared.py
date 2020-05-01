from flask import Blueprint

shared_bp = Blueprint('shared_bp', __name__,
                      template_folder='templates',
                      static_folder='static',
                      static_url_path='shared')
