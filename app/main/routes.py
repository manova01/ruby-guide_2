from flask import jsonify
from app.main import bp

@bp.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to the API'})
