from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import BlogPost, Comment, User
from app import db
from . import api

@api.route('/blog/posts', methods=['GET'])
def get_posts():
    posts = BlogPost.query.filter_by(status='published').order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@api.route('/blog/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = BlogPost.query.get_or_404(id)
    if post.status != 'published':
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict())

@api.route('/blog/posts', methods=['POST'])
@jwt_required()
def create_post():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    post = BlogPost(
        title=data['title'],
        content=data['content'],
        author_id=current_user_id,
        slug=data['slug'],
        status=data.get('status', 'draft')
    )
    
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@api.route('/blog/posts/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    current_user_id = get_jwt_identity()
    post = BlogPost.query.get_or_404(id)
    
    if post.author_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    if 'title' in data:
        post.title = data['title']
    if 'content' in data:
        post.content = data['content']
    if 'slug' in data:
        post.slug = data['slug']
    if 'status' in data:
        post.status = data['status']
    
    db.session.commit()
    return jsonify(post.to_dict())

@api.route('/blog/posts/<int:id>/comments', methods=['GET'])
def get_post_comments(id):
    post = BlogPost.query.get_or_404(id)
    return jsonify([comment.to_dict() for comment in post.comments])

@api.route('/blog/posts/<int:id>/comments', methods=['POST'])
@jwt_required()
def create_comment(id):
    current_user_id = get_jwt_identity()
    post = BlogPost.query.get_or_404(id)
    data = request.get_json()
    
    comment = Comment(
        content=data['content'],
        author_id=current_user_id,
        post_id=post.id,
        parent_id=data.get('parent_id')
    )
    
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201
