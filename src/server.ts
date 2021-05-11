import { askForMainPassword } from './utils/questions';
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
};
start();
