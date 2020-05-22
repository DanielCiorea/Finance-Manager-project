import React from "react";
import { getUser } from "./session";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }

  getUser = () => {
    const user = getUser();
    this.setState({ user });
    console.log(user.name);
  };

  render() {
    return (
      <div className="header">
        <img
          className="logo"
          src="https://lh3.googleusercontent.com/6fnuIpYkS-CWwQhU6M7KQ5xk514Gip8DT3_-SigdTMmqeKGNRBbHwxilYbj55PtGZ3c"
          alt=""
        />
      </div>
    );
  }
}
