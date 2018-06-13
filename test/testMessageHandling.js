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
  describe('TAP Message Handling', () => {
    it('TAP without message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -i -R tap mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[6].should.equal('# pass 2')
        lines[7].should.equal('# fail 1')
        done()
      })
    }).timeout(10 * timeout) // 10 min

    it('TAP with message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -R tap mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[2].should.match(/^# Unexpected Message.*/)
        lines[7].should.equal('# pass 1')
        lines[8].should.equal('# fail 2')
        done()
      })
    }).timeout(10 * timeout) // 10 min
  })
  describe('Spec Message Handling', () => {
    it('Spec without message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -i -R spec mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[6].should.match(/.*\[1;32m2 passing.*/)
        lines[7].should.match(/.*\[0;31m1 failing.*/)
        done()
      })
    }).timeout(10 * timeout) // 10 min

    it('Spec with message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -R spec mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[10].should.match(/^.*Unexpected Message.*/)
        lines[6].should.match(/.*\[1;32m1 passing.*/)
        lines[7].should.match(/.*\[0;31m2 failing.*/)
        done()
      })
    }).timeout(10 * timeout) // 10 min
  })
  describe('JUnit Message Handling', () => {
    it('JUnit without message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -i -R junit mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[4].should.equal('    failures=\'1\'>')
        done()
      })
    }).timeout(10 * timeout) // 10 min

    it('JUnit with message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -R junit mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[15].should.match(/^.*Unexpected Message.*/)
        lines[4].should.equal('    failures=\'2\'>')
        done()
      })
    }).timeout(10 * timeout) // 10 min
  })
  describe('JSON Message Handling', () => {
    it('JSON without message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -i -R json mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[5].should.equal('\t\t"passes":2,')
        lines[6].should.equal('\t\t"failures":1')
        done()
      })
    }).timeout(10 * timeout) // 10 min

    it('JSON with message checking should have the correct failures and success', done => {
      exec('./mathematica-test-runner -R json mathematicaTests/testWithMessages/', (error, stdout, stderr) => {
        if (error) throw error
        const lines = stdout.split('\n')
        lines[19].should.match(/^.*expectedMsg.*/)
        lines[5].should.equal('\t\t"passes":1,')
        lines[6].should.equal('\t\t"failures":2')
        done()
      })
    }).timeout(10 * timeout) // 10 min
  })
})
