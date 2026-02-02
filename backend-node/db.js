const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smart_apartment',
  password: 'remember it',
  port: 5432
});

module.exports = pool;
