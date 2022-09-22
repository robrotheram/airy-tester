package junit

import (
	"encoding/xml"
	"io/ioutil"
	"os"
)

type Report struct {
	XMLName     xml.Name `xml:"report"`
	Text        string   `xml:",chardata"`
	Name        string   `xml:"name,attr"`
	Sessioninfo struct {
		Text  string `xml:",chardata"`
		ID    string `xml:"id,attr"`
		Start string `xml:"start,attr"`
		Dump  string `xml:"dump,attr"`
	} `xml:"sessioninfo"`
	Package struct {
		Text  string `xml:",chardata"`
		Name  string `xml:"name,attr"`
		Class []struct {
			Text           string `xml:",chardata"`
			Name           string `xml:"name,attr"`
			Sourcefilename string `xml:"sourcefilename,attr"`
			Method         []struct {
				Text    string `xml:",chardata"`
				Name    string `xml:"name,attr"`
				Desc    string `xml:"desc,attr"`
				Line    string `xml:"line,attr"`
				Counter []struct {
					Text    string `xml:",chardata"`
					Type    string `xml:"type,attr"`
					Missed  string `xml:"missed,attr"`
					Covered string `xml:"covered,attr"`
				} `xml:"counter"`
			} `xml:"method"`
			Counter []struct {
				Text    string `xml:",chardata"`
				Type    string `xml:"type,attr"`
				Missed  string `xml:"missed,attr"`
				Covered string `xml:"covered,attr"`
			} `xml:"counter"`
		} `xml:"class"`
		Sourcefile []struct {
			Text string `xml:",chardata"`
			Name string `xml:"name,attr"`
			Line []struct {
				Text string `xml:",chardata"`
				Nr   string `xml:"nr,attr"`
				Mi   string `xml:"mi,attr"`
				Ci   string `xml:"ci,attr"`
				Mb   string `xml:"mb,attr"`
				Cb   string `xml:"cb,attr"`
			} `xml:"line"`
			Counter []struct {
				Text    string `xml:",chardata"`
				Type    string `xml:"type,attr"`
				Missed  string `xml:"missed,attr"`
				Covered string `xml:"covered,attr"`
			} `xml:"counter"`
		} `xml:"sourcefile"`
		Counter []struct {
			Text    string `xml:",chardata"`
			Type    string `xml:"type,attr"`
			Missed  string `xml:"missed,attr"`
			Covered string `xml:"covered,attr"`
		} `xml:"counter"`
	} `xml:"package"`
	Counter []struct {
		Text    string `xml:",chardata"`
		Type    string `xml:"type,attr"`
		Missed  string `xml:"missed,attr"`
		Covered string `xml:"covered,attr"`
	} `xml:"counter"`
}

func parseCoverage(file string) (*Report, error) {
	xmlFile, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer xmlFile.Close()
	byteValue, err := ioutil.ReadAll(xmlFile)
	if err != nil {
		return nil, err
	}
	var junit Report

	err = xml.Unmarshal(byteValue, &junit)
	if err != nil {
		return nil, err
	}

	return &junit, nil

}
