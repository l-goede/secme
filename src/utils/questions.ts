import inquirer from 'inquirer';
import { Command, Credential } from '../types';

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

export const chooseService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>({
    type: 'list',
    name: 'service',
    message: 'Please choose service',
    choices: services,
  });
  return answers.service;
};

export const askForCredential = async (): Promise<Credential> => {
  const answers = await inquirer.prompt<Credential>([
    {
      type: 'input',
      name: 'credential',
      message: 'Enter new credential',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter username',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password',
    },
  ]);
  return answers;
};
