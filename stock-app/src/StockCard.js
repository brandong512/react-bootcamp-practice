import React, { Component } from "react";
import { render } from "@testing-library/react";
import "./StockCard.css";
import PropTypes from "prop-types";

import { Button, Card, Container, Row, Col } from "react-bootstrap";

class App extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    percentChange: PropTypes.number.isRequired,
    changeValue: PropTypes.number.isRequired,
    // description: PropTypes.string.isRequired, //stock profiles -> company
  };

  render() {
    const {
      name,
      symbol,
      price,
      percentChange,
      changeValue,
      // description,
    } = this.props;
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{symbol}</Card.Title>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Card.Title>{price}</Card.Title>
            </Col>
          </Row>
          <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
          <Row style={{ color: changeValue < 0 ? "red" : "green" }}>
            <Col>
              <Card.Text>{percentChange}</Card.Text>
            </Col>
            <Col>
              <Card.Text>{changeValue}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default App;
