import React, { Component } from "react";
import fetch from "isomorphic-fetch";

function fetchRSS(url) {
  return fetch(`/api/feed/${encodeURIComponent(url)}`).then(res => res.json());
}

export default class App extends Component {
  componentWillMount() {
    fetchRSS("https://dribbble.com/shots/popular.rss").then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div>App</div>
    );
  }
}
