#!/usr/bin/env python3
"""A simple Flask app"""
from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """A Config app class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = LANGUAGES[0]
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/')
def welcome() -> str:
    """Renders a message"""
    return render_template('4-index.html')


@babel.localeselector
def get_locale():
    """Get locale from request"""
    lang = request.args.get('locale')
    if lang in Config.LANGUAGES:
        return lang
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run()
