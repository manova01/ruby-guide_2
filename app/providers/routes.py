from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.providers import bp
from app.models import ServiceProvider, provider_schema, providers_schema, User
from app import db

@bp.route('/providers', methods=['GET'])
def get_providers():
    providers = ServiceProvider.query.all()
    return jsonify(providers_schema.dump(providers)), 200

@bp.route('/providers', methods=['POST'])
@jwt_required()
def create_provider():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    
    if user.provider_profile:
        return jsonify({'error': 'Provider profile already exists'}), 400
        
    data = request.get_json()
    provider = ServiceProvider(
        user_id=user_id,
        business_name=data['business_name'],
        description=data.get('description'),
        services=data.get('services'),
        location=data.get('location')
    )
    
    db.session.add(provider)
    user.is_provider = True
    db.session.commit()
    
    return jsonify(provider_schema.dump(provider)), 201

@bp.route('/providers/<int:id>', methods=['GET'])
def get_provider(id):
    provider = ServiceProvider.query.get_or_404(id)
    return jsonify(provider_schema.dump(provider)), 200

@bp.route('/providers/<int:id>', methods=['PUT'])
@jwt_required()
def update_provider(id):
    user_id = get_jwt_identity()
    provider = ServiceProvider.query.get_or_404(id)
    
    if provider.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
        
    data = request.get_json()
    provider.business_name = data.get('business_name', provider.business_name)
    provider.description = data.get('description', provider.description)
    provider.services = data.get('services', provider.services)
    provider.location = data.get('location', provider.location)
    
    db.session.commit()
    return jsonify(provider_schema.dump(provider)), 200
