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
    const demoLinks = [
      // Check out guide online on how to do this using Promise.all properly
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo",
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo",
    ];
    demoLinks.forEach((link) =>
      fetch(link)
        .then((data) => data.json())
        .then((data) => {
          let { "Global Quote": quote } = data;
          let {
            "01. symbol": symbol,
            "05. price": price,
            "10. change percent": percent,
          } = quote;
          let stock = { symbol, price, percent };
          let temp = [...this.state.stocks, stock];
          this.setState({ stocks: temp });
          console.log(this.state.stocks);
        })
    );
  }

  render() {
    let views = <img src="https://i.stack.imgur.com/7VozH.gif" />;
    const { stocks } = this.state;
    if (stocks && stocks.length > 0) {
      // views = stocks.map(s, (i) => ({
      //   <p key={i}>
      //     {s.symbol}: {s.price}
      //   </p>
      // }));
    }
    return <div className="App">{views}</div>;
  }
}

export default App;
