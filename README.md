# Coding Assignment – IoT Simulation & Monitoring System

##  Project Title
**Smart Apartment IoT Simulation & Monitoring**

---

##  Problem Statement

This project implements a **simulation and monitoring system** for a smart 2-bedroom apartment.
Each bedroom can have **one or multiple temperature and humidity sensors**.  
The system allows users to configure rooms and sensors, simulate IoT data, store it in a database,
and visualize real-time and historical insights using Grafana.

---

##  Objectives Covered

### 1. Angular (v18+) – CRUD Features
- CRUD operations for **Bedrooms**
- CRUD operations for **Sensors** (after selecting a Bedroom)
- Simulation model uses **master data** (Bedrooms & Sensors created by user)
- Supports:
  - One or multiple rooms
  - Multiple sensors per room
  - Sensors with same or different values at the same time

---

### 2. Data Simulation & Storage (Node.js)
- Simulates sensor data using **Node.js**
- Supported sensor types:
  - 🌡 Temperature: **22.5°C – 35.0°C**
  - 💧 Humidity: **30% – 70%**
- Data generated every **1 minute** (configurable)
- Data stored in **PostgreSQL**

---

### 3. Dashboard & Reporting (Grafana v12 OSS)
- PostgreSQL used as Grafana data source
- Real-time dashboard:
  - All bedrooms
  - Individual bedroom view
- Historical reports:
  - Sensor-wise trends
  - Bedroom-wise filtering
  - Daily average, min, max temperature per room

---



