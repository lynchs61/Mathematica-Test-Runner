
const output = `
  Test Report: test1.mt
    [1;32m✓ [0;37mtest1-1[1;0m
    [1;32m✓ [0;37mtest1-2[1;0m

  Test Report: test2.mt
    [0;31m× None[1;0m
    [1;32m✓ [0;37mNone[1;0m


  [1;32m3 passing[1;0m[0;37m (310ms)
  [0;31m1 failing[1;0m

    Test Report: test2.mt
      None
      [0;31mVerification Error: expected 2 to equal 3[1;0m
      [1;32m+ expected [0;31m- actual

      - 3[1;32m
      - 2[1;0m

`

const g = '\\[1;32m'
const r = '\\[0;31m'
const gr = '\\[0;37m'
const d = '\\[1;0m'
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

const matches = specMatchRegex.test(output)

console.log(matches)