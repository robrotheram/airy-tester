import { Content, Panel, Table, Button, Progress, FlexboxGrid, Row, Col, Divider } from 'rsuite';
const { HeaderCell, Cell, Column } = Table;

import CheckRoundIcon from '@rsuite/icons/CheckRound';
import CloseIcon from '@rsuite/icons/Close';
import ReloadIcon from '@rsuite/icons/Reload';

import data from "../data/example-testsuite.json"
import { TestProgress } from '../components/TestProgress';

const environment = []
Object.entries(data.environment).map((value) => {environment.push({key: value[0].replace("_", " "), value: value[1]})})

export const TestSuitPage = () => (
  <Content>
    <Row gutter={30} className="dashboard-header">
      <Col xs={15}>
        <h2>{data.suite_name}</h2>
        <h4>Type: {data.test_type}</h4>
        <br />
        <Panel bordered >
          <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", }}>
            <div style={{ textAlign: "center", fontSize: "18px", borderRight: "1px solid #ddd", paddingRight: "10px" }}>
              Test Cases
              <br />
              {data.tests.length}
            </div>
            <div style={{ flexGrow: 1, padding: "10px 0 0 10px" }}>
              <TestProgress
                success={data.tests.filter(test => test.status === "Success").length}
                skipped={data.tests.filter(test => test.status === "Skipped").length}
                failuire={data.tests.filter(test => test.status === "Failiure").length}
              />
            </div>
          </div>
        </Panel>
        <br />
        <Panel bordered bodyFill>
          <Table data={data.tests} autoHeight>
            <Column width={150} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="test_id" />
            </Column>

            <Column flexGrow={1} align="left">
              <HeaderCell>Test Name</HeaderCell>
              <Cell dataKey="test_name" />
            </Column>

            <Column width={200} align="center">
              <HeaderCell>Suceess</HeaderCell>
              <Cell>

                {rowData => {
                  switch (rowData.status) {
                    case "Success":
                      return (
                        <CheckRoundIcon style={{
                          color: "green",
                          marginRight: 10,
                          fontSize: '1.5em'
                        }}
                        />
                      )
                    case "Failiure":
                      return (
                        <CloseIcon
                          style={{
                            color: "#FFF",
                            borderRadius: "3px",
                            backgroundColor: "red",
                            marginRight: 10,
                            fontSize: '1.5em'
                          }}
                        />
                      )
                    case "Skipped":
                      return (
                        <ReloadIcon
                          style={{
                            color: "#000",
                            borderRadius: "3px",
                            backgroundColor: "#FFEB3B",
                            marginRight: 10,
                            padding: "2px",
                            fontSize: '1.5em'
                          }}
                        />
                      )
                  }
                }}
              </Cell>
            </Column>
            <Column width={200} align="left">
              <HeaderCell>Time</HeaderCell>
              <Cell dataKey="time" />
            </Column>
          </Table>
        </Panel>
       

      </Col>
      <Col xs={9}>
        <Panel header="Test Coverage" bordered>
          <Divider style={{ margin: "-10px -20px 0px -20px" }} />
          <Table data={data.coverage} showHeader={false} autoHeight rowHeight={40} hover={false}>
            <Column width={200} align="center" fixed>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="type" />
            </Column>
            <Column minWidth={300} flexGrow={1}>
              <HeaderCell>Coverage</HeaderCell>
              <Cell>
                {rowData => {
                  let percent = Math.floor((parseInt(rowData.covered) / (parseInt(rowData.covered) + parseInt(rowData.missed))) * 100)
                  let strokeColor = "#ffc107"
                  if (percent > 80) {
                    strokeColor = "#4caf50"
                  } else if (percent <= 50) {
                    strokeColor = "#f44336"
                  }
                  return <Progress.Line percent={percent} strokeColor={strokeColor} showInfo={true} style={{ padding: "0px" }} />
                }
                }
              </Cell>
            </Column>
          </Table>
        </Panel>
        <br />
        <Panel header="Features" bordered>
          <Divider style={{ margin: "-10px -20px 0px -20px" }} />
        </Panel>
        <br />
        <Panel header="Environment" bordered>
          <Divider style={{ margin: "-10px -20px 0px -20px" }} />
          <Table data={environment} showHeader={false} autoHeight rowHeight={40} hover={false}>
            <Column width={200} align="center" fixed>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="key" />
            </Column>
            <Column minWidth={300} flexGrow={1}>
              <HeaderCell>Coverage</HeaderCell>
              <Cell dataKey="value" />
            </Column>
          </Table>
        </Panel>
      </Col>
    </Row>
    <br />


  </Content>
)