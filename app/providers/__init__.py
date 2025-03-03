from flask import Blueprint

bp = Blueprint('providers', __name__)

from . import routes
