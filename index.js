'use strict'
const process = require('process')
const NS_PER_SEC = 1e9
const MS_PER_NS = 1e6

module.exports = class ProcessTimer {
  constructor() {
    this.processStart = null
    this.processEnd = null
  }

  start() {
    this.processStart = process.hrtime()

    // allow reusing the same instance for multiple timers
    this.processEnd = null

    // allow this pattern: const timer = new Timer().start()
    return this
  }

  stop() {
    if (this.processStart !== null) {
      this.processEnd = process.hrtime(this.processStart)
    }
  }

  // returns the diff of processStart and processEnd in milliseconds
  get diff() {
    if (this.processStart === null || this.processEnd === null) {
      return null
    }

    return (this.processEnd[0] * NS_PER_SEC + this.processEnd[1]) / MS_PER_NS
  }
}
