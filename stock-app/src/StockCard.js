import React, { Component } from "react";
import { render } from "@testing-library/react";
// import "./StockCard.css";
import {Button, Card, Container, Row, Col} from "react-bootstrap";


class App extends Component{
  constructor(props){
    super(props)
    
    //Prop types go here for price, percent change, etc...
  }
  
  
  
  render(){
    return (
        <Container>
          <Row className="justify-content-center">
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>AAPL</Card.Title>
                  </Col>
                <Col style={{textAlign:"right"}}>
                <Card.Title>$120</Card.Title>
                </Col>
                </Row>
                <Card.Subtitle className="mb-2 text-muted">Apple Incorporated</Card.Subtitle>
                <Row>
                  <Col>
                  <Card.Text>Change Percent</Card.Text>
                  </Col>
                  <Col>
                  <Card.Text>Change Value</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Container>
    )
  }    
}
  
  
  export default App;
  