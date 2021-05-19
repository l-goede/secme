import type { Credential } from '../types';
import CryptoJS from 'crypto-js';
import { getCredentialsCollection } from './database';
import { chooseService } from './questions';

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection()
    .find({})
    .collation({ locale: 'en' })
    .sort({ service: 1 })
    .toArray();
};

export const writeCredential = async (
  mainPassword: string,
  newCredential: Credential
): Promise<void> => {
  newCredential.password = CryptoJS.AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();
  await getCredentialsCollection().insertOne(newCredential);
};

export const deleteCredential = async (service: string): Promise<boolean> => {
  const result = await getCredentialsCollection().deleteOne({
    service: service,
  });
  if (result.deletedCount === undefined) {
    return false;
  }
  return result.deletedCount > 0;
};

export const selectCredential = async (): Promise<Credential> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );
  const service = await chooseService(credentialServices);
  const selectedCredential = credentials.find(
    (credential) => credential.service === service
  );
  if (!selectedCredential) {
    throw new Error('Cannot find credential');
  }
  return selectedCredential;
};
