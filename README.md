# Mathematica-Test-Runner
A test runner for Mathematica tests. This takes a target test
(or test directory), runs the tests, and outputs the results in the format
specified. If a directory is given, all files in the toplevel of the directory
will attempt to be run.

    Usage: ./mathematica-test-runner [options] [targetFile|targetDirectory]

    Options:

      -V, --version              Output the version number
      -h, --help                 Output usage information
      -R, --reporter <reporter>  Specify a reporter to use. The default is 'spec'.
                                 Choose from one of the following options:
                                 {spec, tap, json, mathematica}.

    Reporters:

      'spec'        - The default reporter - simply outputs a nested view of the
                      high-level results, showing successes and fails and a short
                      summary at the end.
      'mathematica' - Output the results exactly as they come from the Mathematica
                      front-end.
      'json'        - The results are given as a single JSON object that
                      corresponds to each TestReportObject.
      'tap'         - The TAP reporter emits lines for a Test-Anything-Protocol
                      consumer.

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

