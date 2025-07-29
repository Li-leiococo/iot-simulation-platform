# IoT Simulation Platform 

A secure, full-stack simulation platform built with **Flask** (backend) and **React** (frontend), designed to emulate IoT device communication using **JWT-based authentication**. This platform demonstrates common security pitfalls like XSS and insecure token storage, along with mitigation strategies.

---

## Tech Stack

- **Frontend**: React (simulates virtual IoT devices)
- **Backend**: Flask + PyJWT (auth & API services)
- **Database**: SQLite or PostgreSQL (users, devices, tokens)
- **Security**: JWT, short TTLs, secure cookies
- **Containerization**: Docker + Docker Compose (optional)

---

## Features

- JWT authentication with short TTL and token revocation
- Simulated device login and telemetry submission
- Vulnerability demos: XSS, token replay, insecure storage
- Secure practices: `HttpOnly` cookies, audit logging
- Test cases to compare secure vs insecure flows

---

## Project Structure

```
iot-simulation-platform/
├── backend/         # Flask API (auth, protected routes)
├── frontend/        # React app (device simulator UI)
├── nginx/           # Reverse proxy config (optional)
├── docker-compose.yml
├── README.md
```

---

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js + npm
- (Optional) Docker & Docker Compose

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## Screenshots

> Coming soon — UI screenshots and API flow diagrams

---

## Educational Outcomes

This project helps you:
- Understand token-based security in IoT and web apps
- Analyze common JWT attack surfaces
- Build secure authentication patterns using modern tools
- Bridge frontend/backend interaction in an IoT-like simulation

---

## License

MIT License
