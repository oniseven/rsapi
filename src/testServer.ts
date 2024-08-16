import path from 'path';
import dotenv from 'dotenv';
import supertest from 'supertest';
import { createApp, connectDatabases } from './index';
import dbBilling from "./middlewares/dbcons/dbBilling";
import dbAntrean from "./middlewares/dbcons/dbAntrean";
import dbSDM from "./middlewares/dbcons/dbSDM";
import config from './configs';

// Load .env.development file
dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

const app = createApp();

export const request = supertest(app);

export const setupTestDatabase = async () => {
  await connectDatabases();
  // Add any additional setup for test database if needed
};

export const closeTestDatabase = async () => {
  await dbBilling.close();
  // await dbAntrean.close();
  // await dbSDM.close();
};