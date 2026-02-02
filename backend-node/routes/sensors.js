const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:bedroomId', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM sensors WHERE bedroom_id=$1',
    [req.params.bedroomId]
  );
  res.json(result.rows);
});

// router.post('/', async (req, res) => {
//   const { bedroom_id, sensor_name, sensor_type } = req.body;
//   await db.query(
//     'INSERT INTO sensors(bedroom_id, sensor_name, sensor_type) VALUES($1,$2,$3)',
//     [bedroom_id, sensor_name, sensor_type]
//   );
//   res.sendStatus(201);
// });
router.post('/', async (req, res) => {
  const { bedroom_id, sensor_name, sensor_type } = req.body;

  const result = await db.query(
    'INSERT INTO sensors(bedroom_id, sensor_name, sensor_type) VALUES($1,$2,$3) RETURNING *',
    [bedroom_id, sensor_name, sensor_type]
  );

  res.status(201).json({
    message: 'Sensor created successfully',
    data: result.rows[0]
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const sensorId = req.params.id;

    const result = await db.query(
      'DELETE FROM sensors WHERE id=$1 RETURNING *',
      [sensorId]
    );

    if (result.rowCount === 0) {
      // No sensor found with this id
      return res.status(404).json({ message: 'Sensor not found' });
    }

    // Deleted successfully
    res.status(200).json({
      message: 'Sensor deleted successfully',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
