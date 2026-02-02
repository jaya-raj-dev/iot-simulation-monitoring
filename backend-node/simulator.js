const cron = require('node-cron');
const db = require('./db');

function randomTemp() {
  return (22 + Math.random() * 13).toFixed(2);
}

function randomHumidity() {
  return (30 + Math.random() * 40).toFixed(2);
}

cron.schedule('* * * * *', async () => {
  const sensors = await db.query(`
    SELECT s.sensor_name, s.sensor_type, b.name AS room
    FROM sensors s
    JOIN bedrooms b ON b.id = s.bedroom_id
  `);

  for (const s of sensors.rows) {
    const value =
      s.sensor_type === 'temperature'
        ? randomTemp()
        : randomHumidity();

    await db.query(
      `INSERT INTO sensor_logs(room_name, sensor_name, sensor_type, value)
       VALUES($1,$2,$3,$4)`,
      [s.room, s.sensor_name, s.sensor_type, value]
    );
  }

  console.log('Sensor data simulated');
});
