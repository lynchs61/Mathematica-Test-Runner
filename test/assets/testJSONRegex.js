/**
 * Created by slynch on 6/7/18.
 */


const output = `{
        "stats":{
                "files":2,
                "duration":360,
                "tests":4,
                "passes":3,
                "failures":1
        },
        "tests":[
                {
                        "filetitle":"Test Report: test1.mt",
                        "title":"test1-1",
                        "fullTitle":"Test Report: test1.mt - test1-1",
                        "duration":0.118,
                        "status":"Success",
                        "err":{}
                },
                {
                        "filetitle":"Test Report: test1.mt",
                        "title":"test1-2",
                        "fullTitle":"Test Report: test1.mt - test1-2",
                        "duration":8.7e-2,
                        "status":"Success",
                        "err":{}
                },
                {
                        "filetitle":"Test Report: test2.mt",
                        "title":"None",
                        "fullTitle":"Test Report: test2.mt - None",
                        "duration":9.200000000000001e-2,
                        "status":"Failure",
                        "err":{
                                "expected":"expected 2 to equal 3",
                                "expectedValue":"2",
                                "actualValue":"3",
                                "expectedMsg":"expected {} to be {}",
                                "expectedMessages":"{}",
                                "actualMessages":"{}"
                        }
                },
                {
                        "filetitle":"Test Report: test2.mt",
                        "title":"None",
                        "fullTitle":"Test Report: test2.mt - None",
                        "duration":8.300000000000002e-2,
                        "status":"Success",
                        "err":{}
                }
        ],
        "passes":[
                {
                        "filetitle":"Test Report: test1.mt",
                        "title":"test1-1",
                        "fullTitle":"Test Report: test1.mt - test1-1",
                        "duration":0.118,
                        "status":"Success",
                        "err":{}
                },
                {
                        "filetitle":"Test Report: test1.mt",
                        "title":"test1-2",
                        "fullTitle":"Test Report: test1.mt - test1-2",
                        "duration":8.7e-2,
                        "status":"Success",
                        "err":{}
                },
                {
                        "filetitle":"Test Report: test2.mt",
                        "title":"None",
                        "fullTitle":"Test Report: test2.mt - None",
                        "duration":8.300000000000002e-2,
                        "status":"Success",
                        "err":{}
                }
        ],
        "failures":[
                {
                        "filetitle":"Test Report: test2.mt",
                        "title":"None",
                        "fullTitle":"Test Report: test2.mt - None",
                        "duration":9.200000000000001e-2,
                        "status":"Failure",
                        "err":{
                                "expected":"expected 2 to equal 3",
                                "expectedValue":"2",
                                "actualValue":"3",
                                "expectedMsg":"expected {} to be {}",
                                "expectedMessages":"{}",
                                "actualMessages":"{}"
                        }
                }
        ]
}
`
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

const matches = JSONMatchRegex.test(output)

console.log(matches)