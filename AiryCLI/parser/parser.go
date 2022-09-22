package parser

type TestSuite struct {
	SuiteID     string          `json:"suite_id"`
	SuiteName   string          `json:"suite_name"`
	TestType    string          `json:"test_type"`
	Tests       []TestCase      `json:"tests"`
	Coverage    []TestCoverage  `json:"coverage"`
	Environment TestEnvironment `json:"environment"`
}

type TestCase struct {
	TestID   string `json:"test_id"`
	TestName string `json:"test_name"`
	FileName string `json:"file_name"`
	Status   string `json:"status"`
	Message  string `json:"message"`
	Time     string `json:"time"`
}

type TestCoverage struct {
	Type    string `json:"type"`
	Missed  string `json:"missed"`
	Covered string `json:"covered"`
}

type TestEnvironment struct {
	OSName         string `json:"os_name"`
	OSVersion      string `json:"os_version"`
	Architecture   string `json:"architecture"`
	CPU            string `json:"cpu"`
	Timezone       string `json:"timezome"`
	Runtime        string `json:"runtime"`
	RuntimeVersion string `json:"runtime_version"`
}
