// install   npm install pg

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Abdo@2024',
    database: 'school_management',
});

module.exports = pool.promise();




// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'school_management',
//     password: 'admin',
//     port: 5432,
// });


// module.exports = pool;
