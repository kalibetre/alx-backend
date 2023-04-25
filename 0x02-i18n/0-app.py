#!/usr/bin/env python3
"""A simple Flask app"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def welcome() -> str:
    """Renders a message"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
