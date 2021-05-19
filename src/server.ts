import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase } from './utils/database';
import { readCredentials, writeCredential } from './utils/credentials';

// Check if connection to databse exists
if (process.env.MONGO_URL === undefined) {
  throw new Error('Missing env MONGO_URL');
}

const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/credentials', async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.post('/api/credentials', async (request, response) => {
  const credentials = await request.body;
  writeCredential(credentials);
  response.json(request.body);
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`secme listening at http://localhost:${port}`);
  });
});
