import dotenv from 'dotenv';
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import {
  deleteCredential,
  selectCredential,
  writeCredential,
} from './utils/credentials';
import CryptoJS from 'crypto-js';
import { connectDatabase, disconnectDatabase } from './utils/database';

dotenv.config();

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error('Missing env MONGO_URL');
  }

  await connectDatabase(process.env.MONGO_URL);

  let mainPassword = await askForMainPassword();
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid!');
    mainPassword = await askForMainPassword();
  }
  console.log('Is valid!');

  const command = await chooseCommand();

  switch (command) {
    case 'list':
    case 'delete':
      {
        const selectedCredential = await selectCredential();
        if (command === 'list') {
          selectedCredential.password = CryptoJS.AES.decrypt(
            selectedCredential.password,
            mainPassword
          ).toString(CryptoJS.enc.Utf8);
          console.log(selectedCredential);
        } else {
          const deleteSuccessful = await deleteCredential(
            selectedCredential.service
          );
          if (deleteSuccessful) {
            console.log(`${selectedCredential.service} was deleted`);
          } else {
            console.log(`${selectedCredential.service} delete failed`);
          }
        }
      }
      break;
    case 'add':
      {
        const newCredential = await askForCredential();
        await writeCredential(mainPassword, newCredential);
        console.log('new credential added');
      }

      break;
  }
  await disconnectDatabase();
};
start();
