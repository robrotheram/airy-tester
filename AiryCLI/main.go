package main

import (
	"airycli/junit"
	"airycli/parser"
	"encoding/json"
	"fmt"

	"github.com/zcalusic/sysinfo"
)

func main() {

	testcase := parser.TestSuite{}
	testcase.TestType = "JUNIT"
	testcase.SuiteName = "Example Suit"
	testcase.Environment = systemInfo()

	junit.Parse(&testcase, "/home/robertfletcher/workspace/airy/java-maven-junit-helloworld/target/**/*.xml")
	junit.Parse(&testcase, "/home/robertfletcher/workspace/airy/java-maven-junit-helloworld/target/site/jacoco/jacoco.xml")
	val, _ := json.MarshalIndent(testcase, "", "    ")
	fmt.Println(string(val))
}

func systemInfo() parser.TestEnvironment {
	env := parser.TestEnvironment{}
	var si sysinfo.SysInfo
	si.GetSysInfo()

	env.CPU = si.CPU.Model
	env.Architecture = si.OS.Architecture
	env.OSName = si.OS.Name
	env.OSVersion = si.OS.Version
	env.Timezone = si.Node.Timezone

	return env
}
