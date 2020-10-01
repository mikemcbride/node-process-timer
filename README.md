# node-process-timer

A utility for timing processes in Node.js. It is based entirely on Node's [`process.hrtime`](https://nodejs.org/api/process.html#process_process_hrtime_time) and has no dependencies.

## Motivation

Sometimes it's pretty helpful to be able to measure how long processes are taking to execute in your applications so you can identify bugs or bottlenecks. This utility makes it pretty easy to do that.

## Installation

```
npm install --save nodejs-process-timer
```

## Usage

```js
const Timer = require('nodejs-process-timer')

const timer = new Timer()
timer.start()
// alternatively, you can do const timer = new Timer().start()

// do some stuff that you want to measure...
await doSomeOperation()

// stop the timer
timer.stop()

// get the diff
console.log(`Diff in ms is ${timer.diff}`)
```

### Reusing the timer

You can reuse the timer instance you create. Calling `.start()` will reset the times, so if you need to compute multiple times on something you can do that:

```js
const Timer = require('nodejs-process-timer')

// first operation
const timer = new Timer().start()
await someOperation()
timer.stop()
console.log(timer.diff)

// do another, using the same instance. it will clear out your properties
timer.start()
await anotherOperation()
timer.stop()
console.log(timer.diff)
```

### Intervals

You can also use the timer to compute intervals on a process if you need to know how long each piece takes from the beginning of the operation:

```js
const Timer = require('nodejs-process-timer')
const timer = new Timer()

// start of the operation
timer.start()

await firstThingToDo()

timer.stop()
console.log(`First segment took ${timer.diff} ms`)

await soSomeMoreStuff()
timer.stop()
console.log(`Second segment finished after ${timer.diff} ms`)

await doFinalStuff()
timer.stop()
console.log(`Full operation took ${timer.diff} ms`)

return
```
