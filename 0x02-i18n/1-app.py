#!/usr/bin/env python3
"""A simple Flask app"""
from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """A Config app class"""
    LANGUAGES = ["en", "fr"]
    DEFAULT_TZ = "UTC"


app.config['BABEL_DEFAULT_LOCALE'] = Config.LANGUAGES[0]
app.config['BABEL_DEFAULT_TIMEZONE'] = Config.DEFAULT_TZ


@app.route('/')
def welcome() -> str:
    """Renders a message"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
