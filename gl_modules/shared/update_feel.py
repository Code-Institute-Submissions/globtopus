import datetime

from gl_modules.shared.today import today_f


def update_world_feel(mongo, people, feeling):
    """INSERTING INTO WORLD FEEL FOR THE CURRENT DAY
      TO DO : IF LOGGED IN USER SUBMITS AGAIN JUST RECALCULATE FEELING
      WITHOUT ADDING EXTRA PERSON TO THE MIX
      - LAST FEELING + CURRENT FEELING"""

    """if logged in user changing his feel, we will just recalculate his feel
     without adding new person to the mix, 
     if new user we will ad 1 person to the mix"""

    mongo.db.world_feel.update(
        {"day": datetime.datetime.now().strftime("%F")},
        {"$inc":
             {"num_of_people": people,
              "sum_of_feelings": feeling}}
        ,
        upsert=True
    )


def update_country_feel(mongo, country_code, people, feeling):
    today = today_f()

    """if logged in user changing his feel, we will just recalculate his feel
     without adding new person to the mix, 
     if new user we will add 1 person to the mix"""

    """here increase current people and current feelings
    and with cron job, substract 8th day from it <- TO DO"""
    mongo.db.country_feel.update(
        {"country_code": country_code},
        {"$inc":
             {"feels." + today + ".num_of_people": people,
              "feels." + today + ".sum_of_feelings": feeling}}
        ,
        upsert=True
    )
