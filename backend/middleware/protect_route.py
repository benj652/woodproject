from functools import wraps
from flask import session, jsonify

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check if user_id exists in session
        if 'user_id' not in session:
            return jsonify({'error': 'unauthorized, no session'}), 401
        return f(*args, **kwargs)
    return decorated_function