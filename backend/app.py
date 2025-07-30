from flask import Flask, request, jsonify
from flask_cors import CORS
from auth import generate_token, verify_user, token_required

app = Flask(__name__)
CORS(app)

# Secret key for JWT
app.config['SECRET_KEY'] = 'super-secret-key'  # Replace with environment variable in production

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not verify_user(username, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = generate_token(username)
    return jsonify({'token': token})
    
@app.route('/device/config')
@token_required
def device_config(decoded):
    config = {
        "device_id": decoded['sub'],
        "sampling_rate": "10s",
        "message": "Config fetched successfully 🎉"
    }
    return jsonify(config)


@app.route('/device/data', methods=['POST'])
@token_required
def receive_data(user_payload):
    data = request.get_json()
    return jsonify({'message': 'Data received', 'from': user_payload['sub'], 'payload': data})

@app.route('/')
def health():
    return "IoT Simulation Backend Running"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    
    from flask import jsonify
from auth import token_required



