# class-call-random-student
Calls a random student from the list while ensuring all students get called.

From within the `bootcamp-random-student` directory:

```shell
node random-student.js
```

Or, from anywhere using a shell alias:

```shell
# Ensure the path below is the actual path where you cloned it to.
alias callRandom='node ~/bootcamp-random-student/random-student.js'
```

## How it works

Script keeps track of history using the `random-student.log` file.
Once all students have been called the history is cleared and the process starts over.


## Preview

<img src="ss.png" />