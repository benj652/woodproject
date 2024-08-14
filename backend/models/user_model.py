from db import database
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class User(database.Model):
    __tablename__ = "users"
    id = database.Column(database.String(32), primary_key=True, unique=True, default=get_uuid)
    email = database.Column(database.String(345), unique=True, nullable=False)
    password = database.Column(database.Text, nullable=False)
    username = database.Column(database.String(80), unique=True, nullable=False)