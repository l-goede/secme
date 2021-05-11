import { askForMainPassword, chooseCommand } from './utils/questions';
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

const command = await chooseCommand();
switch (command) {
  case 'list':
    console.log('List Case');
    break;
  case 'add':
    console.log('Add Case');
    break;
}
