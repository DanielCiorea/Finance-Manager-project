import React from "react";
import { createEntry, listEntries, modifyEntry, deleteEntry } from "./entries";

export default class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: props.budget,
      description: "",
      amount: "",
      entries: [],
      filter: "ALL",
    };
  }

  // modifyEntry = async (id, description, amount) => {
  //   await modifyEntry(id, description, amount);
  //   const entries = await listEntries();
  //   this.setState({ entries });
  // };

  deleteEntry = async (id) => {
    await deleteEntry(id);
    const entries = await listEntries();
    this.setState({ entries });
  };

  setFilterToAll = () => {
    this.setState({ filter: "ALL" });
  };

  setFilterToIncomes = () => {
    this.setState({ filter: "INCOMES" });
  };

  setFilterToExpenses = () => {
    this.setState({ filter: "EXPENSES" });
  };

  filterEntries = (entries, filter) =>
    filter === "ALL"
      ? entries
      : filter === "INCOMES"
      ? entries.filter((entry) => entry.amount >= 0)
      : entries.filter((entry) => entry.amount < 0);

  async componentDidMount() {
    const entries = await listEntries();
    this.setState({ entries });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInputKeyPress = async (event) => {
    if (event.nativeEvent.keyCode === 13) {
      await createEntry(this.state.description, this.state.amount);
      const entries = await listEntries();
      this.setState({ entries, description: "", amount: "" });
    }
  };

  render() {
    const filteredEntries = this.filterEntries(
      this.state.entries,
      this.state.filter
    );

    return (
      <div className="container">
        <h2>Budget: ${this.state.budget}</h2>
        <hr />
        Description:
        <input
          className="input"
          name="description"
          value={this.state.description}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
        Amount:
        <input
          type="number"
          className="input"
          name="amount"
          value={this.state.amount}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
        {filteredEntries.map((entry) => (
          <div className="entries" key={entry.id}>
            <label
              className={`entry ${entry.amount >= 0 ? "positive" : "negative"}`}
            >
              <span>{entry.description}</span> <span>${entry.amount}</span>
            </label>
            <button
              className="delButton"
              onClick={() => this.deleteEntry(entry.id)}
            >
              🗑
            </button>
          </div>
        ))}
        <hr />
        <div className="buttons">
          <button onClick={this.setFilterToAll}>All</button>
          <button onClick={this.setFilterToIncomes}>Incomes</button>
          <button onClick={this.setFilterToExpenses}>Expenses</button>
        </div>
      </div>
    );
  }
}
