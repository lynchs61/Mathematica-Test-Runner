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
const timeout = 10000

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
      stdout.split('\n')[0].should.equal('Invalid option \'-f\'')
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
  //
  // it('should handle output to a file', done => {
  //   exec('./mathematica-test-runner -R junit -o ./junit_tmp/test.xml test', (error, stdout, stderr) => {
  //     if (error) throw error
  //     stdout.should.equal('')
  //     fs.stat(path.join(__dirname, '../junit_tmp/test.xml'), (err, stat) => {
  //       should.not.exist(err)
  //       done()
  //     })
  //   })
  // })

  it('should produce the correct Spec output', done => {
    const g = '\\[1;32m'
    const r = '\\[0;31m'
    const gr = '\\[0;37m'
    const d = '\\[1;0m'
    /* eslint-disable no-useless-escape */
    const specMatchString = `\\s+Test Report: test1\.mt\
\\s+.${g}. .${gr}test1-1.${d}\
\\s+.${g}. .${gr}test1-2.${d}\
\\s+Test Report: test2\.mt\
\\s+.${r}. None.${d}\
\\s+.${g}. .${gr}None.${d}\
\\s+.${g}3 passing.${d}.${gr} \\(\\d+ms\\)\
\\s+.${r}1 failing.${d}\
\\s+Test Report: test2\.mt\
\\s+None\
\\s+.${r}Verification Error: expected 2 to equal 3.${d}\
\\s+.${g}\\+ expected .${r}- actual\
\\s+- 3.${g}\
\\s+- 2.${d}`

    const specMatchRegex = new RegExp(specMatchString)
    exec('./mathematica-test-runner test', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.match(specMatchRegex)
      done()
    })
  }).timeout(timeout)
})
