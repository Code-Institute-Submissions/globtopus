from flask import Flask
app = Flask(__name__)

"""testing"""
@app.route('/')
def hello_world():
    return 'Hello, World!'