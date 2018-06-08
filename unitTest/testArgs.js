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

  describe('Spec Reporter', () => {
    const g = '\\[1;32m'
    const r = '\\[0;31m'
    const gr = '\\[0;37m'
    const d = '\\[1;0m'
    /* eslint-disable no-useless-escape */
    const specMatchString = `\\s+Test Report: test1\.mt\\n\
\\s+.${g}(?:.|\\\\\\[Checkmark\\]) .${gr}test1-1.${d}\\n\
\\s+.${g}(?:.|\\\\\\[Checkmark\\]) .${gr}test1-2.${d}\\n\
\\s+Test Report: test2\.mt\\n\
\\s+.${r}. None.${d}\\n\
\\s+.${g}(?:.|\\\\\\[Checkmark\\]) .${gr}None.${d}\\n\
\\s+.${g}3 passing.${d}.${gr} \\(\\d+ms\\)\\n\
\\s+.${r}1 failing.${d}\\n\
\\s+Test Report: test2\.mt\\n\
\\s+None\\n\
\\s+.${r}Verification Error: expected 2 to equal 3.${d}\\n\
\\s+.${g}\\+ expected .${r}- actual\\n\
\\s+- 3.${g}\\n\
\\s+- 2.${d}`

    const specMatchRegex = new RegExp(specMatchString)
    it('should produce the correct Spec output to stdout', done => {
      exec('./mathematica-test-runner test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.match(specMatchRegex)
        done()
      })
    }).timeout(timeout)

    it('should produce the correct Spec output to a file', done => {
      exec('./mathematica-test-runner -o ./junit_tmp/test.txt test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.equal('')
        const filePath = path.join(__dirname, '../junit_tmp/test.txt')
        fs.stat(filePath, (err, stat) => {
          should.not.exist(err)
          fs.readFile(filePath, 'utf8', (err, data) => {
            data.should.match(specMatchRegex)
            done()
          })
        })
      })
    }).timeout(timeout)
  })

  describe('Tap Reporter', () => {
    const expected = `1..4
ok 1 Test Report: test1.mt test1-1
ok 2 Test Report: test1.mt test1-2
not ok 3 Test Report: test2.mt None
# Verification Error: expected 2 to equal 3
ok 4 Test Report: test2.mt None
# tests 4
# pass 3
# fail 1
# skip 0
`

    it('should produce the correct Tap output to stdout', done => {
      exec('./mathematica-test-runner -R tap test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.equal(expected)
        done()
      })
    }).timeout(timeout)

    it('should produce the correct Tap output to a file', done => {
      exec('./mathematica-test-runner -R tap -o ./junit_tmp/test.tap test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.equal('')
        const filePath = path.join(__dirname, '../junit_tmp/test.tap')
        fs.stat(filePath, (err, stat) => {
          should.not.exist(err)
          fs.readFile(filePath, 'utf8', (err, data) => {
            data.should.equal(expected)
            done()
          })
        })
      })
    }).timeout(timeout)
  })

  describe('JSON Reporter', () => {
    const float = '[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?'
    const JSONMatchString = `{
\\s+"stats":{\
\\s+"files":2,\
\\s+"duration":${float},\
\\s+"tests":4,\
\\s+"passes":3,\
\\s+"failures":1\
\\s+},\
\\s+"tests":\\[\
\\s+{\
\\s+"filetitle":"Test Report: test1.mt",\
\\s+"title":"test1-1",\
\\s+"fullTitle":"Test Report: test1.mt - test1-1",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+},\
\\s+{\
\\s+"filetitle":"Test Report: test1.mt",\
\\s+"title":"test1-2",\
\\s+"fullTitle":"Test Report: test1.mt - test1-2",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+},\
\\s+{\
\\s+"filetitle":"Test Report: test2.mt",\
\\s+"title":"None",\
\\s+"fullTitle":"Test Report: test2.mt - None",\
\\s+"duration":${float},\
\\s+"status":"Failure",\
\\s+"err":{\
\\s+"expected":"expected 2 to equal 3",\
\\s+"expectedValue":"2",\
\\s+"actualValue":"3",\
\\s+"expectedMessages":"expected {} to equal {}"\
\\s+}\
\\s+},\
\\s+{\
\\s+"filetitle":"Test Report: test2.mt",\
\\s+"title":"None",\
\\s+"fullTitle":"Test Report: test2.mt - None",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+}\
\\s+\\],\
\\s+"passes":\\[\
\\s+{\
\\s+"filetitle":"Test Report: test1.mt",\
\\s+"title":"test1-1",\
\\s+"fullTitle":"Test Report: test1.mt - test1-1",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+},\
\\s+{\
\\s+"filetitle":"Test Report: test1.mt",\
\\s+"title":"test1-2",\
\\s+"fullTitle":"Test Report: test1.mt - test1-2",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+},\
\\s+{\
\\s+"filetitle":"Test Report: test2.mt",\
\\s+"title":"None",\
\\s+"fullTitle":"Test Report: test2.mt - None",\
\\s+"duration":${float},\
\\s+"status":"Success",\
\\s+"err":{}\
\\s+}\
\\s+\\],\
\\s+"failures":\\[\
\\s+{\
\\s+"filetitle":"Test Report: test2.mt",\
\\s+"title":"None",\
\\s+"fullTitle":"Test Report: test2.mt - None",\
\\s+"duration":${float},\
\\s+"status":"Failure",\
\\s+"err":{\
\\s+"expected":"expected 2 to equal 3",\
\\s+"expectedValue":"2",\
\\s+"actualValue":"3",\
\\s+"expectedMessages":"expected {} to equal {}"\
\\s+}\
\\s+}\
\\s+\\]\
\\s+}\
`

    const JSONMatchRegex = new RegExp(JSONMatchString)
    it('should produce the correct JSON output to stdout', done => {
      exec('./mathematica-test-runner -R json test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.match(JSONMatchRegex)
        done()
      })
    }).timeout(timeout)

    it('should produce the correct JSON output to a file', done => {
      exec('./mathematica-test-runner -R json -o ./junit_tmp/test.json test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.equal('')
        const filePath = path.join(__dirname, '../junit_tmp/test.json')
        fs.stat(filePath, (err, stat) => {
          should.not.exist(err)
          fs.readFile(filePath, 'utf8', (err, data) => {
            data.should.match(JSONMatchRegex)
            done()
          })
        })
      })
    }).timeout(timeout)
  })

  describe('JUnit Reporter', () => {
    const float = '[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?'
    const JUnitMatchString = `<\\?xml version='1.0' encoding='UTF-8'\\?>
\\s*<testsuites name='Mathematica Tests'
\\s+time='${float}'
\\s+tests='4'
\\s+failures='1'>
\\s+<testsuite name='Root Suite'
\\s+tests='0'
\\s+failures='0'
\\s+time='0' />
\\s+<testsuite name='Test Report: test1.mt'
\\s+tests='2'
\\s+failures='0'
\\s+time='${float}'>
\\s+<testcase name='test1-1'
\\s+time='${float}' />
\\s+<testcase name='test1-2'
\\s+time='${float}' />
\\s+</testsuite>
\\s+<testsuite name='Test Report: test2.mt'
\\s+tests='2'
\\s+failures='1'
\\s+time='${float}'>
\\s+<testcase name='None'
\\s+time='${float}'>
\\s+<failure><!\\[CDATA\\[Verification Error: expected 2 to equal 3\\]\\]></failure>
\\s+</testcase>
\\s+<testcase name='None'
\\s+time='${float}' />
\\s+</testsuite>
\\s*</testsuites>
`

    const JUnitMatchRegex = new RegExp(JUnitMatchString)
    it('should produce the correct JSON output to stdout', done => {
      exec('./mathematica-test-runner -R junit test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.match(JUnitMatchRegex)
        done()
      })
    }).timeout(timeout)

    it('should produce the correct JSON output to a file', done => {
      exec('./mathematica-test-runner -R junit -o ./junit_tmp/test.xml test', (error, stdout, stderr) => {
        if (error) throw error
        stdout.should.equal('')
        const filePath = path.join(__dirname, '../junit_tmp/test.xml')
        fs.stat(filePath, (err, stat) => {
          should.not.exist(err)
          fs.readFile(filePath, 'utf8', (err, data) => {
            data.should.match(JUnitMatchRegex)
            done()
          })
        })
      })
    }).timeout(timeout)
  })
})
