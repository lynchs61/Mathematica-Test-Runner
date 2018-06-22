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
      exec('./mathematica-test-runner ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
        stdout.should.match(specMatchRegex)
        done()
      })
    }).timeout(10 * timeout) // 10 min :(

    it('should produce the correct Spec output to a file', done => {
      exec('./mathematica-test-runner -o ./junit_tmp/test.txt ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
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
    }).timeout(10 * timeout)
  })

  describe('Tap Reporter', () => {
    const expected = `1..4
ok 1 - Test Report: test1.mt test1-1
ok 2 - Test Report: test1.mt test1-2
not ok 3 - Test Report: test2.mt None
# Verification Error: expected 2 to equal 3
ok 4 - Test Report: test2.mt None
# tests 4
# pass 3
# fail 1
# skip 0
`

    it('should produce the correct Tap output to stdout', done => {
      exec('./mathematica-test-runner -R tap ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
        stdout.should.equal(expected)
        done()
      })
    }).timeout(10 * timeout)

    it('should produce the correct Tap output to a file', done => {
      exec('./mathematica-test-runner -R tap -o ./junit_tmp/test.tap ./mathematicaTests/test', (error, stdout, stderr) => {
        should.not.exist(error)
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
    }).timeout(10 * timeout)
  })
})
