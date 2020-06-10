import React from "react";
import { getUser, deleteUser, deleteToken } from "./session";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
    };

    console.log(props);
  }

  componentDidMount() {
    const user = getUser();
    this.setState({ userName: JSON.parse(user).name });
  }

  signOut = () => {
    deleteUser();
    deleteToken();
    this.props.history.push("/signIn");
  };

  render() {
    return (
      <div className="header">
        <img
          className="logo"
          src="https://lh3.googleusercontent.com/6fnuIpYkS-CWwQhU6M7KQ5xk514Gip8DT3_-SigdTMmqeKGNRBbHwxilYbj55PtGZ3c"
          alt=""
        />
        <span>Signed in as: {this.state.userName}</span>
        <button onClick={this.signOut}>Sign out</button>
      </div>
    );
  }
}

export default withRouter(Header);
