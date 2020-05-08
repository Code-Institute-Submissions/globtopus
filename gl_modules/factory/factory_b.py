import random

from flask import Blueprint, jsonify, session
import datetime

factory_bp = Blueprint('factory_bp', __name__,
                       template_folder='templates',
                       static_folder='static',
                       static_url_path='assets/globs')


@factory_bp.route('/create_world_data')
def world_data():
    from app import mongo

    world_people = 0
    world_feelings = 0
    world_data = {}

    for key, value in countryListAlpha2.items():

        for i in range(1, 365):
            num_of_people = random.randint(1, 10001)
            feelings = random.randint(1, 100)
            day = str((datetime.datetime.now() - datetime.timedelta(days=365 - i)).strftime("%F"))

            world_people += num_of_people
            world_feelings += num_of_people * feelings

            world_data[day] = {day: {'num_of_people': world_people
                , 'sum_of_feelings': world_feelings, 'day': day}}

        world_people = 0
        world_feelings = 0

    for item in world_data:
        mongo.db.world_feel.insert(world_data[item][item])

    return 'world_data'
# get countries where feeling is between range
@factory_bp.route('/20_country')
def twenty_country():
    from app import mongo



    country_feel = mongo.db.country_feel.find(
        {"$and" : [ {"$expr": { "$lt": [ {"$divide": ["$total_feelings", "$total_people"]},60]}},
                    {"$expr": { "$gt": [ {"$divide": ["$total_feelings", "$total_people"]},40]}} ]},





        { '_id': 0})
    data = {}
    for feel in country_feel:
        data[ get_country_name(feel["country_code"] ) ]= round(feel['total_feelings']/feel['total_people'],2)

    return jsonify(data)
@factory_bp.route('/create_countries_data')
def countries_data():
    from app import mongo
    feels = {}
    world = {}
    current_people = 0
    current_feelings = 0
    total_people = 0
    total_feelings = 0
    counter = 0

    world_people = 0
    world_feelings = 0
    world_data = {}

    for key, value in countryListAlpha2.items():

        country_code = key.lower()
        for i in range(1, 366):
            num_of_people = random.randint(1, 10001)
            if (counter < 30):

                feelings = random.randint(1, 20)
            elif (counter < 70):
                feelings = random.randint(20, 40)
            elif (counter < 130):
                feelings = random.randint(40, 60)
            elif (counter < 200):
                feelings = random.randint(60, 80)
            elif (counter < 247):
                feelings = random.randint(80, 100)

            day = str((datetime.datetime.now() - datetime.timedelta(days=366 - i)).strftime("%F"))

            feels[day] = {'num_of_people': num_of_people,
                          'sum_of_feelings': num_of_people * feelings}
            total_people += num_of_people
            total_feelings += num_of_people * feelings

            world_people += num_of_people
            world_feelings += num_of_people * feelings

            world_data[day] = {day: {'num_of_people': world_people
                , 'sum_of_feelings': world_feelings, 'day': day}}

            if (i > 357):
                current_people += num_of_people
                current_feelings += num_of_people * feelings

        world[counter] = {"country_code": country_code, 'feels': feels, 'total_people': total_people,
                          'total_feelings': total_feelings}

        mongo.db.country_feel.insert({"country_code": country_code, 'feels': feels, 'total_people': total_people,
                                      'total_feelings': total_feelings})
        counter += 1
        total_people = 0
        total_feelings = 0
        current_people = 0
        current_feelings = 0

    for item in world_data:
        mongo.db.world_feel.insert(world_data[item][item])

    return jsonify(world)


@factory_bp.route('/check_user')
def check_user():
    from app import mongo
    if (mongo.db.todays_users.find_one({
        "day": datetime.datetime.now().strftime("%F"),
        "users": {"$in": ['5eb3e568qf95642e8068f7']},

    })):

        user = 0
    else:
        user = 1
    return jsonify(user)


@factory_bp.route('/get_countries')
def get_countries():
    from app import mongo
    c_feels = []

    country_feel = mongo.db.country_feel.aggregate(
        [
            {"$project": {"country_code": 1, "current": {"$divide": ["$current_feelings", "$current_people"]}}},
            {"$sort": {"current": -1}},
            {"$limit": 10}
        ]
    )
    for feel in country_feel:
        c_feels.append({'cc': feel['country_code'], "current": feel['current']})

    return jsonify(c_feels)


# @factory_bp.route('/insert_country_dict')
# def insert_country_dict():
#     c_dict = []
#     from app import mongo
#     for code, name in countryListAlpha2.items():
#
#         mongo.db.countries.insert({'cc' : code.lower(), 'name': name})
#     return  'insert_country_dict done'

@factory_bp.route('/get_country_progress')
def country_progress():
    from app import mongo
    results = []

    feels = mongo.db.country_feel.find_one(
        {'country_code': 'af'},

        {'feels': 1, '_id': 0})

    for feel in feels['feels']:
        if feel <= datetime.datetime.now().strftime("%F") and feel >= (
                (datetime.datetime.now() - datetime.timedelta(days=10)).strftime("%F")):
            results.append(
                {'day': feel, 'feel': feels['feels'][feel]['sum_of_feelings'] / feels['feels'][feel]['num_of_people']})

    return jsonify(results)


@factory_bp.route('/get_country_name')
def get_country_name(c_code):
    """GOING TO DB ONLY ONCE PER SESSION AS THIS DATA IS NEVER CHANGING... TO DO : CHECK CACHE"""
    if not session.get('countries'):
        countries = {}
        from app import mongo

        all_countries = mongo.db.countries.find()
        for country in all_countries:
            countries[country['cc']] = country['name']

        session['countries'] = countries
    else:
        countries = session.get('countries')

    return countries[c_code]


countryListAlpha2 = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas (the)",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia (Plurinational State of)",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory (the)",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "KY": "Cayman Islands (the)",
    "CF": "Central African Republic (the)",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands (the)",
    "CO": "Colombia",
    "KM": "Comoros (the)",
    "CD": "Congo (the Democratic Republic of the)",
    "CG": "Congo (the)",
    "CK": "Cook Islands (the)",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "CI": "Côte d'Ivoire",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic (the)",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (the) [Malvinas]",
    "FO": "Faroe Islands (the)",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories (the)",
    "GA": "Gabon",
    "GM": "Gambia (the)",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See (the)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran (Islamic Republic of)",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea (the Democratic People's Republic of)",
    "KR": "Korea (the Republic of)",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic (the)",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands (the)",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia (Federated States of)",
    "MD": "Moldova (the Republic of)",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands (the)",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger (the)",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands (the)",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine, State of",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines (the)",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "MK": "Republic of North Macedonia",
    "RO": "Romania",
    "RU": "Russian Federation (the)",
    "RW": "Rwanda",
    "RE": "Réunion",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten (Dutch part)",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan (the)",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan (Province of China)",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands (the)",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates (the)",
    "GB": "United Kingdom of Great Britain and Northern Ireland (the)",
    "UM": "United States Minor Outlying Islands (the)",
    "US": "United States of America (the)",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela (Bolivarian Republic of)",
    "VN": "Viet Nam",
    "VG": "Virgin Islands (British)",
    "VI": "Virgin Islands (U.S.)",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe",
    "AX": "Åland Islands"
}
