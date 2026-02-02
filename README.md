IoT Simulation & Monitoring System Dashboard

Overview:

  A full-stack IoT project simulating a smart 2-bedroom apartment with temperature and humidity sensors. The system includes:

- Angular v18+ frontend – CRUD operations & dashboard
- Node.js backend – Sensor simulation & API
- PostgreSQL database – Sensor data storage
-Grafana v12 OSS – Real-time & historical dashboards

Features
- CRUD for Bedrooms and Sensors
- Configurable data simulation (temperature: 22.5–35°C, humidity: 30–70%)
- Real-time dashboard with Grafana
- Historical reporting (daily min, max, average per sensor/room)

Setup
1. Database
CREATE DATABASE smart_apartment;

CREATE TABLE sensor_logs (
  id SERIAL PRIMARY KEY,
  room_name VARCHAR(50),
  sensor_name VARCHAR(50),
  timestamp TIMESTAMPTZ,
  value NUMERIC(5,2)
);


2.Update database credentials in backend/db.js:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=remember it
DB_NAME=smart_apartment

3. Backend
cd backend
npm install
npm run start


Runs on http://localhost:3000.

4. Frontend
cd frontend
npm install
ng serve


Runs on http://localhost:4200.

5. Grafana

Install Grafana v12 OSS

Add PostgreSQL as data source

Import grafana/dashboard.json for real-time & historical views

Notes
Supports multiple bedrooms & multiple sensors per bedroom
Simulation interval configurable in backend
