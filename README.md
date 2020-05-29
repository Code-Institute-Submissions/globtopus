<a href="https://globtopus.herokuapp.com/">
<img src="https://raw.githubusercontent.com/marcelkolarcik/globtopus/master/gl_modules/assets_dist/static/readme_images/readme_header.png" title="https://globtopus.herokuapp.com/" alt="https://globtopus.herokuapp.com/">
</a>


# Globtopus



## Inspiration 

It is my desire to know how does the world feel like, and whether we can help each other to feel a little bit better...




## Table of Contents

- [Inspiration](#inspiration)
- [User Experience](#User-Experience)
   - [User story](#User-story)
   
      - [Public user](#Public-user)
      - [Logged in user](#Logged-in-user)
      - [Admin](#Admin)
      
   - [Step by step guides](#Step-by-step-guides)
   
       - [Create an account](#Create-an-account)
       - [Search for posts](#Search-for-posts)
      - [Create post](#Create-post)  
      - [Edit post](#Edit-post)
      - [Delete post](#Delete-post)
      - [Add user to your globe](#Add-user-to-your-globe)
      - [Delete user from globe](#Delete-user-from-globe)
      - [Flag the post as inappropriate](#Flag-the-post-as-inappropriate)
      - [Add post to your favorites](#Add-post-to-your-favorites)
      - [Remove post from favorites](#Remove-post-from-favorites)
      - [Add post to your feelist](#Add-post-to-your-feelist)
      - [Remove post from your feelist](#Remove-post-from-your-feelist)
      - [Delete your feelist](#Delete-your-feelist)
      - [Search the map](#Search-the-map)
      - [See the charts](#See-the-charts)
      - [Country page](#Country-page)
      - [Public user page](#Public-user-page)
      - [Admin](#Admin)
      
      
      
- [Wireframes](#Wireframes)
- [Colors](#Colors)
   
- [Technologies](#technologies)

   - [cypress.io](#cypressio)
   - [webpack](#webpack)
   - [sweetalert.js](#sweetalert)
   - [simple-jQuery-translator](#simple-jQuery-translator)
   - [javascript,HTML,CSS](#javascriptHTMLCSS)
   - [Python,Flask](#PythonFlask)
   - [MongoDB](#MongoDB)
   - [charts.js](#charts)
   - [intro.js](#intro)
   

- [Features](#Features)       
- [Testing](#testing)
- [Version Control](#Version-Control)
- [Deployment](#deployment)
- [Difficulties](#Difficulties)
- [Future Features](#future-features)
- [Browser support](#Browser-support)
- [Acknowledgements](#Acknowledgements)



## User Experience

 - ### User story
 
    - #### Public user
     
    
   As a public user I would like to be able to:
  
        -  see how does the world feel like
        -  see how do world countries feel like on the map, differentiated by color
        -  see the progress of the world, country and county/state on the chart
        -  see the top countries and countries grouped by feelings
        -  see the individual country and counties/states progress on the chart
        -  Search for and read posts worldwide and countrywide
        -  create account
        -  use the site on any device
       
     
   - #### Logged in user
          
         
   As a Logged in user I would like to be able to:
     
       -  same as public user plus :
       -  have an account on the site
       -  create post
       -  edit post
       -  delete post
       -  add other posts to my favorites
       -  remove posts from my favorites
       -  add other globers to my globe
       -  remove other globers from my globe
       -  create feelists to add other posts to it (feelist is like a playlist for the actions you can take to feel a little bit better...)
       -  add other posts to my feelist 
       -  remove posts from my feelist 
       -  delete feelist
       -  see my progress as to how I feel over time
          
   - #### Admin
                    
                   
   As an Admin of the site I would like to be able to:
              
       -  have an account on the site
       -  preview all the flagged posts
       -  remove the inappropriate post or return it to search results if I think that post is not inappropriate
       -  use the site on any device
             
   
 
  - ### Step by step guides
  
  Here guides for interactions with the application.
  
  > mobile and desktop version of the user dashboard

  <img src="https://raw.githubusercontent.com/marcelkolarcik/globtopus/master/gl_modules/assets_dist/static/readme_images/user_nav.png"  alt="https://globtopus.herokuapp.com/">

 

   - #### Create an account
        
     To create an account, click on sign up link at the top right corner of the navigation bar, or on the menu button and then sign up when using a mobile device. Then you will be redirected to sign up page, where you need to select your country and then your county on the map. You can also click on the list icon above the map to select the country and then county.
     Then you will need to provide your user name and email which need to be unique to the site, and you will need to provide a password. Once all the details are filled, you can click on the sign-up button. We will check your credentials and if everything is ok, you will be redirected to the sign-in page, where you can sign in with your credentials.
   
   - #### Search for posts
     To search for posts, type in how you currently feel in the search input field and click on get results button,
     if there are results, you can read them, if there are no results, you will have the opportunity to be first to
     write the post about your current feeling and what you do to feel this way or better.
   - #### Create post
     To create your first post, log in with your credentials and navigate to the landing page, then select how you feel on 
    the range slider, type in how you currently feel, why you feel this way, and what do you do (will do) do feel better.
    Or if you want to add a post about the general experience, you can type in a sense of When I feel like...Because...One
    think that I do (recommend doing is)... and click on submit button

   - #### Edit post
     To edit your post, log in with your credentials and click on my posts link on the left side navigation, or 
when on mobile device click on my posts at the bottom nav, then you should see your posts, every post has a pen 
icon to edit and trash icon to delete a post. Click in pen icon of the post you want to edit, and a popup with 
your post will appear and you can edit your post, when done, click on the update button, you should then see the confirmation
alert whether the update was successful or not.

- #### Delete post
     To delete your post, log in with your credentials and click on my posts link on the left side navigation, or 
when on mobile device click on my posts at the bottom nav, then you should see your posts, every post has a pen 
icon to edit and trash icon to delete a post. Click in trash icon of the post you want to delete, and a popup with 
a confirmation dialog will appear and you can select if you want to delete the post, or you can cancel it, click on the delete button, you should then see the confirmation
alert whether the delete was successful or not.

- #### Add user to your globe
    To add a user to your globe, search for the posts as above, every post has an icon of user with plus or minus sign, if you want to add a user to your globe, simply click on the user with a plus icon, when added, you will see the confirmation popup, and the icon will change to the user with a minus sign. 
- #### Delete user from globe
    To delete a user from your globe, you have two options. First: if you search for the posts and the post has a user icon with a minus sign, you can click on it and the user
will be removed. Second: from within your dashboard, when you click on my globe link on the left navigation or bottom navigation when on mobile, list of users
in your globe will appear, then click on the user you want to remove, you will see that user with his name and trash icon on the right side, click on that icon and a confirmation
dialog will pop-up, click on yes to delete or no to cancel.

- #### Flag the post as inappropriate
    To flag, the post as inappropriate, click on the flag icon under the post you think is inappropriate.

- #### Add post to your favorites
    To add post to your favorites, click on the heart icon under the post you like.
- #### Remove post from favorites
    To remove posts from favorites, from within your dashboard, click on my favorites link on the left navigation or bottom navigation when on mobile, and your favorite posts will appear, then click on the trash icon on the right side to remove it from your favorites. Click on that icon and a confirmation
a dialog will pop-up, click on yes to delete, or no to cancel
- #### Add post to your feelist
    To add post to your feelist, search for the posts as above, every post has an icon of the plus sign to it, click on it. If you don't have any feelists yet, you
will see create a new feelist input text field and radio button next to it, so select that radio button and type in your new feelist's name and click on save. If you
have created some feelists already, you will have the option to add post to existing feelist or you can create a new one. Just select one of the existing or create new feelist and click the appropriate radio button next to the feelist you are adding the post to and click on save.
- #### Remove post from your feelist
    To remove a post from your feelist, from within your dashboard, when you click on my feelists link on the left navigation or bottom navigation when on mobile, list of feelists
will appear, click on the feelist you want to remove a post from, you will see that posts for that feelist and with trash icon on the right side within that post, click on that icon and a confirmation dialog will pop-up, click on yes to delete or no to cancel. 
- #### Delete your feelist
    To delete your feelist, from within your dashboard, when you click on my feelists link on the left navigation or bottom navigation when on mobile, list of feelists
will appear, click on the feelist you want to remove, you will see that posts for that feelist and with trash icon on the right side next to the feelist name, click on that icon and a confirmation dialog will pop-up, click on yes to delete or no to cancel. 
- #### Search the map
   To search the map, click on the map button, under the globe with hearth, and the SVG map will appear, with country maps colored according
to their feelings, when you hover over the map on desktop or laptop, country name will appear in the top left corner of the map. You can zoom in and out or pan the map using controls next to the map on the left side of the map, or you can use your mouse. To zoom in and out scroll the wheel, to move it, click on the map and drag.
 When you click on country name information about the number of people registered for that country and feelings for that country, as well
  as button EXPLORE MORE will appear.
 When you click on that button, you will be redirected to that country page.
  When you click on any of the colored circles above the map, popup with country names in that range will appear. If you click on the list icon all the countries will appear. When you click on the country link, you will be redirected to that country page. 


- #### See the charts
   To see the charts, click on the chart button, under the globe with hearth, and world progress chart for the last 10 days will appear, on the right side of the chart on desktop and laptop, or under the chart on mobile devices. You will have the option of previewing progress for past 30,90,180,360
    days. Just click on any of those to see the chart. If you want to see the chart for country, click on countries button and select the top 10,30 or list all.
    When you click on one of these, a list of countries will appear with left border color-matched to color of that country on the bar chart, for better recognition. If you click on the country name, 4 oval buttons will appear with numbers 30,90,180,360 and the EXPLORE MORE button. If you click on the oval numbered button, you will see the country's progress for that number of days. EXPLORE MORE button will take you to that country page.
    
- #### Country page
   When you click on the EXPLORE MORE button or link in popup with countries in range, you will be redirected to that country page. You can also 
navigate to country page by visiting <code> globtopus.herokuapp.com/{country-code}</code> and 2 digit ISO country code for example
https://globtopus.herokuapp.com/ie. When on the country page, you will see the country map with its counties/states colored according to their feelings.
When you hover over the map county name will appear on the top left side of the map. When you click on colored range buttons, you will see the counties in that range.
If you click on the link from within the popup, you will see a chart for the past 10 days for that county. Oval buttons will appear above the chart,
and you can click on them and see the progress for 30,90,180,360 days. When you click on the chart button on the nav above chart/map you will see the progress
of that country for the past 10 days, and again oval buttons will appear above the chart,
and you can click on them and see the progress for 30,90,180,360 days. You can search for the posts in that country as above.
   
- #### Public user page
  When you click on the user name from within the post, you will be redirected to the public user page, where you will see all posts from that user,
and when you are logged in, you can add the posts to your favorites, feelists, add users to your globe.


- #### Admin
  When you log in as admin with those credentials EMAIL: admin@globtopus.com PASSWORD: password, you will see all the posts that
were flagged as inappropriate, you can then decide whether to delete them or return them to search results, by clicking on
delete or return back buttons. When you click on these buttons, a confirmation popup will appear, click yes to perform the action, and
no to cancel the action.

  
    
- ### Wireframes  
   
    I used pencil and paper to draw an initial wireframe design ...
    The initial drawings can be found here
    [Wireframes](WIREFRAMES.md)
    
 - ### Colors 
 
   I decided on a very light color scheme, with a touch of green for div borders, blue for the buttons, and red hearth image with .7 opacity.
 as I want users to feel light when interact with the site.
    
   
    
    ```css
     .border_green {
          border: solid 1px rgba(111, 227, 0, 1);
        }
        .gl_button {
          background-color: #177199;
          color: whitesmoke;
          font-family: "Lato", sans-serif;
          padding: 2px 10px 2px 10px;
          margin: 20px 2px 20px 2px;
          cursor: pointer;
          border: 1px solid #177199;
          white-space: nowrap;
    }
    ``` 
<img src="https://raw.githubusercontent.com/marcelkolarcik/globtopus/master/gl_modules/assets_dist/static/readme_images/color_scheme.png" title="https://globtopus.herokuapp.com/" alt="https://globtopus.herokuapp.com/">
 
## Technologies 
### cypress.io
> Fast, easy and reliable testing for anything that runs in a browser.

I decided to learn about and write tests for front end in cypress.io. 
I Installed Cypress via npm: 

```cl 
cd /your/project/path
```

```cl 
npm install cypress --save-dev
```

And whenever I want to run tests, I use
```cl 
./node_modules/.bin/cypress open
```


 

 
 ### webpack
 
 > A bundler for javascript and friends. Packs many modules into a few bundled assets.
 
 Webpack allows me to keep my js code in as many different directories and files as I see fit, to easily manage and
find and debug my code, while webpack will bundle all of the code that is required for any page
into one single minified file.
Webpack is also watching all of my files during the development, and as I update my code, webpack will automatically
update bundle with newly updated code.
 
 I installed it via npm:
 
 ```cl 
 $ cd /your/project/path
 ```
 
 ```cl 
 $ npm install webpack webpack-cli --save-dev
 ```
 
 And followed documentation here
 <a href="https://webpack.js.org/guides/getting-started/#basic-setup" target="_blank">
 webpack
 </a>
 
 In the webpack.config.js file I decide how to bundle my <code>src</code> files and where to output them.
 
 
 
 At the start of the development I run 
 ```cl
 $ cd /my/project/path
 $ npm run build
 
``` 

So that webpack will compile and will start to watch my code for changes and will update files in <code>dist</code> as I code.

 
### maps

 #### SVG maps
 I am using SVG maps/images that I have gotten from public domains, mostly Wikipedia and some of the maps from
 The University of Texas, NASA, and various government sites that have released maps and images into public domains over the years. If the map was image file and not SVG file, I would use Adobe Illustrator to trace it, and create an SVG file from the image. Then in Illustrator I would add names to SVG elements, so that it will correspond to proper country/county name.
  It took some time... I then created hobby application in ActionScript where the map was clickable all the levels down. But when 
  virtual elimination of plugins (namely, the Flash plugin) in the web browser became reality, I left it as a hobby project.
  
  
  However, as I've learned and still learning about javascript and jQuery, maps became useful again.
  
  So I am hardcoding world map in the HTML file, and as for the country maps, I have deconstructed them down to id and d attributes,
which I am storing in MongoDB database, and recreating and adding them to DOM with javascript on the country page load, Adding fill attribute
according to country feelings data from DB and I am adding country/county names and classes for interactions.
I tried to load world map from DB but it takes around 5 seconds to load it, so I decide to hardcode it in, for much better response
time.


Maps are intended for entertainment purposes only, as the borders of some countries/ counties may have changed, and
therefore might not be accurate.
  

  
### sweetalert

> A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes. Zero dependencies.

 <a href="https://sweetalert2.github.io" target="_blank">
     sweetalert2
      </a>
      
I am using sweetalert2 because it allows me to customize my alerts to my users with my HTML code, which means that alerts
 can be matched with colors and styles and feels with the rest of the application, which will in my opinion,
  provide a much smoother and more pleasant experience for the users. 
  
  
      

### simple-jQuery-translator

 > Simple jQuery translator for translating text, the title of an element, placeholder for input fields, and alt attribute for images. If you need to include variables, simple-jQuery-translator can handle it as well.
 
 During the development of wake-up-happy application, I wanted to have a website translated into several languages.
 I didn't find any package that would solve my problem completely, so I tried to write my translating script and 
 simple-jQuery-translator is a result of my tries...
 
 
 ### javascript,HTML,CSS
 
   - javascript 
   > JavaScript is a scripting or programming language that allows you to implement complex features on web pages
   
   - HTML
   > HTML is the standard markup language for creating Web pages.
   
   - CSS
   > CSS is is a style sheet language used for describing the presentation of a document written in 
    a markup language like HTML.CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
    
### Python,Flask
   - Python 
   >    Python is an interpreted, object-oriented, high-level programming language with dynamic semantics. 
It's high-level built-in data structures, combined with dynamic typing and dynamic binding,
 make it very attractive for Rapid Application Development, as well as for use 
as a scripting or glue language to connect existing components.
   
   - Flask
   >    Flask is a micro web framework written in Python. It is classified as a microframework because 
it does not require particular tools or libraries. It has no database abstraction layer, form validation,
       or any other components where pre-existing third-party libraries provide common functions. 
       However, Flask supports extensions that can add application features as if they were implemented in Flask itself.
       Applications that use the Flask framework include Pinterest and LinkedIn.
   
   
       
### MongoDB
   - MongoDB 
   >   MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need
### charts
  - charts.js
  > Simple yet flexible JavaScript charting for designers & developers

### intro
   - intro.js 
   > When new users visit your website or product you should demonstrate your product 
   features using a step-by-step guide. Even when you develop and add a new feature to your product,
  you should be able to represent them to your users using a user-friendly solution. 
  Intro.js is developed to enable web and mobile developers to create a step-by-step introduction easily.
 
 ## Features
 
 - ### Public user 
 
 A public user  can :
    
       -  see how does the world feel like
       -  see how do world countries feel like on the map, differentiated by color
       -  see the progress of the world, country and county/state on the chart
       -  see the top countries and countries grouped by feelings
       -  see the individual country and counties/states progress on the chart
       -  Search for and read posts worldwide and countrywide
       -  create account
       -  use the site on any device
             
             
- ### Logged in user 
     
 Logged in user can :
     
       -  same as public user plus :
       -  have an account on the site
       -  create post
       -  edit post
       -  delete post
       -  add other posts to my favorites
       -  remove posts from my favorites
       -  add other globers to my globe
       -  remove other globers from my globe
       -  create feelists to add other posts to it (feelist is like a playlist for the actions you can take to feel a little bit better...)
       -  add other posts to my feelist 
       -  remove posts from my feelist 
       -  delete feelist
       -  see my progress as to how I feel over time
 
- ### Admin 
     
Admin can :
              
       -  have an account on the site
       -  preview all the flagged posts
       -  remove the inappropriate post or return it to search results if I think that post is not inappropriate
       -  use the site on any device

- ### Custom Error page

I have created custom error pages, one general for 404,500 errors and one for 403 error.
Custom error pages enable me to customize the pages that are displayed when an error occurs. 
Not only do they make your website more professional, they can also save us from losing visits to our site.
 If a visitor they see a helpful error page, they may continue to stay because they can simply click a 
 link to go to another page within our site.
 
- ### Text search
As I wanted users to be able to search the site for the posts where query string would match "I feel" and "because" parts
of the posts, other user posted, I was considering to create 
text index, but as per documentation, not all languages are supported, so I decided to split "I feel" and "because" parts
,sanitize each word first and then store it into DB as array, so then when user searches for strings I am performing
this query to find the posts that would be match

 
```python
search_results = mongo.db.users.aggregate([

            {"$unwind": '$posts'},
            {"$match": {"$or": [

                                {"posts.i_feel": {"$in": q}},  # q is array
                                {"posts.because": {"$in": q}}
                                ],
                        "$and": [
                            {"cc": cc},
                         ]
            }}
            ,
            {"$sort": {"posts.created_at": -1}},
            {"$limit": 20}

        ])
``` 
- ### Advertisements
I thought that the best place for advertisement would be right next to the sign-in form on the sign-in page and next to the country map
on the country page, so I just created some advertisements with Bootstrap carousel. It's just my previous Milestone projects.

- ### Favicon
I have created a Favicon. Favicons save the users time in identifying a website from bookmarks, history,
 and other places where a browser places that favicon for quick identification. It just makes life easier for your average user.
 
 ## Testing
 
 I decided to learn about cypress.io for testing and writing test for the application.
 The front-end testing was done in cypress.io, it allowed me to test my application automatically, and 
 it allowed me to record my tests using this command. 
 
 ```
 $  node_modules/.bin/cypress run --record --key { my_record_key } --spec "cypress/integration/path/to/file.js"

 ``` 
 
Tests for the front-end can be watched here.
 
  [TESTING.md](TESTING.md)
   
  I tested my website on 5in and 6in phones, 10in tablet 18in laptop and 22in desktop with good response from
  all of the devices.
  
   ## Version Control
   
   During development, I was creating a new branch for every new feature I wanted to create or update an existing feature.
   Once I was 100% sure that feature works, I would merge the master branch
   and then create a new branch again to create new features again.
   
   To create new branch I used these commands: 
   
   ```cl
   $ git checkout master
   $ git branch new-branch
   $ git checkout new-branch
   ```
   
> develop some code, add, commit, push, repeat...;-)

To merge the branch with the master I used these commands:
 ```cl
   $ git checkout master
   $ git merge new-branch
   $ git push origin master
   ```

   
   At the moment I left them in the repository. The branches at the moment are :
   
 
  - AUTH 
  >I created my own authorization logic to register and login new user, however I am planning to implement signing in with Google and/or Facebook
    to create faster and smoother access to the site
  - CHARTS
  >I am using charts.js library to display various charts on the site.
  - COUNTRY_PAGE
   
  - FEELIST
  - MAP
  >On landing page, when the world map is rendered, I am loading data from DB and applying different color according to country feel. 
  - SIGN_UP_MAP
  >Originally I was using openstreet map on sign up page, but I have replaced it with svg maps, for accurate data collection from every location.
  
  - USER_PAGE
  >For user page I created 2 different navigations, for mobile version I created sticky bottom navigation, for better user experience.
    User can preview his progress on the chart and can also see his favourites, his globe of users he's added into, his feelists and the posts
>in them,his own posts. He can delete any of the saved posts from globe, feelist, favourites, he can delete his feelist and he can update
>or delete his own posts.
  - TESTING
  >I wrote end-to-end tests in cypress.io, and also wrote python tests.
  - INTRO
  > On great suggestion from my mentor Aaron Sinnot I have created intros to landing page, 
    sign-up page, country page public user page and logged in user page for better user experience using intro.js  
  
  I did my best to name each commit in a way, that the development process is clear.
  ## Deployment
  
  At the start of development, I created GitHub repository and as I develop my app locally in PyCharm I created a folder on my local machine,
then I cd into that folder
  
  ```cl
   $ cd code/globtopus
   ```

  Then from within that folder, I initialized it by  
  
  ```cl
   $ git init
   ```

Then I created remote to GitHub 
  
  ```cl
   $ git remote add origin-g https://github.com/marcelkolarcik/globtopus.git
   ```

Then I created a Heroku app by creating an account on Heroku first and then clicking on a new button in the top right corner
and selecting create a new app. Then I selected the app name (globtopus) and region Europe. Then I downloaded and installed the Heroku CLI.
I set my environmental variables by clicking on settings in the top navigation and then on clicking on reveal config vars and I 
added my env variables like PORT, IP, SECRET_KEY, MONGO_URI 


I logged in using

 ```cl
   $ heroku login
   ```

Then I created remote to Heroku using and from within my app folder I run

```cl
  $ heroku git:remote -a origin-h
   ```

Then I created a virtual environment by 

```cl
  $ py -3 -m venv venv
   ```

The purpose of Python virtual environments is to create an isolated environment for Python projects. This means that each project can have its dependencies, regardless of what dependencies every other project has.
  
 Then I installed flask by 
 
  ```cl
  $ pip3 install Flask
   ```

Then I created requirements.txt by typing

 ```cl
  $ pip freeze --local >requirements.txt
   ```
So that Heroku knows what to install to run the app.


Then I created Procfile by 

```cl
  $ echo web:python app.py>Procfile
   ```

So that Heroku knows how to run my app.

To start dyno on Heroku I typed

```cl
  $ heroku ps:scale web=1 --app ( name of my app )
   ```

At the start of development, I open my pyCharm and in my terminal I type
  
  ```cl
      C:\Users\Marcel Kolarcik\code\globtopus>venv\Scripts\activate

   ```
And then in the virtual environment, I start flask by typing
  ```cl
      (venv) C:\Users\Marcel Kolarcik\code\globtopus>flask run

   ```

I am using flask Blueprint to organize my code. The basic concept of blueprints is that they record operations to execute when registered on an application. Flask associates view functions with blueprints when dispatching requests and generating URLs from one endpoint to another.
I've learned about blueprint at https://flask.palletsprojects.com/en/1.1.x/blueprints/.

To be able to connect to MongoDB I created an account on MongoDB and created a new cluster by clicking on
create a new cluster button selecting cloud provider AWS and region Ireland with a free tier.
Once created I copied the link to connect to MongoDB database by clicking on my project in the top left corner of navigation and then clicking
on the connect button in my sandbox. Then a popup will appear and I select Connect your application, I left driver (node.js) and version 3.0 as default, I
had node.js installed on my local machine already. And I copied the link to connect to DB from there. I changed the user name and password.

I also set Heroku to deploy from my GitHub repository. I first pushed my code to GitHub using GitHub remote, then I pushed code
to Heroku using Heroku remote and then in Heroku, I set the app to deploy from the master branch on GitHub, by clicking on deploy on Heroku app
and selecting deployment method as Github and by selecting repository I wanted to deploy from. And from this point Heroku would
automatically deploy my app whenever I push new code to my master branch.

Heroku will also allow me to deploy apps from any branch I have created, which is very useful before merging a branch into the master
to test it. I can do it by clicking on deploy in navigation and scrolling to the bottom of the page and selecting branch I want to deploy my app from.
 
Deploying to Heroku also allows me to test my application on multiple devices. 
  
 # Difficulties 
 
 I struggled for a while with a circular import problem in Python, when I was importing mongo from app
 at the top of the file. 
 
 ```python
from app import mongo
```

I found a solution to import it inside a function, and that resolved my problem

 ```python
def search():
    from app import mongo
```

I couldn't figure out how to get request data in python file when doing post ajax call using this code:

```js
$.ajax({
url:'/_url',
data:{data:data},
type:POST,
success: function(  response ) {
/*do staff...*/
  return
},
error: function(error) {
/*handle error...*/
  return
}
})
                
```
I could do POST requests without sending data from js.

```python
#  data = request.args.get('data', 0, type=str)
```
was not getting it, so I ended up doing GET ajax calls using this code
```js
$.getJSON('/_url',
{data:data},
function( response ){
/*do staff...*/
  return
}

)

```
 and when I was using this method, I was able to get data in python file with 
 
 ```python
#  data = request.args.get('data', 0, type=str)
```

One gotcha when rendering DOM elements with jQuery was, that even thou I had event listeners
for the classes that newly rendered elements had, they weren't interactive in any way.
So I've learned that when rendering new elements to DOM, event listeners must be applied
right after they are rendered to have interaction with them, otherwise they won't be interactive!


I couldn't figure out how to add variable in jinja templating language to filename in html,
```html
<img class="avatar" src="{{url_for('assets_dist_bp.static', filename=images/avatars/'+str(user['image_id'])+'.png')}}"/>
```
so i just created filename in python and passed it to view, and that was working.
```python
#filename = 'images/avatars/'+str(user['image_id'])+'.png'

```

```html
 <img class="avatar" src="{{url_for('assets_dist_bp.static', filename=filename)}}"/>
```



 
 
 
 
 
 
 
 
 
 # Future Features
 
 As for the near future, I would like to implement signing in with Google and Facebook, to allow users quick and easy
access to the site.

Allow users to upload their avatars.

Send a welcome email to every new user.

When the user is flagging a post, to require his reason for flagging it. 
  
  
  
  
 
   # Browser support
   
   Currently supporting
   
   - Firefox
   - Chrome
   - Opera 
   - Edge   
  
 

# Acknowledgements

Images used on the site were from 
<a href="https://www.freepik.com/free-photos-vectors/background"> www.freepik.com</a>


I have used 
<a href="https://stackoverflow.com" title="https://stackoverflow.com">https://stackoverflow.com</a>
,<a href="https://stackoverflow.com" title="developer.mozilla.org">https://developer.mozilla.org</a> 
<a href="https://w3.org" title="w3.org">https://w3.org</a> 
https://docs.mongodb.com/, https://realpython.com/, https://flask.palletsprojects.com/en/1.1.x/
 for learning new things and I have used some of the code suggestions form the sites in my project.
  All of which are commented on in comments.

 
 
 





 



