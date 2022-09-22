import { Header, Nav, Navbar } from "rsuite";
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';

import DocPassIcon from '@rsuite/icons/DocPass';
import { Link } from "react-router-dom";

export const AppHeader = () => (
    <Header>  
        <Navbar appearance="inverse">
          <Navbar.Brand>
            <Link to="/" style={{color:"#FFF", fontWeight: "bold"}}><DocPassIcon style={{ fontSize: "1.5em", fontWeight: "bold"}} /> Airy Test Manager</Link>
          </Navbar.Brand>
          <Nav>
            {/* <Nav.Item icon={<HomeIcon />}>Home</Nav.Item>
            <Nav.Item>News</Nav.Item>
            <Nav.Item>Products</Nav.Item>
            <Nav.Menu title="About">
              <Nav.Item>Company</Nav.Item>
              <Nav.Item>Team</Nav.Item>
              <Nav.Item>Contact</Nav.Item>
            </Nav.Menu> */}
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
          </Nav>
        </Navbar>
      </Header>
)