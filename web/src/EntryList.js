import React from "react";
import { getBudget, createEntry, listEntries, deleteEntry } from "./entries";

export default class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: "",
      description: "",
      amount: "",
      entries: [],
      filter: "ALL",
    };
  }

  getBudget = async () => {
    const budget = await getBudget();
    console.log(budget);
    this.setState({ budget: budget[0].budget });
  };

  deleteEntry = async (id) => {
    await deleteEntry(id);
    const entries = await listEntries();
    this.setState({ entries });
  };

  setFilterToAll = async () => {
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
    await this.getBudget();
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
      // const sumOfIncomeAndExpenses = entries
      //   .map((entry) => entry.amount)
      //   .reduce((a, b) => a + b);
      const budget = await getBudget();
      this.setState({
        entries,
        budget:
          budget[0]
            .budget /* (budget[0].budget + sumOfIncomeAndExpenses).toFixed(2), */,
        description: "",
        amount: "",
      });
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
