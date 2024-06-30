// install   npm install pg

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'school_management',
    password: 'admin',
    port: 5432,
});


module.exports = pool;
