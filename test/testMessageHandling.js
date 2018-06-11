/**
 * Created by slynch on 6/11/18.
 */

/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
const should = require('should')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const timeout = 60000

describe('Mathematica-Test-Runner', () => {
  describe('Message Handling', () => {
    it('should fail for now', () => {
      throw new Error('Failing for now')
    })
  })
})
