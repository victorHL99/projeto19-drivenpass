import chalk from 'chalk';
import app from './app.js';
var port = +process.env.PORT || 9000;
app.listen(port, function () {
    console.log('');
    console.log(chalk.green.bold("Server is up and running on port ".concat(port)));
    console.log(chalk.yellow.bold("Mode: ".concat(process.env.MODE || 'not defined -> DEV')));
    console.log(chalk.yellow("Verbose: ".concat(process.env.VERBOSE || 'false')));
    console.log('---------------------------------------');
});
