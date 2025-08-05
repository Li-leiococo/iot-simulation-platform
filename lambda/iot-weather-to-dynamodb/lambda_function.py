import boto3
import json
from datetime import datetime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('weather_data')

def lambda_handler(event, context):
    try:
        # Handle stringified JSON payload
        payload = event.get('payload', event)
        if isinstance(payload, str):
            data = json.loads(payload)
        else:
            data = payload

        device_id = data.get('device_id', 'public-weather')
        timestamp = data.get('timestamp') or datetime.utcnow().isoformat()

        # ✅ Convert to Decimal
        temperature = Decimal(str(data.get('temperature', 0)))
        humidity = Decimal(str(data.get('humidity', 0)))

        location = data.get('location', 'unknown')
        condition = data.get('condition', 'N/A')

        item = {
            'device_id': device_id,
            'timestamp': timestamp,
            'temperature': temperature,
            'humidity': humidity,
            'location': location,
            'condition': condition
        }

        table.put_item(Item=item)
        print("✅ Weather data written:", item)
        return {"statusCode": 200, "body": "Success"}

    except Exception as e:
        print("❌ Error:", str(e))
        return {"statusCode": 500, "body": str(e)}

