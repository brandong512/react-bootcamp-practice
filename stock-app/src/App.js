import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import StockCard from "./StockCard";
import { Row, Container } from "react-bootstrap";
import Bottleneck from "bottleneck";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
  }

  componentDidMount() {
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://www.wsj.com/market-data/stocks/us/movers?mod=md_home_movers_full"
    // ).then((data) => console.log(data));
    const limiter = new Bottleneck({
      minTime: 100,
    });
    let apiLinks = [
      "https://sandbox.iexapis.com/stable/stock/twtr/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/aapl/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/ibm/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/msft/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/amkr/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/himx/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/goog/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/fbk/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/amzn/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/dis/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/nflx/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
      "https://sandbox.iexapis.com/stable/stock/nkla/quote?token=Tsk_abf3939706e54fe9a1aaba8e9c9df2cd",
    ];
    Promise.all(apiLinks.map((link) => limiter.schedule(() => fetch(link))))
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
        this.setState({ stocks: newData });
      });
  }

  render() {
    let views = <img src="https://i.stack.imgur.com/7VozH.gif" />;
    const { stocks } = this.state;
    if (stocks && stocks.length > 0) {
      views = stocks.map((s, i) => <StockCard key={i} {...s} />);
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
