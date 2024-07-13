import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import profilemen from "./images/profile_men.png"
import { Badge, Image, ListGroup, Nav} from 'react-bootstrap';
import Navigation from './components/navigation';
import Quspannel from './components/quspannel';

function App() {

  return (
    <>
    <Navigation/>
      <Container>
        <Quspannel />
        <Row>
          <Nav fill variant="tabs" defaultActiveKey="/home" className='p-0'>
            <Nav.Item>
              <Nav.Link href="/home">Daily</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/home">Weekly</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/home">Monthly</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/home">Yearly</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <ListGroup as="ol" className='p-0'>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <Image className='dammy_profilemen' src={profilemen} roundedCircle />
              <div className="ms-2 me-auto">
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container >
    </>
  );
}

export default App;