import jwt
import datetime
from flask import request, jsonify, current_app
from functools import wraps

# Dummy credentials (replace with DB or env-based auth later)
USER_DATA = {
    "device123": "password123"
}

def generate_token(username):
    token = jwt.encode({
        'sub': username,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")
    return token

def verify_user(username, password):
    return USER_DATA.get(username) == password

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith("Bearer "):
            return jsonify({'message': 'Token is missing or invalid'}), 401
        try:
            decoded = jwt.decode(
                token.split(" ")[1],
                current_app.config['SECRET_KEY'],
                algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(decoded, *args, **kwargs)
    return decorated
