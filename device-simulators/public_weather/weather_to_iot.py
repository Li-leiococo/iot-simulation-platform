import ssl
import json
import time
import requests
from paho.mqtt import client as mqtt

# -------- AWS IoT Core MQTT settings --------
MQTT_ENDPOINT = "a1o47tv9kzynea-ats.iot.us-east-1.amazonaws.com"  # replace with your AWS IoT endpoint
MQTT_PORT = 8883
MQTT_TOPIC = "public/sensor/weather"
CLIENT_ID = "public-weather-sensor"

# -------- Certificate files (from AWS IoT) --------
CA_FILE = "AmazonRootCA1.pem"
CERT_FILE = "certificate.pem.crt"
KEY_FILE = "private.pem.key"

# -------- Public Weather API settings (or mock) --------
OPENWEATHER_API_KEY = "808124d15cf1ebbecb15d2e342d34bd7"  # Optional
CITY = "Grand Rapids"
API_URL = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={OPENWEATHER_API_KEY}&units=imperial"

# -------- Function to get weather data --------
def fetch_weather():
    try:
        response = requests.get(API_URL)
        data = response.json()
        return {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "location": CITY
        }
    except Exception as e:
        print("Failed to fetch weather data:", e)
        return {
            "temperature": 70.0,
            "humidity": 50,
            "location": CITY
        }

# -------- Callback functions --------
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

def on_publish(client, userdata, mid):
    print("Message published")

# -------- MQTT Setup --------
client = mqtt.Client(client_id=CLIENT_ID)
client.tls_set(ca_certs=CA_FILE,
               certfile=CERT_FILE,
               keyfile=KEY_FILE,
               tls_version=ssl.PROTOCOL_TLSv1_2)
client.on_connect = on_connect
client.on_publish = on_publish

client.connect(MQTT_ENDPOINT, MQTT_PORT)
client.loop_start()

# -------- Publish Loop --------
try:
    while True:
        payload = fetch_weather()
        json_payload = json.dumps(payload)
        print("Publishing:", json_payload)
        client.publish(MQTT_TOPIC, json_payload, qos=1)
        time.sleep(30)
except KeyboardInterrupt:
    print("Stopped.")
    client.loop_stop()
    client.disconnect()

