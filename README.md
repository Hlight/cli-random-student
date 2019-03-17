# class-call-random-student
Calls a random student from the list while ensuring all students get called.

From within the `bootcamp-random-student` directory:

```shell
# Default
node random-student.js
```

Or, from anywhere using a shell alias:

Put this in your `~/.profile` file otherwise this alias won't be loaded for future terminals. _(create this file not already present)_

```shell
# Ensure the path below is the actual path where you cloned it to.
alias callRandom='node ~/bootcamp-random-student/random-student.js'
```

Second alias for in-class quickness:

```shell
alias p="callRandom --clearOnCall --align right --font random"
```

## How it works

Script keeps track of history using the `random-student.log` file.
Once all students have been called the history is cleared and the process starts over.


## Defaults

- `--font=block`
- `--colors=random`
- `--background=transparent`
- `--align=center`

<img src="ss.png" />

## Align

- `--align=<left|center|right>`

<img src="ss-align.png" />

## Font

- `--font=3d`

<img src="ss-font.png" />

- `--font=random`

<img src="ss-font-random.png" />

## Help

- `--help` display list of color, font, background, align options.

<img src="ss-help.png" />
