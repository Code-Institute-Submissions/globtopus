import unittest


class CreateUser(unittest.TestCase):
    def test_create_user(self):
        """
            this is how I import mongo in my modules, to avoid circular error
            and there is no issue, however in testing I am getting this error
            $ python -m unittest discover -s tests/unit
.E
======================================================================
ERROR: test_create_user (test_create_user.CreateUser)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Users\Marcel Kolarcik\code\globtopus\tests\unit\test_create_user.py", line 6, in test_create_user
    from app import mongo
  File "C:\Users\Marcel Kolarcik\code\globtopus\app.py", line 12, in <module>
    mongo = PyMongo(app)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\site-packages\flask_pymongo\__init__.py", line 110, in __init__
    self.init_app(app, uri, *args, **kwargs)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\site-packages\flask_pymongo\__init__.py", line 143, in init_app
    raise ValueError(
ValueError: You must specify a URI or set the MONGO_URI Flask config variable

----------------------------------------------------------------------
Ran 2 tests in 4.525s

FAILED (errors=1)

        """
        from app import mongo

        """
        Test user was created
        """
        user = {
            "_id": {
                "$oid": "5ecb05b2de89996432acc7e6"
            },
            "cc": "ao",
            "cl": "Moxico",
            "name": "Test User",
            "email": "test_user@globi.com",
            "image_id": 36,
            "password": "pbkdf2:sha256:150000$CG8B6Tou$d2a45916ad8fa81ecec6b72ee36fe3768da688b7a10515f80acb56c2db0d3dcc",
            "created_at": {
                "$date": "2020-05-25T00:39:27.847Z"
            },
            "last_login": {
                "$date": "2020-05-25T01:16:12.258Z"
            },
            "last_feel": "100",
            "user_feel": {
                "2020-05-15": 40,
                "2020-05-16": 36,
                "2020-05-17": 35,
                "2020-05-18": 39,
                "2020-05-19": 17,
                "2020-05-20": 38,
                "2020-05-21": 55,
                "2020-05-22": 23,
                "2020-05-23": 14,
                "2020-05-24": 46,
                "2020-05-25": "100"
            },
            "posts": [
                {
                    "i_feel": [
                        "very",
                        "good"
                    ],
                    "because": [
                        "i",
                        "am",
                        "going",
                        "for",
                        "a",
                        "walk",
                        "to",
                        "the",
                        "forrest"
                    ],
                    "action": "Accomplishments are based on actions, not on thoughts--yet the thought is always father to the deed. Achievement starts with an idea, a perspective, a point of view, or even just an attitude.",
                    "post_id": "5ecb05afde88596432acc7b0",
                    "created_at": {
                        "$date": "2020-05-17T00:39:27.581Z"
                    },
                    "likes": 73,
                    "feel": 51
                },
                {
                    "i_feel": [
                        "joyful"
                    ],
                    "because": [
                        "i",
                        "have",
                        "nothing",
                        "to",
                        "do"
                    ],
                    "action": "Don't compare where you are now with where you someday hope to be. Compare where you are now to where you were a few days ago. Then you'll get dozens of bite-size chunks of fulfillment--and a never-ending supply of things to be thankful for.",
                    "post_id": "5ecb05afde88596432acc7b1",
                    "created_at": {
                        "$date": "2020-05-16T00:39:27.581Z"
                    },
                    "likes": 70,
                    "feel": 12
                },
                {
                    "i_feel": [
                        "surprised"
                    ],
                    "because": [
                        "i",
                        "was",
                        "up",
                        "all",
                        "night"
                    ],
                    "action": "You have plans. You have goals. You have ideas. Who cares? You have nothing until you actually do something. Every day we let hesitation and uncertainty stop us from acting on our ideas. Pick one plan, one goal, or one idea. And get started. Just take one small step. The first step is by far the hardest. Every successive step will be a lot easier. ",
                    "post_id": "5ecb05afde88596432acc7b2",
                    "created_at": {
                        "$date": "2020-05-16T00:39:27.581Z"
                    },
                    "likes": 2,
                    "feel": 92
                }
            ],
            "likes": [
                "5ecb05b1de88596432acc7de",
                "5ecb084ede88596432acfee8",
                "5ecb0843de88596432acfe1a",
                "5ecb0843de88596432acfe19"
            ],
            "my_feelists": [
                {
                    "name": "ewdwed",
                    "post_ids": [
                        "5ecb05b1de88596432acc7de"
                    ]
                },
                {
                    "name": "new",
                    "post_ids": [
                        "5ecb084ede88596432acfee8"
                    ]
                }
            ],
            "flags": [
                "5ecb084ede88596432acfee8"
            ],
            "my_globs": [
                "5ecb0846de88596432acfe42",
                "5ecb0846de88596432acfe47",
                "5ecb0846de88596432acfe48",
                "5ecb0849de88596432acfe83",
                "5ecb0849de88596432acfe84"
            ]
        }
        isRegister = True

        try:
            mongo.db.test_users.insert(user)

        except:
            print("Something went wrong")
            isRegister = False
        mongo.db.test_users.insert(user)
        self.assertEqual(isRegister, True)


if __name__ == '__main__':
    unittest.main()
