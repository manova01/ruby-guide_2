from marshmallow import fields, validates, ValidationError
from flask_marshmallow import Marshmallow
from flask_marshmallow.sqla import auto_field

ma = Marshmallow()

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'phone', 'first_name', 'last_name', 'role', 'created_at')
    
    id = auto_field()
    email = fields.Email()
    phone = fields.String()
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    role = fields.String()
    created_at = fields.DateTime(dump_only=True)

class ServiceProviderSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'business_name', 'description', 'address', 
                 'latitude', 'longitude', 'services', 'rating', 'review_count', 
                 'created_at', 'user')
    
    id = auto_field()
    user = fields.Nested(UserSchema)
    services = fields.List(fields.String())
    rating = fields.Float()
    review_count = fields.Integer()
    
    @validates('latitude')
    def validate_latitude(self, value):
        if not -90 <= value <= 90:
            raise ValidationError('Invalid latitude value')

    @validates('longitude')
    def validate_longitude(self, value):
        if not -180 <= value <= 180:
            raise ValidationError('Invalid longitude value')

class MessageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'sender_id', 'receiver_id', 'content', 'read', 
                 'read_at', 'created_at', 'sender', 'receiver')
    
    sender = fields.Nested(UserSchema)
    receiver = fields.Nested(UserSchema)
    read_at = fields.DateTime(allow_none=True)

class BlogPostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content', 'author_id', 'slug', 'status',
                 'view_count', 'created_at', 'updated_at', 'author', 'comments')
    
    author = fields.Nested(UserSchema)
    comments = fields.Nested('CommentSchema', many=True)

class CommentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'author_id', 'post_id', 'parent_id',
                 'created_at', 'updated_at', 'author', 'replies')
    
    author = fields.Nested(UserSchema)
    replies = fields.Nested('CommentSchema', many=True)

class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'provider_id', 'customer_id', 'rating', 'content',
                 'created_at', 'updated_at', 'customer')
    
    customer = fields.Nested(UserSchema)
    
    @validates('rating')
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise ValidationError('Rating must be between 1 and 5')

# Initialize schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)
provider_schema = ServiceProviderSchema()
providers_schema = ServiceProviderSchema(many=True)
message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)
blog_post_schema = BlogPostSchema()
blog_posts_schema = BlogPostSchema(many=True)
comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)
