from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import ServiceProvider, User, UserRole
from app import db
from . import api

@api.route('/providers', methods=['GET'])
def get_providers():
    providers = ServiceProvider.query.all()
    return jsonify([provider.to_dict() for provider in providers])

@api.route('/providers/<int:id>', methods=['GET'])
def get_provider(id):
    provider = ServiceProvider.query.get_or_404(id)
    return jsonify(provider.to_dict())

@api.route('/providers', methods=['POST'])
@jwt_required()
def create_provider():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    if user.role != UserRole.PROVIDER:
        return jsonify({'error': 'Only providers can create a provider profile'}), 403
    
    data = request.get_json()
    provider = ServiceProvider(
        user_id=current_user_id,
        business_name=data['business_name'],
        description=data.get('description'),
        address=data['address'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        services=data.get('services', [])
    )
    
    db.session.add(provider)
    db.session.commit()
    return jsonify(provider.to_dict()), 201

@api.route('/providers/<int:id>', methods=['PUT'])
@jwt_required()
def update_provider(id):
    current_user_id = get_jwt_identity()
    provider = ServiceProvider.query.get_or_404(id)
    
    if provider.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    if 'business_name' in data:
        provider.business_name = data['business_name']
    if 'description' in data:
        provider.description = data['description']
    if 'address' in data:
        provider.address = data['address']
    if 'latitude' in data:
        provider.latitude = data['latitude']
    if 'longitude' in data:
        provider.longitude = data['longitude']
    if 'services' in data:
        provider.services = data['services']
    
    db.session.commit()
    return jsonify(provider.to_dict())

@api.route('/providers/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_provider(id):
    current_user_id = get_jwt_identity()
    provider = ServiceProvider.query.get_or_404(id)
    
    if provider.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(provider)
    db.session.commit()
    return '', 204

@api.route('/providers/search', methods=['GET'])
def search_providers():
    lat = float(request.args.get('lat', 0))
    lon = float(request.args.get('lon', 0))
    radius = float(request.args.get('radius', 10))  # km
    service = request.args.get('service')
    
    # Basic filtering for now - in production, use PostGIS or similar for proper geo queries
    providers = ServiceProvider.query.all()
    results = []
    
    for provider in providers:
        # Calculate distance using Haversine formula (implement this)
        # Filter by service if specified
        if service and service not in provider.services:
            continue
        results.append(provider.to_dict())
    
    return jsonify(results)
