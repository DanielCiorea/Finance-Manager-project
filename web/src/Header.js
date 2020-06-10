import React from "react";
import { getUser, deleteUser, deleteToken } from "./session";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
    };
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
          src="https://i.ibb.co/Pxd08N5/6fnu-Ip-Yk-S-CWw-Qh-U6-M7-KQ5xk514-Gip8-DT3-Sigd-TMmqe-KGNRBb-Hwxil-Ybj55-Pt-GZ3c-1.png"
          alt=""
        />
        <div>
          <span>
            Signed in as <p>{this.state.userName}</p>
          </span>
          <button onClick={this.signOut}>Sign out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
