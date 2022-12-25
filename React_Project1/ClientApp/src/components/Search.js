// this is copied from https://codesandbox.io/s/blazing-resonance-qgi2m?fontsize=14&hidenavigation=1&theme=dark&file=/src/Header.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export class Header extends Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  testFavorite = () => {
    console.log("work");
  };
  render() {
    let search = this.state.search;
    let data = this.props.data;
    // console.log(search, data);

    return (
      <div>
        <div>
          <div>
            <Button
              component={Link}
              to={{ pathname: "/Search", state: { search, data } }}
              className="btn"
            >
              Search
            </Button>
          </div>
          <div>
            <Link
              to={{
                pathname: "/Search",
                state: { search, data, callBack: this.testFavorite }
              }}
            >
              Link Button
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;