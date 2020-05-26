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
      budget: 0,
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

  onBudgetChange = (e) => {
    const budget = e.target.value;
    this.setState({ budget });
  };

  signUp = async () => {
    await signUp(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.budget
    );
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
        Please enter your budget:
        <Input
          name="budget"
          type="number"
          value={this.state.budget}
          onChange={this.onBudgetChange}
        />
        <button className="button" onClick={this.signUp}>
          Sign Up
        </button>
        <span onClick={this.redirect}>Already have an account? Sign in.</span>
      </div>
    );
  }
}
