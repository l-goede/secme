import { printPassword } from './utils/messages';
import {
  addNewCredential,
  askForMainPassword,
  chooseCommand,
  chooseService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';

// const mainPassword = await askForMainPassword();
// if (!isMainPasswordValid(mainPassword)) {
//   console.log('Is invalid');
//   start();
// } else {
//   console.log('Is valid');
// }
// start();

const start = async () => {
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
        const service = await chooseService(['Github', 'Google', 'Codewars']);
        printPassword(service);
      }
      break;
    case 'add':
      {
        const newCredential = await addNewCredential();
        console.log(newCredential);
      }
      break;
  }
};

start();
