import { readCredentials, writeCredentials } from './utils/credentials';
import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from './utils/database';

import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
  chooseService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import CryptoJS from 'crypto-js';

// Further possibly version
// const mainPassword = await askForMainPassword();
// if (!isMainPasswordValid(mainPassword)) {
//   console.log('Is invalid');
//   start();
// } else {
//   console.log('Is valid');
// }
// start();
dotenv.config();

// "While" solution
const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error('Missing env MONGO URL');
  }
  await connectDatabase(process.env.MONGO_URL);

  let mainPassword = await askForMainPassword();
  while (!isMainPasswordValid(mainPassword)) {
    console.log('Is invalid');
    mainPassword = await askForMainPassword();
  }
  console.log('Is valid');

  const command = await chooseCommand();
  switch (command) {
    case 'list':
      {
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.service
        );
        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.service === service
        );
        if (selectedService !== undefined) {
          selectedService.password = CryptoJS.AES.decrypt(
            selectedService.password,
            mainPassword
          ).toString(CryptoJS.enc.Utf8);
          console.log(selectedService);
        }
      }
      break;
    case 'add':
      {
        const newCredential = await askForCredential();
        await writeCredentials(newCredential, mainPassword);
        console.log('New Credential is added.');
      }
      break;
  }
  await disconnectDatabase();
};

start();
