from flask import request, jsonify, session
from models import User
from uuid import uuid4
from db import database
from utils import bcrypt

def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    password_check = request.json['password_check']
    if password!=password_check:
        return jsonify({
            'error':'passwords do not match'
        }), 400
    if username==None or email == None or password == None:
        return jsonify({
            'error':'missing required feild(s)'
            }),400
    username_exists = User.query.filter_by(username=username).first() is not None
    if username_exists:
        return jsonify({'error':'username already taken'}), 409
    email_exists = User.query.filter_by(email=email).first() is not None
    if email_exists:
        return jsonify({'error':'email already registered'}), 409
    hashed_password=bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    database.session.add(new_user)
    database.session.commit()
    session['user_id'] = new_user.id
    return jsonify({
        'id':new_user.id,
        'username':new_user.username,
        'email':new_user.email
    })


def login():
    email = request.json['email']
    password = request.json['password']
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'user does not exist'}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'incorrect password'}), 401
    
    session['user_id']=user.id
    return jsonify({
        'id':user.id,
        'username':user.username,
        'email':user.email
    })


def logout():
    session.pop('user_id')
    return '200'
