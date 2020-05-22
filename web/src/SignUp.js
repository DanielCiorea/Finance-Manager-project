import React from "react";
import { signUp } from "./users";
import Input from "./Input";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  signUp = async () => {
    await signUp(this.state.name, this.state.email, this.state.password);
    this.props.history.push("/signIn");
  };

  redirect = () => {
    this.props.history.push("/signIn");
  };

  render() {
    return (
      <div className="signContainer">
        <h1>Sign Up</h1>
        Name:
        <Input
          name="name"
          value={this.state.name}
          onChange={this.onNameChange}
        />
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
        <button className="button" onClick={this.signUp}>
          Sign Up
        </button>
        <span onClick={this.redirect}>Already have an account? Sign in.</span>
      </div>
    );
  }
}
