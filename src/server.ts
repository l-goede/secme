import { readCredentials, writeCredentials } from './utils/credentials';
import dotenv from 'dotenv';

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
console.log(process.env.MONGO_URL);

// "While" solution
const start = async () => {
  // await connectDatabase(databaseURI);

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
        writeCredentials(newCredential, mainPassword);
        console.log('New Credential is added.');
      }
      break;
  }
};

start();
