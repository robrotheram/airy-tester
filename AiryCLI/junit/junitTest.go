package junit

import (
	"airycli/parser"
	"crypto/md5"
	"encoding/hex"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

type Testsuite struct {
	XMLName                   xml.Name `xml:"testsuite"`
	Text                      string   `xml:",chardata"`
	Xsi                       string   `xml:"xsi,attr"`
	NoNamespaceSchemaLocation string   `xml:"noNamespaceSchemaLocation,attr"`
	Name                      string   `xml:"name,attr"`
	Time                      string   `xml:"time,attr"`
	Tests                     string   `xml:"tests,attr"`
	Errors                    string   `xml:"errors,attr"`
	Skipped                   string   `xml:"skipped,attr"`
	Failures                  string   `xml:"failures,attr"`
	Properties                struct {
		Text     string `xml:",chardata"`
		Property []struct {
			Text  string `xml:",chardata"`
			Name  string `xml:"name,attr"`
			Value string `xml:"value,attr"`
		} `xml:"property"`
	} `xml:"properties"`
	Testcase []struct {
		Text      string `xml:",chardata"`
		Name      string `xml:"name,attr"`
		Classname string `xml:"classname,attr"`
		Time      string `xml:"time,attr"`
		Failure   struct {
			Text    string `xml:",chardata"`
			Message string `xml:"message,attr"`
			Type    string `xml:"type,attr"`
		} `xml:"failure"`
		Skipped struct {
			Text    string `xml:",chardata"`
			Message string `xml:"message,attr"`
		} `xml:"skipped"`
	} `xml:"testcase"`
}

func hash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))[:10]
}

func parse(file string) (*parser.TestSuite, error) {
	xmlFile, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer xmlFile.Close()
	byteValue, err := ioutil.ReadAll(xmlFile)
	if err != nil {
		return nil, err
	}
	var junit Testsuite
	err = xml.Unmarshal(byteValue, &junit)
	if err != nil {
		return nil, err
	}

	testcase := parser.TestSuite{}
	testcase.SuiteName = junit.Name
	testcase.Environment.Runtime = "java"

	for _, property := range junit.Properties.Property {
		//fmt.Println(property.Name)
		if property.Name == "java.runtime.version" {
			testcase.Environment.RuntimeVersion = property.Value
		}
	}

	for _, test := range junit.Testcase {
		tCase := parser.TestCase{}
		tCase.TestName = test.Name
		tCase.Time = test.Time
		tCase.FileName = test.Classname

		tCase.TestID = hash(fmt.Sprintf("%s-%s", test.Name, test.Classname))
		if test.Failure.Text != "" {
			tCase.Status = "Failiure"
			tCase.Message = test.Failure.Message
		} else if test.Skipped.Message != "" {
			tCase.Status = "Skipped"
			tCase.Message = test.Skipped.Message
		} else {
			tCase.Status = "Success"
		}
		testcase.Tests = append(testcase.Tests, tCase)
	}

	return &testcase, nil

}

func Parse(testcase *parser.TestSuite, path string) {
	matches, _ := filepath.Glob(path)
	for _, file := range matches {
		if coverage, err := parseCoverage(file); err == nil {
			for _, cov := range coverage.Counter {
				testcase.Coverage = append(testcase.Coverage, parser.TestCoverage{
					Type:    cov.Type,
					Missed:  cov.Missed,
					Covered: cov.Covered,
				})
			}
		}
		if testCase, err := parse(file); err == nil {
			testcase.Environment.Runtime = testCase.Environment.Runtime
			testcase.Environment.RuntimeVersion = testCase.Environment.RuntimeVersion
			testcase.Tests = append(testcase.Tests, testCase.Tests...)
		}
	}
}
