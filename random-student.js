
const fs = require('fs');
const gradient = require('gradient-string');
const CFonts = require('cfonts');
const argv = require('minimist')(process.argv.slice(2));

const isHelpEnabled = (argv.help);
const isResetEnabled = (argv.reset);
const isInitialEnabled = (argv.initial || !argv.fullname);
const logFile = __dirname + '/random-student.log';

// print extra console.logs
const isVerbose = (argv.v || argv.verbose);

// cfonts configuration arrays:

const fonts = [
  "block",
  "shade",
  "chrome",
  "simple",
  "simpleBlock",
  "3d",
  "simple3d",
  "huge"//,
  // "console"
];
const clrs = [
  "system",
  // "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright"
];
const bkgClrs = [
  "transparent",
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "blackBright",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright"
];

if (isHelpEnabled) {
  console.log('Available Options:')
  console.log('--font random|<font>')
  console.table(fonts)
  console.log('--colors random|<color>')
  console.table(clrs)
  console.log('--background random|<bkg_color>')
  console.table(bkgClrs)
  console.log('--align <left|center|right>')
  return;
}

// students gets re-assigned to studentsAll on reset.
let students = (argv.studentsFile) ? 
  require(argv.studentsFile) : 
  require('./students.js');
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
    
    if (isVerbose) console.table(students);

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
  let student = students[Math.floor(Math.random() * students.length)];
  fs.appendFile(logFile, '\n' + student, (err) => {
    if (err) throw err;
    // console.log('appendFile: ' + student)
  });
  if (isInitialEnabled) {
    // Match firstname + last initial
    student = student.match(/\w+\s+[A-Z]/).toString();
  }
  
  let randomColor = clrs[Math.floor(Math.random() * clrs.length)];
  let cfontsOpts = { align: 'left', colors: [randomColor] };
  
  if (argv.colors) {
    cfontsOpts.colors =  (argv.colors === 'random') ?
      [randomColor] :
      argv.colors.split(',');
  }
  if (argv.font) {// default block
    cfontsOpts.font = (argv.font === 'random') ?
      fonts[Math.floor(Math.random() * fonts.length)] : 
      argv.font;
  }
  if (argv.align) {
    cfontsOpts.align = argv.align;
  }
  if (argv.background) {
    if (argv.background === 'random') {
      bkgClrs.forEach(function(color, index) {
        if (new RegExp(cfontsOpts.colors.join('|')).test(color)) {
          if (isVerbose) {
            console.log('filtering out color ' + color + ' because font is ' + cfontsOpts.colors.toString())
          }
          bkgClrs.splice(index, 1);
        }
      })
    }
    cfontsOpts.background = (argv.background === 'random') ?
      bkgClrs[Math.floor(Math.random() * bkgClrs.length)] :
      argv.background;
  }
  CFonts.say(student, cfontsOpts);
  // debug
  if (isVerbose) console.table(cfontsOpts);
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
