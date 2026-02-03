const express = require('express');
const cors = require('cors');

const bedroomRoutes = require('./routes/bedrooms');
const sensorRoutes = require('./routes/sensors');
require('./simulator');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('REQUEST RECEIVED:', req.method, req.url);
  next();
});

app.use('/api/bedrooms', bedroomRoutes);
app.use('/api/sensors', sensorRoutes);

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
