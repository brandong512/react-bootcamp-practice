import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentDidMount() {
    // Called immediately after component is mounted. Good place to instantiate newtork requests
    const topStories = "https://hacker-news.firebaseio.com/v0/topstories.json";
    const storyUrlBase = "https://hacker-news.firebaseio.com/v0/item/";

    fetch(topStories) // Make call to get IDs of top stores
      .then((data) => data.json()) // Turn json to object
      .then((data) =>
        data.map((id) => {
          // Format our IDs properly to get title, link & author data
          const url = `${storyUrlBase}${id}.json`;
          return fetch(url).then((d) => d.json()); // Get the article json url, fetch it, then turn promises into objects
        })
      )
      .then((promises) => Promise.all(promises)) // Make all the promises we just got
      .then((stories) => this.setState({ stories })); // Desctructure into state.stories
  }

  render() {
    let views = <div>Loading...</div>;
    const { stories } = this.state;
    if (stories && stories.length > 0) {
      views = stories.map((s) => (
        <p key={s.id}>
          <a href={s.url}>{s.title}</a> from <strong>{s.by}</strong>
        </p>
      ));
    }

    return (
      <div className="App">
        <h2>Hacker News Top Stories</h2>
        {views}
      </div>
    );
  }
}

export default App;
