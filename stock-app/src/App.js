import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import StockCard from "./StockCard";
import { Row, Container } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(
        "https://sandbox.iexapis.com/stable/stock/twtr/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd"
      ),
      fetch(
        "https://sandbox.iexapis.com/stable/stock/aapl/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd"
      ),
      fetch(
        "https://sandbox.iexapis.com/stable/stock/ibm/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd"
      ),
    ])
      .then((data) => Promise.all(data.map((d) => d.json())))
      .then((data) => {
        let newData = data.map((d) => {
          let {
            companyName: name,
            symbol: symbol,
            latestPrice: price,
            changePercent: percentChange,
            change: changeValue,
          } = d;
          let stock = { symbol, price, percentChange, name, changeValue };
          return stock;
        });
        console.log(newData);
        this.setState({ stocks: newData });
      });
  }

  render() {
    let views = <img src="https://i.stack.imgur.com/7VozH.gif" />;
    const { stocks } = this.state;
    if (stocks && stocks.length > 0) {
      views = stocks.map((s, i) => (
        // <h2 key={i}>
        //   {s.symbol}:{" "}
        //   <div style={{ color: s.percent < 0 ? "red" : "green" }}>
        //     ${s.price} | {s.percent}
        //   </div>
        // </h2>
        <StockCard key={i} {...s} />
      ));
      console.log(views);
    }
    return (
      <div className="App">
        <Container style={{ margin: "25px auto" }}>
          <Row className="justify-content-center">{views}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
