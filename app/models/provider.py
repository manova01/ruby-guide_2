from app import db, ma
from datetime import datetime

class ServiceProvider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    business_name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    services = db.Column(db.Text)
    location = db.Column(db.String(120))
    rating = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_name': self.business_name,
            'description': self.description,
            'services': self.services,
            'location': self.location,
            'rating': self.rating,
            'created_at': self.created_at.isoformat()
        }

class ServiceProviderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ServiceProvider
        load_instance = True
        include_fk = True
