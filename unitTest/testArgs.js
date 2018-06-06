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

describe('Mathematica-Test-Runner', () => {
  it('should handle no args', done => {
    exec('./mathematica-test-runner', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('Must specify a target file or directory')
      done()
    })
  })

  it('should handle bogus args', done => {
    exec('./mathematica-test-runner -f --foo -b --bar', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('Invalid option \'-f\'')
      done()
    })
  })

  it('should print out the help text from --help', done => {
    let helpPath = path.join(__dirname, './assets/help.txt')
    const helpText = fs.readFileSync(helpPath, 'utf8')
    exec('./mathematica-test-runner --help', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(helpText)
      done()
    })
  })

  it('should print out the help text from -h', done => {
    let helpPath = path.join(__dirname, './assets/help.txt')
    const helpText = fs.readFileSync(helpPath, 'utf8')
    exec('./mathematica-test-runner -h', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(helpText)
      done()
    })
  })

  it('should print out the version from --version', done => {
    exec('./mathematica-test-runner --version', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(`Version: ${version}\n`)
      done()
    })
  })

  it('should print out the version from -V', done => {
    exec('./mathematica-test-runner -V', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal(`Version: ${version}\n`)
      done()
    })
  })

  it('should handle invalid reporter', done => {
    exec('./mathematica-test-runner -R bogus', (error, stdout, stderr) => {
      if (error) throw error
      stdout.split('\n')[0].should.equal('\'bogus\' is not a valid reporter. Please choose from {spec, tap, json, mathematica, junit}')
      done()
    })
  })

  it('should handle output to a file', done => {
    exec('./mathematica-test-runner -R junit -o ./junit_tmp/test.xml test', (error, stdout, stderr) => {
      if (error) throw error
      stdout.should.equal('')
      fs.stat(path.join(__dirname, '../junit_tmp/test.xml'), (err, stat) => {
        should.not.exist(err)
        done()
      })
    })
  })

  // This needs work to make it ... work. Needs a regex match because the time changes but that's a complicate multiline
  // regex
  // it('should produce the correct Spec output', done => {
  //   const specText = fs.readFileSync(path.join(__dirname, './assets/expectedSpec.txt'), 'utf8')
  //   const specMatch = new RegExp(specText)
  //   exec('./mathematica-test-runner test', (error, stdout, stderr) => {
  //     if (error) throw error
  //     stdout.should.match(specMatch)
  //     done()
  //   })
  // }).timeout(10000)
})
