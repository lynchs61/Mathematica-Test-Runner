/**
 * Created by slynch on 10/13/17.
 */

/* eslint-env mocha */

// eslint-disable-next-line no-unused-vars
const should = require('should')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const timeout = 60000

describe('Mathematica-Test-Runner', () => {
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
\\s+"expectedMsg":"expected {} to be {}",\
\\s+"expectedMessages":"{}",\
\\s+"actualMessages":"{}"\
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
\\s+"expectedMsg":"expected {} to be {}",\
\\s+"expectedMessages":"{}",\
\\s+"actualMessages":"{}"\
\\s+}\
\\s+}\
\\s+\\]\
\\s+}\
`

    const JSONMatchRegex = new RegExp(JSONMatchString)
    it('should produce the correct JSON output to stdout', done => {
      exec('./mathematica-test-runner -R json ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
        stdout.should.match(JSONMatchRegex)
        done()
      })
    }).timeout(10 * timeout)

    it('should produce the correct JSON output to a file', done => {
      exec('./mathematica-test-runner -R json -o ./junit_tmp/test.json ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
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
    }).timeout(10 * timeout)
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
\\s+<failure><!\\[CDATA\\[Verification Error: expected 2 to equal 3\\]\\]>(<!\\[CDATA\\[>)?</failure>
\\s+</testcase>
\\s+<testcase name='None'
\\s+time='${float}' />
\\s+</testsuite>
\\s*</testsuites>
`

    const JUnitMatchRegex = new RegExp(JUnitMatchString)
    it('should produce the correct JUnit output to stdout', done => {
      exec('./mathematica-test-runner -R junit ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
        stdout.should.match(JUnitMatchRegex)
        done()
      })
    }).timeout(10 * timeout)

    it('should produce the correct JUnit output to a file', done => {
      exec('./mathematica-test-runner -R junit -o ./junit_tmp/test.xml ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
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
    }).timeout(10 * timeout)
  })
})
