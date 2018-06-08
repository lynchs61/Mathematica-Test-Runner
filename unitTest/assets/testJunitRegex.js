/**
 * Created by slynch on 6/7/18.
 */


const output = `<?xml version='1.0' encoding='UTF-8'?>
<testsuites name='Mathematica Tests'
    time='0.35'
    tests='4'
    failures='1'>
 <testsuite name='Root Suite'
     tests='0'
     failures='0'
     time='0' />
 <testsuite name='Test Report: test1.mt'
     tests='2'
     failures='0'
     time='0.19'>
  <testcase name='test1-1'
      time='0.000117' />
  <testcase name='test1-2'
      time='0.000086' />
 </testsuite>
 <testsuite name='Test Report: test2.mt'
     tests='2'
     failures='1'
     time='0.16'>
  <testcase name='None'
      time='0.000092'>
   <failure><![CDATA[Verification Error: expected 2 to equal 3]]></failure>
  </testcase>
  <testcase name='None'
      time='0.000086' />
 </testsuite>
</testsuites>
`

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

const matches = JUnitMatchRegex.test(output)

console.log(matches)