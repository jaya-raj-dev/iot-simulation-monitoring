CREATE TABLE bedrooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE sensors (
  id SERIAL PRIMARY KEY,
  bedroom_id INT REFERENCES bedrooms(id) ON DELETE CASCADE,
  sensor_name VARCHAR(50),
  sensor_type VARCHAR(20)
);

CREATE TABLE sensor_logs (
  id SERIAL PRIMARY KEY,
  bedroom_name VARCHAR(50),
  sensor_name VARCHAR(50),
  sensor_type VARCHAR(20),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  value NUMERIC(5,2)
);
