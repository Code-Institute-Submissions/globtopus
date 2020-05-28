## Testing
There are 3 ways how I tested this website:
-[Manual testing](#Manual-testing)
> I have done lots of manual testing myself, and also asked my family to test it on their devices, from where
I got interesting insights into the expectations of regular users, which I used to hopefully improve the functionality of the website.
-[Cypress end-to-end testing](#Cypress-end-to-end testing)
> I decided to learn about cypress.io for testing and writing test for the application during my Second Milestone project
>and I am using cypress.io again for this project. It allowed me to test my application automatically, and 
         it allowed me to record my tests using this command. 
-[Python testing](#Python-testing)
>With python testing I was experiencing great difficulties with connecting to MongoDB during tests,
when I tried to import mongo.A simple test without needing MongoDB would pass, but one that needed MongoDB didn't. I tried to find a solution to be
able to test my Flask Application on live DB on StackOverflow and other sources online, but I wasn't successful. So I tried to
solve this challenge with Tutor Support from CodeInstitute, but we couldn't solve it. So in the end, as I wanted to have
site tested, I decided to write a suite of tests to test the core functionality of the website myself without unittest.

### Manual testing

##### Create an account - pass
        
To create an account, click on sign up link at the top right corner of the navigation bar, or on the menu button and then sign up when using a mobile device. Then you will be redirected to sign up page, where you need to select your country and then your county on the map. You can also click on the list icon above the map to select the country and then county.
     Then you will need to provide your user name and email which need to be unique to the site, and you will need to provide a password. Once all the details are filled, you can click on the sign-up button. We will check your credentials and if everything is ok, you will be redirected to the sign-in page, where you can sign in with your credentials.
   
##### Search for posts - pass
To search for posts, type in how you currently feel in the search input field and click on get results button,
     if there are results, you can read them, if there are no results, you will have the opportunity to be first to
     write the post about your current feeling and what you do to feel this way or better.
##### Create post - pass
To create your first post, log in with your credentials and navigate to the landing page, then select how you feel on 
    the range slider, type in how you currently feel, why you feel this way, and what do you do (will do) do feel better.
    Or if you want to add a post about the general experience, you can type in a sense of When I feel like...Because...One
    think that I do (recommend doing is)... and click on submit button

##### Edit post - pass
To edit your post, log in with your credentials and click on my posts link on the left side navigation, or 
when on mobile device click on my posts at the bottom nav, then you should see your posts, every post has a pen 
icon to edit and trash icon to delete a post. Click in pen icon of the post you want to edit, and a popup with 
your post will appear and you can edit your post, when done, click on the update button, you should then see the confirmation
alert whether the update was successful or not.

##### Delete post - pass
To delete your post, log in with your credentials and click on my posts link on the left side navigation, or 
when on mobile device click on my posts at the bottom nav, then you should see your posts, every post has a pen 
icon to edit and trash icon to delete a post. Click in trash icon of the post you want to delete, and a popup with 
a confirmation dialog will appear and you can select if you want to delete the post, or you can cancel it, click on the delete button, you should then see the confirmation
alert whether the delete was successful or not.

##### Add user to your globe - pass
To add a user to your globe, search for the posts as above, every post has an icon of user with plus or minus sign, if you want to add a user to your globe, simply click on the user with a plus icon, when added, you will see the confirmation popup, and the icon will change to the user with a minus sign. 
##### Delete user from globe - pass
 To delete a user from your globe, you have two options. First: if you search for the posts and the post has a user icon with a minus sign, you can click on it and the user
will be removed. Second: from within your dashboard, when you click on my globe link on the left navigation or bottom navigation when on mobile, list of users
in your globe will appear, then click on the user you want to remove, you will see that user with his name and trash icon on the right side, click on that icon and a confirmation
dialog will pop-up, click on yes to delete or no to cancel.

##### Flag the post as inappropriate - pass
To flag, the post as inappropriate, click on the flag icon under the post you think is inappropriate.

##### Add post to your favorites - pass
To add post to your favorites, click on the heart icon under the post you like.
##### Remove post from favorites - pass
To remove posts from favorites, from within your dashboard, click on my favorites link on the left navigation or bottom navigation when on mobile, and your favorite posts will appear, then click on the trash icon on the right side to remove it from your favorites. Click on that icon and a confirmation
a dialog will pop-up, click on yes to delete, or no to cancel
##### Add post to your feelist - pass
To add post to your feelist, from within your dashboard, search for the posts as above, every post has an icon of the plus sign to it, click on it. If you don't have any feelists yet, you
will see create a new feelist input text field and radio button next to it, so select that radio button and type in your new feelist's name and click on save. If you
have created some feelists already, you will have the option to add post to existing feelist or you can create a new one. Just select one of the existing or create new feelist and click the appropriate radio button next to the feelist you are adding the post to and click on save.
##### Remove post from your feelist - pass
To remove a post from your feelist, from within your dashboard, when you click on my feelists link on the left navigation or bottom navigation when on mobile, list of feelists
will appear, click on the feelist you want to remove a post from, you will see that posts for that feelist and with trash icon on the right side within that post, click on that icon and a confirmation dialog will pop-up, click on yes to delete or no to cancel. 
##### Delete your feelist - pass
To delete your feelist, from within your dashboard, when you click on my feelists link on the left navigation or bottom navigation when on mobile, list of feelists
will appear, click on the feelist you want to remove, you will see that posts for that feelist and with trash icon on the right side next to the feelist name, click on that icon and a confirmation dialog will pop-up, click on yes to delete or no to cancel. 
##### Search the map - pass
   To search the map, click on the map button, under the globe with hearth, and the SVG map will appear, with country maps colored according
to their feelings, when you hover over the map on desktop or laptop, country name will appear in the top left corner of the map. You can zoom in and out or pan the map using controls next to the map on the left side of the map, or you can use your mouse. To zoom in and out scroll the wheel, to move it, click on the map and drag.
 When you click on country name information about the number of people registered for that country and feelings for that country, as well
  as button EXPLORE MORE will appear.
 When you click on that button, you will be redirected to that country page.
  When you click on any of the colored circles above the map, popup with country names in that range will appear. If you click on the list icon all the countries will appear. When you click on the country link, you will be redirected to that country page. 


##### See the charts - pass
   To see the charts, click on the chart button, under the globe with hearth, and world progress chart for the last 10 days will appear, on the right side of the chart on desktop and laptop, or under the chart on mobile devices. You will have the option of previewing progress for past 30,90,180,360
    days. Just click on any of those to see the chart. If you want to see the chart for country, click on countries button and select the top 10,30 or list all.
    When you click on one of these, a list of countries will appear with left border color-matched to color of that country on the bar chart, for better recognition. If you click on the country name, 4 oval buttons will appear with numbers 30,90,180,360 and the EXPLORE MORE button. If you click on the oval numbered button, you will see the country's progress for that number of days. EXPLORE MORE button will take you to that country page.
    
##### Country page - pass
   When you click on the EXPLORE MORE button or link in popup with countries in range, you will be redirected to that country page. You can also 
navigate to country page by visiting <code> globtopus.herokuapp.com/{country-code}</code> and 2 digit ISO country code for example
https://globtopus.herokuapp.com/ie. When on the country page, you will see the country map with its counties/states colored according to their feelings.
When you hover over the map county name will appear on the top left side of the map. When you click on colored range buttons, you will see the counties in that range.
If you click on the link from within the popup, you will see a chart for the past 10 days for that county. Oval buttons will appear above the chart,
and you can click on them and see the progress for 30,90,180,360 days. When you click on the chart button on the nav above chart/map you will see the progress
of that country for the past 10 days, and again oval buttons will appear above the chart,
and you can click on them and see the progress for 30,90,180,360 days. You can search for the posts in that country as above.
   
##### Public user page - pass
  When you click on the user name from within the post, you will be redirected to the public user page, where you will see all posts from that user,
and when you are logged in, you can add the posts to your favorites, feelists, add users to your globe.


##### Admin - pass
  When you log in as admin with those credentials EMAIL: admin@globtopus.com PASSWORD: password, you will see all the posts that
were flagged as inappropriate, you can then decide whether to delete them or return them to search results, by clicking on
delete or return back buttons. When you click on these buttons, a confirmation popup will appear, click yes to perform the action, and
no to cancel the action.

  
### Cypress end-to-end testing

Below is the list of end-to-end tests to test every functionality of the website.


> I was experiencing unexpected troubles with cypress recordings this time, as some of the recordings were recorded 
only 70-80% of its length so I decided to do record it myself and convert recordings to gif as this way it is possible
to see all tests passing to the end.


Clicking on the name of the file will take you to the source code of the test.





| Test js |   Result   |
| :---            |         ---: |
|                               |          |
| [sign_up.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/sign_up.js)        |pass|
|            |                   |         |
|         |           |   
| [sign_in.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/sign_in.js)    |pass|
|            |                  |        | 
|          |            |    
| [create_post.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/create_post.js)      |pass|
|            |                   |          |
|          |                             |
|[update_post.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/update_post.js)    | pass|
|            |                 |        |
|         |          |         |       |
|[delete_post.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/delete_post.js)  | pass|
|           |                  |       |
|                        |       |
|  [search_for_post.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/search_for_post.js)       |pass   |
|             |                 |          |
|  [add post_to_feelist.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/add_post_to_feelist.js)        | pass  |
|            |                   |         |
|  [remove_post_from_your_feelist.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/remove_post_from_your_feelist.js)        |pass  |
|            |                   |         |
|  [delete_feelist.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/delete_feelist.js)      pass  |
|            |                   |         |
|  [add_post_to_your_favourites.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/add_post_to_your_favourites.js)       |pass  |
|            |                   |         |
|  [remove_post_from_your_favourites.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/remove_post_from_your_favourites.js)    |pass  |
|            |                   |         |
|  [add_user_to_globe.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/add_user_to_globe.js)      |   pass  |
|            |                   |         |
|  [remove_user_from_globe.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/remove_user_from_globe.js)      |     pass  |
|            |                   |         |
|  [flag_post.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/flag_post.js)      |     pass  |
|            |                   |         |
|  [admin.js](https://github.com/marcelkolarcik/globtopus/blob/master/cypress/integration/admin.js)      |     pass  |
|            |                   |         |
  
<img src="https://raw.githubusercontent.com/marcelkolarcik/globtopus/master/gl_modules/assets_dist/static/readme_images/cypress_all.gif" title="https://globtopus.herokuapp.com/" alt="https://globtopus.herokuapp.com/">
            
### Python testing

With python testing I was experiencing great difficulties with connecting to MongoDB during tests, I was getting this error
```cli
======================================================================
ERROR: test_create_user (unittest.loader._FailedTest)
----------------------------------------------------------------------
ImportError: Failed to import test module: test_create_user
Traceback (most recent call last):
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\unittest\loader.py", line 436, in _find_test_path
    module = self._get_module_from_name(name)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\unittest\loader.py", line 377, in _get_module_from_name
    __import__(name)
  File "C:\Users\Marcel Kolarcik\code\globtopus\gl_modules\tests\unit\test_create_user.py", line 4, in <module>
    from app import app
  File "C:\Users\Marcel Kolarcik\code\globtopus\app.py", line 12, in <module>
    mongo = PyMongo(app)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\site-packages\flask_pymongo\__init__.py", line 110, in __init__
    self.init_app(app, uri, *args, **kwargs)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\site-packages\flask_pymongo\__init__.py", line 147, in init_app
    parsed_uri = uri_parser.parse_uri(uri)
  File "C:\Users\Marcel Kolarcik\AppData\Local\Programs\Python\Python38-32\lib\site-packages\pymongo\uri_parser.py", line 395, in parse_uri
    raise InvalidURI("Invalid URI scheme: URI must "
pymongo.errors.InvalidURI: Invalid URI scheme: URI must begin with 'mongodb://' or 'mongodb+srv://'


----------------------------------------------------------------------
Ran 2 tests in 0.001s

FAILED (errors=1)
```
A simple test without needing MongoDB would pass, but one that needed MongoDB didn't. I tried to find a solution to be
able to test my Flask Application on live DB on StackOverflow and other sources online, but I wasn't successful. So I tried to
solve this challenge with Tutor Support from CodeInstitute, but we couldn't solve it. So in the end, as I wanted to have
site tested, I decided to write a suite of tests to test the core functionality of the website myself without unittest.

A test file can be previewed here [tests_b.py](https://github.com/marcelkolarcik/globtopus/blob/master/gl_modules/tests/tests_b.py) 
and live testing can be performed here https://globtopus.herokuapp.com/testing.

So what I have done to test the core functionality of the website in Python is:

I created a form to create 2 users and 2 posts. ( one per each user ). Once I click on run tests button an AJAX call to tests_b.py file is made and there I run several tests:
- user_1_created
- user_2_created
- user_1_post_created
- user_2_post_created
- user_2_added_to_globe
- user_2_added_to_feelist
- user_2_post_in_favorites

I am using try-except during the run of the tests and collecting results into results array, so if the creation or update
is successful I will add pass, or no pass if it fails.
```python
    """
          INSERT USER #1 
    """
    try:
        mongo.db.users.insert_one(user_1)
        results['user_1_created'] = "pass"
    except:
        results['user_1_created'] = "no pass"
```
At the end of the tests, I am returning results to the page and if all the tests are pass, a link to sign in is rendered,
so you can log in as
the first user with the credentials you have used to create the first user, to see if it passed, and once you are logged in,
you should see your post created, your favorite post (the second post created ), your globe should have the second user in it, and
if you click on your feelist, then the second post should be in the feelist.

Or you can see your post live if you click on the link "Your first post on Globtopus...;-)"