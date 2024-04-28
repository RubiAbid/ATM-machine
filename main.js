#!/usr/bin/env node
// Importing the 'inquirer' package for user interaction
import inquirer from "inquirer";
// Initializing the account balance and PIN
let myBalance = 100000;
let myPin = 2411;
// Displaying a welcome message
console.log("WELCOME TO THE ATM MACHINE");
// Asking the user to enter their PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Please Enter Your 4-digit Pin Code: ",
    },
]);
// Checking if the entered PIN matches the saved PIN
if (pinAnswer.pin === myPin) {
    console.log("Correct Pin Code!!!");
    // Asking the user to select an operation (Withdraw or CheckBalance)
    let operationsAns = await inquirer.prompt([
        {
            name: "operations",
            message: "Select an option",
            type: "list",
            choices: ["Withdraw", "CheckBalance"],
        },
    ]);
    // If the user selects 'Withdraw'
    if (operationsAns.operations === "Withdraw") {
        // Asking the user to select a withdrawal amount
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "list",
                message: "Please select the withdrawal Amount",
                choices: ["1000", "2000", "5000", "10000", "Other Amount"],
            },
        ]);
        // If the user selects 'Other Amount'
        if (amountAns.amount === "Other Amount") {
            // Asking the user to enter a custom withdrawal amount
            let customAmountAnswer = await inquirer.prompt([
                {
                    name: "customAmount",
                    type: "number",
                    message: "Enter the withdrawal amount:",
                },
            ]);
            let customAmount = customAmountAnswer.customAmount;
            // Checking if the custom withdrawal amount is valid
            if (customAmount <= myBalance) {
                // Deducting the custom withdrawal amount from the balance
                myBalance -= customAmount;
                console.log(`Withdrawal Successful. Your remaining balance is: ${myBalance}`);
                console.log("Thank you for banking with us ");
            }
            else {
                console.log("Insufficient balance. Please try again.");
            }
        }
        else {
            // If the user selects a predefined withdrawal amount
            if (amountAns.amount <= myBalance) {
                // Deducting the selected withdrawal amount from the balance
                myBalance -= amountAns.amount;
                console.log(`Withdrawal Successful. Your remaining balance is: ${myBalance}`);
                console.log("Thank you for banking with us ");
            }
            else {
                console.log("Insufficient Amount");
            }
        }
    }
    else if (operationsAns.operations === "CheckBalance") {
        // If the user selects 'CheckBalance', displaying the current balance
        console.log(`Your current balance is: ${myBalance}`);
    }
}
else {
    // If the entered PIN is incorrect
    console.log("INCORRECT PIN");
    console.log("TRY AGAIN");
}
