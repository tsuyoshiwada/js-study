import React, { Component } from "react";
import fetch from "isomorphic-fetch";

const rssLinks = [
  "https://dribbble.com/shots/popular.rss",
  "https://www.typographicposters.com/rss/thefeed.rss"
];

function fetchRSS(url) {
  return fetch(`/api/feed/${encodeURIComponent(url)}`).then(res => res.json());
}



const Item = ({ title, link, image, pubdate }) => {
  return (
    <dl>
      <dt><a href={link}>{title}</a> - {pubdate}</dt>
      <dd><img style={{
        width: "100px",
        height: "auto"
      }} src={image} /></dd>
    </dl>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    rssLinks.forEach(rssLink => {
      fetchRSS(rssLink).then(res => {
        const { items } = res;
        console.log(items);
        this.setState({items: this.state.items.concat(items)});
      });
    });
  }

  render() {
    const items = this.state.items.map(item => <Item key={item.guid} {...item} />);
    return (
      <div>
        <h1>Items</h1>
        {items}
      </div>
    );
  }
}
