from flask import Blueprint, request, jsonify
from .models import db, ServiceProvider, User, Review
from geopy.distance import geodesic
from sqlalchemy import func

providers_bp = Blueprint('providers', __name__)

@providers_bp.route('', methods=['GET'])
def get_providers():
    lat = request.args.get('lat', type=float)
    lng = request.args.get('lng', type=float)
    max_distance = request.args.get('max_distance', 50, type=int)
    services = request.args.get('services', '')
    
    query = db.session.query(ServiceProvider, User, 
                             func.avg(Review.rating).label('avg_rating'),
                             func.count(Review.id).label('review_count')).\
        join(User, ServiceProvider.user_id == User.id).\
        outerjoin(Review, ServiceProvider.id == Review.provider_id).\
        group_by(ServiceProvider.id)
    
    if services:
        service_list = services.split(',')
        query = query.filter(ServiceProvider.services.like(f"%{service}%") for service in service_list)
    
    providers = query.all()
    
    result = []
    for provider, user, avg_rating, review_count in providers:
        provider_dict = provider_to_dict(provider, user, avg_rating, review_count)
        
        if lat and lng:
            user_location = (lat, lng)
            provider_location = (provider.latitude, provider.longitude)
            distance = geodesic(user_location, provider_location).miles
            
            if distance <= max_distance:
                provider_dict['distance'] = round(distance, 1)
                result.append(provider_dict)
        else:
            result.append(provider_dict)
    
    return jsonify(result)

def provider_to_dict(provider, user, avg_rating, review_count):
    return {
        "id": provider.id,
        "business_name": provider.business_name,
        "description": provider.description,
        "address": provider.address,
        "latitude": provider.latitude,
        "longitude": provider.longitude,
        "services": provider.services.split(',') if provider.services else [],
        "rating": round(avg_rating or 0, 1),
        "review_count": review_count,
        "owner": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    }

