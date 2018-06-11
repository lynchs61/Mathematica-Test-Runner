/**
 * Created by slynch on 10/13/17.
 */

/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
const should = require('should')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

let version = require(path.join(__dirname, '../package.json')).version
const timeout = 60000

describe('Mathematica-Test-Runner', () => {
  it('should handle no args', done => {
    exec('./mathematica-test-runner', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('Must specify a target file or directory')
      done()
    })
  }).timeout(timeout)

  it('should handle bogus args', done => {
    exec('./mathematica-test-runner -f --foo -b --bar', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('Invalid option \'--foo\'')
      done()
    })
  }).timeout(timeout)

  it('should print out the help text from --help', done => {
    let helpPath = path.join(__dirname, './assets/help.txt')
    const helpText = fs.readFileSync(helpPath, 'utf8')
    exec('./mathematica-test-runner --help', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(helpText)
      done()
    })
  }).timeout(timeout)

  it('should print out the help text from -h', done => {
    let helpPath = path.join(__dirname, './assets/help.txt')
    const helpText = fs.readFileSync(helpPath, 'utf8')
    exec('./mathematica-test-runner -h', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(helpText)
      done()
    })
  }).timeout(timeout)

  it('should print out the version from --version', done => {
    exec('./mathematica-test-runner --version', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(`Version: ${version}\n`)
      done()
    })
  }).timeout(timeout)

  it('should print out the version from -V', done => {
    exec('./mathematica-test-runner -V', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(`Version: ${version}\n`)
      done()
    })
  }).timeout(timeout)

  it('should handle invalid reporter', done => {
    exec('./mathematica-test-runner -R bogus', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('\'bogus\' is not a valid reporter. Please choose from {spec, tap, json, mathematica, junit}')
      done()
    })
  }).timeout(timeout)
})
