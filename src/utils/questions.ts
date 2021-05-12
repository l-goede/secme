import inquirer from 'inquirer';
import { Command } from '../types';
export const askForMainPassword = async (): Promise<string> => {
  const answers = await inquirer.prompt<{ mainPassword: string }>([
    {
      type: 'password',
      name: 'mainPassword',
      message: 'Enter main password',
    },
  ]);
  return answers.mainPassword;
};

export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: 'list',
    name: 'command',
    message: 'What do you want to do?',
    choices: [
      { name: 'List all credentials', value: 'list' },
      { name: 'Add new credential', value: 'add' },
    ],
  });
  return answers.command;
};

// export const askForNewCredential = async (): Promise<string> => {
//   const newCredential = await inquirer.prompt<{ service: string }>([
//     {
//       type: 'expand',
//       name: 'credential',
//       message: 'Enter credential',
//     },
//     {
//       type: 'expand',
//       name: 'username',
//       message: 'Enter username',
//     },
//     {
//       type: 'password',
//       name: 'password',
//       message: 'Enter password',
//     },
//   ]);
//   return newCredential.service;
// };

// export const listCredentialServices = async (): Promise<string> => {
//     const listCredential = await inquirer.prompt<{ list: string }>({
//       type:list
//       name: 'credentials',
//       choices: [
//         { name: 'GitHub, value: 'github'},
//         { name: 'Google', value: 'google },
//         {name:"Yahoo", value:"yahoo"}
//       ],
//     });
//     return listCredential.command;
//   };
