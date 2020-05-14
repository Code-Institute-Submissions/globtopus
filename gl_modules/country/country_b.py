from flask import Blueprint, render_template

country_bp = Blueprint('country_bp', __name__,
                     template_folder='templates',
                     static_folder='static',
                     static_url_path='assets/country')

@country_bp.route('country')
def country():
    return render_template('country/country.html')