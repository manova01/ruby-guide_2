from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, BlogPost, Comment, User

blog_bp = Blueprint('blog', __name__)

@blog_bp.route('', methods=['GET'])
def get_blog_posts():
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([post_to_dict(post, include_content=False) for post in posts])

@blog_bp.route('/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify(post_to_dict(post, include_comments=True))

@blog_bp.route('', methods=['POST'])
@jwt_required()
def create_blog_post():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.get_json()
    
    post = BlogPost(
        title=data['title'],
        content=data['content'],
        author_id=current_user_id
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify(post_to_dict(post)), 201

@blog_bp.route('/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(post_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    post = BlogPost.query.get_or_404(post_id)
    
    comment = Comment(
        content=data['content'],
        author_id=current_user_id,
        post_id=post_id
    )
    
    db.session.add(comment)
    db.session.commit()
    
    return jsonify(comment_to_dict(comment)), 201

def post_to_dict(post, include_content=True, include_comments=False):
    post_dict = {
        "id": post.id,
        "title": post.title,
        "author": {
            "id": post.author.id,
            "first_name": post.author.first_name,
            "last_name": post.author.last_name
        },
        "created_at": post.created_at.isoformat(),
        "comment_count": len(post.comments)
    }
    
    if include_content:
        post_dict["content"] = post.content
    
    if include_comments:
        post_dict["comments"] = [comment_to_dict(comment) for comment in post.comments]
    
    return post_dict

def comment_to_dict(comment):
    return {
        "id": comment.id,
        "content": comment.content,
        "author": {
            "id": comment.author.id,
            "first_name": comment.author.first_name,
            "last_name": comment.author.last_name
        },
        "created_at": comment.created_at.isoformat()
    }

