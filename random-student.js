
const fs = require('fs');
const gradient = require('gradient-string');
const isResetEnabled = process.argv[2] === 'reset';

const students = [
  "Andrew Rice",
  "Catherine Pham",
  "Auri Robbins-Phillips",
  "Benjamin Vaagen",
  "Bryan Kelley",
  "Delbert Hall",
  "Derek Ericson",
  "Gabriel Teotonio",
  "Joonwoo Choi",
  "Joshua Manuel",
  "Julie Mathews",
  "Justin Graffeo",
  "Kelsey Beffel",
  "Lacey Gibbons",
  "Lisa Leslie",
  "Mario Rodriguez",
  "Naomi Woodruff",
  "Nicole White",
  "Peter Staker",
  "Shannon Line",
  "Sonja Rasmussen",
  "Stefan Apreutesei",
  "Tad Ochwat",
  "Tammy Lee",
  "Thomas Sulich",
  "Ethan Mo",
  "Yin Lee"
];

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
  // If student has been called and not all students have been called yet.
  while (called.includes(student) && students.length !== called.length) {
    // Skip the student because they've been called already.
    console.log(gradient.mind(student + ' is included already!'))
    // Pick a new random student.
    student = getRandom();
  }
  // called.push(student);
  fs.appendFile(logFile, '\n' + student, (err) => {
    return called;
  });

  return student;
}

// Call history file.
const logFile = __dirname + '/random-student.log';
// Read history log on each run.
fs.readFile(logFile, 'utf-8', (err, history) => {
  console.log(call(history));
})



