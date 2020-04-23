import os
from flask import Flask, render_template, redirect, request, url_for, request

"""testing"""
app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html",
                           )
@app.route('/user')
def user():
    return render_template("user.html",
                           )


@app.route('/admin')
def admin():
    return render_template('admin.html',
                          )

@app.route('/sign_in')
def sign_in():
    return render_template('sign_in.html',
                          )

@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html',
                          )



"""it should work"""
if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
