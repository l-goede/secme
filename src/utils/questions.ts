import inquirer from 'inquirer';
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
