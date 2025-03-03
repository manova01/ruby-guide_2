from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Review, ServiceProvider
from app import db
from . import api

@api.route('/providers/<int:provider_id>/reviews', methods=['GET'])
def get_provider_reviews(provider_id):
    provider = ServiceProvider.query.get_or_404(provider_id)
    reviews = Review.query.filter_by(provider_id=provider.id).order_by(Review.created_at.desc()).all()
    return jsonify([review.to_dict() for review in reviews])

@api.route('/providers/<int:provider_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(provider_id):
    current_user_id = get_jwt_identity()
    provider = ServiceProvider.query.get_or_404(provider_id)
    data = request.get_json()
    
    # Check if user has already reviewed this provider
    existing_review = Review.query.filter_by(
        user_id=current_user_id,
        provider_id=provider.id
    ).first()
    
    if existing_review:
        return jsonify({'error': 'You have already reviewed this provider'}), 400
    
    review = Review(
        user_id=current_user_id,
        provider_id=provider.id,
        rating=data['rating'],
        content=data.get('content')
    )
    
    # Update provider's rating
    provider.review_count += 1
    provider.rating = (provider.rating * (provider.review_count - 1) + review.rating) / provider.review_count
    
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@api.route('/reviews/<int:id>', methods=['PUT'])
@jwt_required()
def update_review(id):
    current_user_id = get_jwt_identity()
    review = Review.query.get_or_404(id)
    
    if review.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    old_rating = review.rating
    
    if 'rating' in data:
        review.rating = data['rating']
    if 'content' in data:
        review.content = data['content']
    
    # Update provider's rating
    provider = review.provider
    provider.rating = (provider.rating * provider.review_count - old_rating + review.rating) / provider.review_count
    
    db.session.commit()
    return jsonify(review.to_dict())

@api.route('/reviews/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    current_user_id = get_jwt_identity()
    review = Review.query.get_or_404(id)
    
    if review.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Update provider's rating
    provider = review.provider
    if provider.review_count > 1:
        provider.rating = (provider.rating * provider.review_count - review.rating) / (provider.review_count - 1)
    else:
        provider.rating = 0
    provider.review_count -= 1
    
    db.session.delete(review)
    db.session.commit()
    return '', 204
