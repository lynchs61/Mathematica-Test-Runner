# Mathematica-Test-Runner
A test runner for Mathematica tests. This takes a target test
(or test directory), runs the tests, and outputs the results in the format
specified. If a directory is given, all files in the toplevel of the directory
will attempt to be run.

    Usage: ./mathematica-test-runner [options] [targetFile|targetDirectory]

    Options:

      -V, --version                Output the version number
      -h, --help                   Output usage information
      -R, --reporter <reporter>    Specify a reporter to use. The default is 'spec'.
                                   Choose from one of the following options:
                                   {spec, tap, json, mathematica, junit}.
      -o, --outputfile <filepath>  The path to the output file to save the results. If
                                   this is omitted the results will be sent to stdout.
      -m, --failmissingmsg         Whether or not to fail the test if the expected
                                   message is missing.

    Reporters:

      'spec'        - The default reporter - simply outputs a nested view of the
                      high-level results, showing successes and failures and a short
                      summary at the end.
      'mathematica' - Output the results exactly as they come from the Mathematica
                      kernel.
      'json'        - The results are given as a single JSON object that
                      corresponds to each TestReportObject.
      'tap'         - The TAP reporter emits lines for a Test-Anything-Protocol
                      consumer.
      'junit'       - Results are given in the JUnit format

## Examples
To run the tests in the `test` directory:

```
$ ./mathematica-test-runner test
```

This will output the results with the default 'spec' reporter. A different reporter can be specified.

```
$ ./mathematica-test-runner -R tap test
```

You can also specify a single file instead of the entire test directory.

```
$ ./mathematica-test-runner test/test1.mt
```

## Reporters

### spec
The default reporter - simply outputs a nested view of the
high-level results, showing successes and failures and a short
summary at the end.

![spec reporter](https://github.com/lynchs61/Mathematica-Test-Runner/raw/master/doc/spec.gif)

### mathematica
Output the results exactly as they come from the Mathematica kernel.

    $ ./mathematica-test-runner -R mathematica test
    {TestReportObject[<|"Title" -> "Test Report: test1.mt", "TimeElapsed" ->
    Quantity[0.26, "Seconds"], "TestsSucceededCount" -> 2, "TestsFailedCount"
    -> 0, "TestsFailedWrongResultsCount" -> 0, "TestsFailedWithMessagesCount"
    -> 0, "TestsFailedWithErrorsCount" -> 0, "Aborted" -> False,
    "TestResults" -> <|1 -> TestResultObject[<|"TestIndex" -> 1, "TestID" ->
    "test1-1", "Outcome" -> "Success", "Input" -> HoldForm[1 + 1],
    "ExpectedOutput" -> HoldForm[2], "ActualOutput" -> HoldForm[2],
    "ExpectedMessages" -> {}, "ActualMessages" -> {}, "AbsoluteTimeUsed" ->
    Quantity[0.000146`2.314867853616427, "Seconds"], "CPUTimeUsed" ->
    Quantity[0.000144000000000144, "Seconds"], "MemoryUsed" -> Quantity[4088,
    "Bytes"]|>], 2 -> TestResultObject[<|"TestIndex" -> 2, "TestID" ->
    "test1-2", "Outcome" -> "Success", "Input" -> HoldForm[Sin[Pi]],
    "ExpectedOutput" -> HoldForm[0], "ActualOutput" -> HoldForm[0],
    "ExpectedMessages" -> {}, "ActualMessages" -> {}, "AbsoluteTimeUsed" ->
    Quantity[0.000102`2.159115169593909, "Seconds"], "CPUTimeUsed" ->
    Quantity[0.0001020000000000465, "Seconds"], "MemoryUsed" -> Quantity[128,
    "Bytes"]|>]|>, "TestsSucceededIndices" -> {1, 2}, "TestsFailedIndices" ->
    {}, "TestsFailedWrongResultsIndices" -> {},
    "TestsFailedWithMessagesIndices" -> {}, "TestsFailedWithErrorsIndices" ->
    {}|>], TestReportObject[<|"Title" -> "Test Report: test2.mt",
    "TimeElapsed" -> Quantity[0.27, "Seconds"], "TestsSucceededCount" -> 1,
    "TestsFailedCount" -> 1, "TestsFailedWrongResultsCount" -> 1,
    "TestsFailedWithMessagesCount" -> 0, "TestsFailedWithErrorsCount" -> 0,
    "Aborted" -> False, "TestResults" -> <|1 ->
    TestResultObject[<|"TestIndex" -> 1, "TestID" -> None, "Outcome" ->
    "Failure", "Input" -> HoldForm[1 + 2], "ExpectedOutput" -> HoldForm[2],
    "ActualOutput" -> HoldForm[3], "ExpectedMessages" -> {}, "ActualMessages"
    -> {}, "AbsoluteTimeUsed" -> Quantity[0.000114`2.2074198491684665,
    "Seconds"], "CPUTimeUsed" -> Quantity[0.00011300000000025179, "Seconds"],
    "MemoryUsed" -> Quantity[56, "Bytes"]|>], 2 ->
    TestResultObject[<|"TestIndex" -> 2, "TestID" -> None, "Outcome" ->
    "Success", "Input" -> HoldForm[Cos[2*Pi]], "ExpectedOutput" ->
    HoldForm[1], "ActualOutput" -> HoldForm[1], "ExpectedMessages" -> {},
    "ActualMessages" -> {}, "AbsoluteTimeUsed" ->
    Quantity[0.000122`2.23687482850674, "Seconds"], "CPUTimeUsed" ->
    Quantity[0.00012000000000012001, "Seconds"], "MemoryUsed" -> Quantity[56,
    "Bytes"]|>]|>, "TestsSucceededIndices" -> {2}, "TestsFailedIndices" ->
    {1}, "TestsFailedWrongResultsIndices" -> {1},
    "TestsFailedWithMessagesIndices" -> {}, "TestsFailedWithErrorsIndices" ->
    {}|>]}

### json
The results are given as a single JSON object that corresponds to each TestReportObject.

     $ ./mathematica-test-runner -R json test
    {
    	"stats":{
    		"files":2,
    		"duration":490,
    		"tests":4,
    		"passes":3,
    		"failures":1
    	},
    	"tests":[
    		{
    			"filetitle":"Test Report: test1.mt",
    			"title":"test1-1",
    			"fullTitle":"Test Report: test1.mt - test1-1",
    			"duration":0.15300000000000002,
    			"status":"Success",
    			"err":{}
    		},
    		{
    			"filetitle":"Test Report: test1.mt",
    			"title":"test1-2",
    			"fullTitle":"Test Report: test1.mt - test1-2",
    			"duration":0.10200000000000004,
    			"status":"Success",
    			"err":{}
    		},
    		{
    			"filetitle":"Test Report: test2.mt",
    			"title":"None",
    			"fullTitle":"Test Report: test2.mt - None",
    			"duration":0.136,
    			"status":"Failure",
    			"err":{
    				"expected":"expected 2 to equal 3",
    				"expectedValue":"2",
    				"actualValue":"3",
    				"expectedMessages":"expected {} to equal {}"
    			}
    		},
    		{
    			"filetitle":"Test Report: test2.mt",
    			"title":"None",
    			"fullTitle":"Test Report: test2.mt - None",
    			"duration":0.10799999999999997,
    			"status":"Success",
    			"err":{}
    		}
    	],
    	"passes":[
    		{
    			"filetitle":"Test Report: test1.mt",
    			"title":"test1-1",
    			"fullTitle":"Test Report: test1.mt - test1-1",
    			"duration":0.15300000000000002,
    			"status":"Success",
    			"err":{}
    		},
    		{
    			"filetitle":"Test Report: test1.mt",
    			"title":"test1-2",
    			"fullTitle":"Test Report: test1.mt - test1-2",
    			"duration":0.10200000000000004,
    			"status":"Success",
    			"err":{}
    		},
    		{
    			"filetitle":"Test Report: test2.mt",
    			"title":"None",
    			"fullTitle":"Test Report: test2.mt - None",
    			"duration":0.10799999999999997,
    			"status":"Success",
    			"err":{}
    		}
    	],
    	"failures":[
    		{
    			"filetitle":"Test Report: test2.mt",
    			"title":"None",
    			"fullTitle":"Test Report: test2.mt - None",
    			"duration":0.136,
    			"status":"Failure",
    			"err":{
    				"expected":"expected 2 to equal 3",
    				"expectedValue":"2",
    				"actualValue":"3",
    				"expectedMessages":"expected {} to equal {}"
    			}
    		}
    	]
    }

### tap
The TAP reporter emits lines for a Test-Anything-Protocol consumer.

     $ ./mathematica-test-runner -R tap test
    1..4
    ok 1 Test Report: test1.mt test1-1
    ok 2 Test Report: test1.mt test1-2
    not ok 3 Test Report: test2.mt None
    # Verification Error: expected 2 to equal 3
    ok 4 Test Report: test2.mt None
    # tests 4
    # pass 3
    # fail 1
    # skip 0

### junit
The JUnit reporter gives the results as XML compatible with JUnit/XUnit reporters.

    $ ./mathematica-test-runner -R junit test
    <?xml version='1.0' encoding='UTF-8'?>
    <testsuites name='Mathematica Tests'
        time='0.49'
        tests='4'
        failures='1'>
     <testsuite name='Root Suite'
         tests='0'
         failures='0'
         time='0' />
     <testsuite name='Test Report: test1.mt'
         tests='2'
         failures='0'
         time='0.25'>
      <testcase name='test1-1'
          time='0.000148' />
      <testcase name='test1-2'
          time='0.000099' />
     </testsuite>
     <testsuite name='Test Report: test2.mt'
         tests='2'
         failures='1'
         time='0.24'>
      <testcase name='None'
          time='0.000116'>
       <failure><![CDATA[Verification Error: expected 2 to equal 3]]></failure>
      </testcase>
      <testcase name='None'
          time='0.000109' />
     </testsuite>
    </testsuites>

