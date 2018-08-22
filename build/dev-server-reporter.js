const chalk = require('chalk');
const readline = require('readline');
/* eslint-disable */
const log = console.log;
const info = msg => log(chalk.bgBlueBright.bold.black(msg));
const warn = msg => log(chalk.bgYellowBright.bold.black(msg));
const error = msg => log(chalk.bgRedBright.bold.black(msg));

/* eslint-enable */
function clearConsole() {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }
}

module.exports = function reporter(middlewareOptions, options) {
  const { state, stats } = options;

  if (state) {
    clearConsole();
    log();
    log();

    if (stats.hasErrors()) {
      error('  Compile failed  ');
      log();
      return;
    } if (stats.hasWarnings()) {
      warn('  Compiled with warnings  ');
      log();
      return;
    }
    info('  Compiled successfully  ');
    log();
  } else {
    info('  Compiling...  ');
  }
};
