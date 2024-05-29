" use strict";

const {Client} = require('pg');
const { getDatabaseUri} = require('./config');

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
      // host : '/var/run/postgresql',
      // database: getDatabaseUri(),
        connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  } else {
    db = new Client({
      // host : '/var/run/postgresql',
      // database: getDatabaseUri()
        connectionString : process.env.DATABASE_URL,
    });
  }
  
  db.connect();

module.exports = db;
