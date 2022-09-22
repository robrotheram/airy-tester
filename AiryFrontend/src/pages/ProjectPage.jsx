import { Link } from "react-router-dom";
import { Content, Panel, PanelGroup, Placeholder } from "rsuite";

import data from "../data/example-project.json"

const Card = props => (
  <Panel {...props} bordered header="Card title" style={{margin:"10px"}}>
    <Placeholder.Paragraph />
  </Panel>
);

export const ProjectPage = () => (
    <Content>
        <Panel header={data.project_name} bordered  style={{margin:"10px"}}>
            <Placeholder.Paragraph />
        </Panel>
        <PanelGroup accordion defaultActiveKey={0} bordered style={{margin:"10px"}}>
            {data.test_suits.map((suit, i) => (
                <Panel header={
                    <Link to={`suit/${suit.suit_name}`}>
                        {suit.suit_name}
                    </Link>
                } eventKey={i} id={`panel-${i}`}>
                <Placeholder.Paragraph />
                </Panel>
            ))}
        </PanelGroup>
    </Content>
)