const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM bedrooms');
  res.json(result.rows);
});

// router.post('/', async (req, res) => {
//   const { name } = req.body;
//   await db.query('INSERT INTO bedrooms(name) VALUES($1)', [name]);
//   res.sendStatus(201);
// });
router.post('/', async (req, res) => {
  const { name } = req.body;

  await db.query(
    'INSERT INTO bedrooms(name) VALUES($1)',
    [name]
  );

  res.status(201).json({
    message: 'Bedroom created successfully'
  });
});


// router.delete('/:id', async (req, res) => {
//   await db.query('DELETE FROM bedrooms WHERE id=$1', [req.params.id]);
//   res.sendStatus(200);
// });

router.delete('/:id', async (req, res) => {
  await db.query(
    'DELETE FROM bedrooms WHERE id=$1',
    [req.params.id]
  );

  res.status(200).json({
    message: 'Bedroom deleted successfully'
  });
});

router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ message: 'Bedroom name is required' });
  }

  try {
    const result = await db.query(
      'UPDATE bedrooms SET name=$1 WHERE id=$2 RETURNING *',
      [name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Bedroom not found' });
    }

    res.json({
      message: 'Bedroom updated successfully',
      bedroom: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update bedroom' });
  }
});


module.exports = router;
