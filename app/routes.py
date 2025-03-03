from flask import Blueprint, render_template, send_from_directory, jsonify
from datetime import datetime
import os

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

@main.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@main.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory('uploads', filename)
