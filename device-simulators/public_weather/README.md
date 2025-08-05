
# 🌤️ Public Weather IoT Simulator

This simulator pulls **live weather data** from [OpenWeatherMap](https://openweathermap.org/api) and publishes it to **AWS IoT Core** using MQTT over TLS, simulating a real IoT sensor device.

---

## 📁 Folder Structure

device-simulators/public_weather/
├── weather_to_iot.py # Main Python script
├── certificate.pem.crt # Device certificate from AWS IoT (🔒 Do NOT commit)
├── private.pem.key # Private key for device authentication (🔒 Do NOT commit)
├── AmazonRootCA1.pem # AWS root CA (safe to include)
└── README.md # This file


---

## 🧰 Prerequisites

- Python 3.7+
- AWS IoT Core endpoint and registered Thing
- Certificates and keys downloaded from AWS
- OpenWeatherMap API key (free account)

---

## 🔐 Required Certificate Files (do NOT upload to GitHub)

Place these files in this folder:

| File                 | Description                          |
|----------------------|--------------------------------------|
| `certificate.pem.crt`| Device certificate (download from AWS) |
| `private.pem.key`    | Private key for the device            |
| `AmazonRootCA1.pem`  | AWS IoT Root CA file (public)         |

> ⚠️ These files are sensitive. Add them to `.gitignore`.

---

## 🔑 OpenWeatherMap Setup

1. Sign up at https://openweathermap.org/api
2. Create an API key
3. Replace `"your_openweather_api_key"` in the script with your actual key

---

## 🚀 Running the Script

```bash
pip install paho-mqtt requests
python weather_to_iot.py
This script will:

Fetch weather data for the specified city

Publish temperature, humidity, and location as JSON to AWS IoT Core via MQTT

🧪 Sample Payload Sent

{
  "temperature": 72.5,
  "humidity": 63,
  "location": "Grand Rapids"
}
Topic: public/sensor/weather

⚙️ AWS IoT Setup Summary
Create Thing, Certificate, and Policy

Attach Policy to Certificate (allow iot:Connect, iot:Publish, etc.)

Use topic public/sensor/weather in AWS IoT Rule

Add Rule action (CloudWatch Logs, DynamoDB, Timestream, etc.)

🛡️ Security Notice
Never commit your certificate files or private keys. Make sure your .gitignore includes:

*.pem
*.crt
*.key
