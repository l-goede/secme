const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question('What is your password?', (password: string) => {
  readline.question('What do you want to do', (command: string) => {
    console.log(`You like to ${command}this password:${password}`);
    readline.close();
  });
});
