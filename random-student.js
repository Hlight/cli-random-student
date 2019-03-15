
const fs = require('fs');
const gradient = require('gradient-string');
const CFonts = require('cfonts');


const isResetEnabled = process.argv[2] === 'reset';
const logFile = __dirname + '/random-student.log';

let students = [];

function init() {
  students = require('../students.js');
  readHistoryAndCall();
}

function readHistoryAndCall() {
  // Call history file.
  // Read history log on each run.
  fs.readFile(logFile, 'utf-8', (err, history) => {
    if (err) throw err;
    let student = call(history);
    // console.log();
      const clrs = [
        "black",
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
        // "blackBright",
        "redBright",
        "greenBright",
        "yellowBright",
        "blueBright",
        "magentaBright",
        "cyanBright",
        "whiteBright"
      ];
      CFonts.say(student, {
        colors: [clrs[Math.floor(Math.random() * clrs.length)]]
      });


  })
}

function getRandom() {
  return students[Math.floor(Math.random() * students.length)];
}

function call(history) {
  // Remove white-space then split lines into array.
  const called = history.trim().split('\n');
  // After all students have been called OR reset argument specified.
  if (students.length <= called.length || isResetEnabled) {
    called.length = 0;// remove all students from the called list.
    fs.writeFile(logFile, '', (err) => {
      if (err) throw err;
      console.log(gradient.instagram('All students called! Clearing called list!'));
    });
  }
  // Get random student.
  let student = getRandom();
  // Skip student if called already, while others haven't been called yet.
  while (called.includes(student) && students.length !== called.length) {
    console.log(gradient.mind(student + ' is included already!'))
    // Pick a new random student.
    student = getRandom();
  }

  fs.appendFile(logFile, '\n' + student, (err) => {
    if (err) throw err;
  });

  return student;
}

//-------------------------------------------------

init();
