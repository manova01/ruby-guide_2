from .user import User, UserSchema
from .provider import ServiceProvider, ServiceProviderSchema
from .message import Message, MessageSchema
from .blog import BlogPost, Comment
from .review import Review

# Initialize schemas
user_schema = UserSchema()
users_schema = UserSchema(many=True)
provider_schema = ServiceProviderSchema()
providers_schema = ServiceProviderSchema(many=True)
message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

__all__ = ['User', 'ServiceProvider', 'Message', 'BlogPost', 'Comment', 'Review', 
           'UserSchema', 'ServiceProviderSchema', 'MessageSchema', 
           'user_schema', 'users_schema', 'provider_schema', 'providers_schema', 
           'message_schema', 'messages_schema']
