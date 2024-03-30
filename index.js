import chalk from "chalk";
import inquirer from "inquirer";
async function mainMenu() {
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
            'Login',
            'Exit',
        ],
    });
    switch (option) {
        case 'Login':
            await login();
            break;
        case 'Exit':
            console.log(chalk.green('Thank you for using the ATM.'));
            process.exit(0);
    }
}
async function login() {
    const { accountNumber, pin } = await inquirer.prompt([
        {
            type: 'number',
            name: 'accountNumber',
            message: 'Enter account number:',
        },
        {
            type: 'password',
            name: 'pin',
            message: 'Enter PIN:',
        },
    ]);
    // Validate credentials (replace with your validation logic)
    if (accountNumber === 12345 && pin === '1234') { // Pin should be compared as a string
        await accountMenu({ accountNumber, pin, balance: 5000 });
    }
    else {
        console.log(chalk.red('Invalid account number or PIN.'));
        await login(); // Retry on failure
    }
}
async function accountMenu(currentAccount) {
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
            'Withdraw cash',
            'Fast cash',
            'Deposit cash',
            'Check balance',
            'Logout',
        ],
    });
    if (option === 'Withdraw cash') {
        await withdrawCash(currentAccount);
    }
    else if (option === 'Fast cash') {
        await fastCash(currentAccount);
    }
    else if (option === 'Deposit cash') {
        await depositCash(currentAccount);
    }
    else if (option === 'Check balance') {
        checkBalance(currentAccount);
    }
    else if (option === 'Logout') {
        mainMenu();
    }
}
async function fastCash(currentAccount) {
    const { amount } = await inquirer.prompt([{
            type: 'list',
            name: 'amount',
            message: 'Select a withdrawal method:',
            choices: [50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
        }]);
    if (amount <= currentAccount.balance) {
        currentAccount.balance -= amount;
        console.log(chalk.green(`Withdraw dollar. ${amount}$`));
        console.log(chalk.blue(`Current account balance. ${currentAccount.balance}$`));
    }
    else {
        console.log(chalk.red('Insufficient funds.'));
    }
    await accountMenu(currentAccount);
}
async function depositCash(currentAccount) {
    const { amount } = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter amount to deposit:',
    });
    // Update account balance (replace with your data model logic)
    currentAccount.balance += amount;
    console.log(chalk.green(`Deposited dollar. ${amount}$`));
    await accountMenu(currentAccount);
}
function checkBalance(currentAccount) {
    console.log(chalk.blue(`Your balance is: dollar. ${currentAccount.balance}$`));
    accountMenu(currentAccount);
}
async function withdrawCash(currentAccount) {
    const { amount } = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter amount to withdraw:',
    });
    // Update account balance (logic based on your data model)
    if (amount <= currentAccount.balance) {
        currentAccount.balance -= amount;
        console.log(chalk.green(`Withdraw dollar. ${amount}$`));
    }
    else {
        console.log(chalk.red('Insufficient funds.'));
    }
    await accountMenu(currentAccount);
}
// Start the program
mainMenu();
