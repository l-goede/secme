import fs from 'fs/promises';
import type { Credential } from '../types';
import CryptoJS from 'crypto-js';
import { getCollection } from './database';

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile('./db.json', 'utf-8');
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const writeCredentials = async (
  newCredential: Credential,
  mainPassword: string
): Promise<void> => {
  // const oldCredential: Credential[] = await readCredentials();
  newCredential.password = CryptoJS.AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();

  await getCollection('credentials').insertOne(newCredential);
};
