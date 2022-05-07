// import postgres from 'postgres';
// import 'dotenv/config';
// import sql from './models/postgres';
// const db = require('./db/models');
import db from './models';
import { users } from './seeders/users';

// Connect to postgres database
db.sequelize.sync()
.then(console.log('Postgres database connected.'))
.then(() => createUsers()) // Add mock data to the database. Remove for production.
.catch((err: any) => console.error('Unable to connect to the database.', err));

// Mock data
const createUsers = () => {
  users.map(user => {
    db.User.create(user);
  });
}

/*
const databasePath = String(process.env.DATABASE_URL);
const sql = postgres(databasePath);

export default sql;
*/