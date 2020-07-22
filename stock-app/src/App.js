import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
  }

  componentDidMount() {
    Promise.all([
      // Check out guide online on how to do this using Promise.all properly
      fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo"),
      fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"),
    ])
        .then((data) => Promise.all(data.map(d => d.json())))
        .then((data) => {
          let newData = data.map(d => {
            let { "Global Quote": quote } = d;
            let {
              "01. symbol": symbol,
              "05. price": price,
              "10. change percent": percent,
            } = quote;
            let stock = { symbol, price, percent };
            return stock;
        })
        this.setState({ stocks: newData });
      })
  }

  render() {
    let views = <img src="https://i.stack.imgur.com/7VozH.gif" />;
    const { stocks } = this.state;
    if (stocks && stocks.length > 0) {
      views = stocks.map((s, i) => (
      <h2 key={i}>{s.symbol}: <div style={{color: s.percent.includes("-") ? "red" : "green"}}>${s.price} | {s.percent}</div></h2>
      ));
      console.log(views)
    }
    return <div className="App">{views}</div>;
  }
}

export default App;
