from flask import Flask, request, jsonify
from flask_cors import CORS
from auth import generate_token, verify_user, token_required
import boto3
from boto3.dynamodb.conditions import Key

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

    from flask import jsonify
from auth import token_required

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
table = dynamodb.Table('weather_data')

@app.route('/api/weather/latest', methods=['GET'])
def get_latest_weather():
    device_id = request.args.get('device_id', 'public-weather')

    try:
        response = table.query(
            KeyConditionExpression=Key('device_id').eq(device_id),
            ScanIndexForward=False,  # Descending by timestamp
            Limit=1
        )

        items = response.get('Items', [])
        if not items:
            return jsonify({'error': 'No data found'}), 404

        return jsonify(items[0])

    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
@app.route('/')
def health():
    return "IoT Simulation Backend Running"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    





