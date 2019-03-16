
const fs = require('fs');
const gradient = require('gradient-string');
const CFonts = require('cfonts');

const isResetEnabled = process.argv[2] === 'reset';
const logFile = __dirname + '/random-student.log';

// students gets re-assigned to studentsAll on reset.
let students = require('./students.js');
const studentsAll = [...students];

/**
 * Read history log file, remove those students from avail students list.
 * Then call, or reset history first.
 */
function readHistoryAndCall() {
  // Read history log on each run.
  fs.readFile(logFile, 'utf-8', (err, history) => {
    if (err) throw err;
    const called = history.trim().split('\n');
    // Removed called students from available students list.
    for (let i = 0; i < called.length; i++) {
      let calledStudent = called[i];
      students.forEach((stu, index) => {
        if (calledStudent === stu) {
          students.splice(index, 1);
        }
      });
    }
    
    // console.log(students);

    // After all students have been called OR reset argument specified.
    if (students.length === 0 || isResetEnabled) {
      reset(callRandom);
    } else {
      callRandom();
    }

  });

}
/**
 * Call random student from available students list.
 * Using CFonts to output fancy text.
 */
function callRandom() {
  const student = students[Math.floor(Math.random() * students.length)];
  fs.appendFile(logFile, '\n' + student, (err) => {
    if (err) throw err;
    // console.log('appendFile: ' + student)
  });
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
}
/**
 * Reset students array to original list
 */
function reset(cb) {
  fs.writeFile(logFile, '', (err) => {
    if (err) throw err;
    console.log(gradient.instagram('All students called! Clearing called log!'));
    students = studentsAll;
    if (cb) cb();
  });
}


//-------------------------------------------------

readHistoryAndCall();
