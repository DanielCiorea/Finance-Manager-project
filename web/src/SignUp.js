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

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  redirect = () => {
    this.props.history.push("/signIn");
  };

  signUp = async () => {
    await signUp(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.budget
    );
    this.redirect();
  };

  render() {
    return (
      <div className="signContainer">
        <h1>Sign Up</h1>
        Name:
        <Input
          name="name"
          value={this.state.name}
          onChange={this.onInputChange}
        />
        Email:
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onInputChange}
        />
        Password:
        <Input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onInputChange}
        />
        Please enter your budget:
        <Input
          name="budget"
          type="number"
          value={this.state.budget}
          onChange={this.onInputChange}
        />
        <button className="button" onClick={this.signUp}>
          Sign Up
        </button>
        <span onClick={this.redirect}>Already have an account? Sign in.</span>
      </div>
    );
  }
}
