import React from "react";
import { signIn } from "./users";
import { setUser, setToken } from "./session";
import Input from "./Input";
import Header from "./Header";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  signIn = async () => {
    const { user, token } = await signIn(this.state.email, this.state.password);
    setUser(user);
    setToken(token);
    console.log("user -> ", user);
    console.log("token -> ", token);
    this.props.history.push("/transactions");
  };

  redirect = () => {
    this.props.history.push("/signUp");
  };

  render() {
    return (
      <div className="signContainer">
        {/* <Header /> */}
        <h1>Sign In</h1>
        Email:
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        Password:
        <Input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <button className="button" onClick={this.signIn}>
          Sign In
        </button>
        <span onClick={this.redirect}>Create an account.</span>
      </div>
    );
  }
}
