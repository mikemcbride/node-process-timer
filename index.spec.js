'use strict'

const { test } = require('uvu')
const assert = require('uvu/assert')
const Timer = require('./index')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

test('processStart and processEnd default to null', async () => {
  const timer = new Timer()
  assert.is(timer.processStart === null, true)
  assert.is(timer.processEnd === null, true)
})

test('the timer will time a process', async () => {
  const timer = new Timer().start()
  assert.is(timer.processStart !== null, true)
  await sleep(50)
  timer.stop()

  assert.is(timer.processEnd !== null, true)
})

test('the timer returns a number of ms when diff is called', async () => {
  const timer = new Timer().start()
  await sleep(50)
  timer.stop()
  const diff = timer.diff
  assert.is(diff > 0, true)
})

test('the timer will return null if diff is called before timer is run', async () => {
  const timer = new Timer()
  assert.is(timer.diff, null)
  timer.start()
  assert.is(timer.diff, null)
  await sleep(50)
  timer.stop()
  assert.is(timer.diff === null, false)
})

test('the timer can be reused', async () => {
  const timer = new Timer().start()
  await sleep(50)
  timer.stop()
  assert.is(timer.diff > 0, true)

  // timer.start should reset the processEnd so we can reuse it
  timer.start()
  assert.is(timer.processEnd, null)
  await sleep(50)
  timer.stop()
  assert.is(timer.diff > 0, true)
})

test('the timer can handle intervals', async () => {
  const timer = new Timer().start()
  await sleep(50)
  timer.stop()
  const diff1 = timer.diff

  await sleep(50)
  timer.stop()
  const diff2 = timer.diff

  assert.is(diff2 > diff1, true)
})

test.run()
