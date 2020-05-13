import React from "react";
import {
  getBudget,
  createTransaction,
  deleteTransaction,
  listTransactions,
} from "./transactionsAxios";

import Filters from "./Filters";
import Transactions from "./Transactions";
import Input from "./Input";

export default class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: "",
      description: "",
      amount: "",
      transactions: [],
      filter: "ALL",
    };
  }

  getBudget = async () => {
    const budget = await getBudget();
    const transactions = await listTransactions();
    const sumOfTransactions = transactions
      .map((x) => x.amount)
      .reduce((a, b) => a + b, 0);
    this.setState({
      budget: budget[0].budget + sumOfTransactions,
    });
  };

  deleteTransaction = async (id) => {
    await deleteTransaction(id);
    const transactions = await listTransactions();
    const budget = await getBudget();
    const sumOfTransactions = transactions
      .map((x) => x.amount)
      .reduce((a, b) => a + b, 0);
    this.setState({
      transactions,
      budget: budget[0].budget + sumOfTransactions,
    });
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

  filterTransactions = (transactions, filter) =>
    filter === "ALL"
      ? transactions
      : filter === "INCOMES"
      ? transactions.filter((transaction) => transaction.amount >= 0)
      : transactions.filter((transaction) => transaction.amount < 0);

  async componentDidMount() {
    await this.getBudget();
    const transactions = await listTransactions();
    this.setState({ transactions });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInputKeyPress = async (event) => {
    if (event.nativeEvent.keyCode === 13) {
      await createTransaction(this.state.description, this.state.amount);
      const transactions = await listTransactions();
      const sumOfTransactions = transactions
        .map((x) => x.amount)
        .reduce((a, b) => a + b, 0);
      const budget = await getBudget();
      this.setState({
        transactions,
        budget: budget[0].budget + sumOfTransactions,
        description: "",
        amount: "",
      });
    }
  };

  render() {
    const filteredTransactions = this.filterTransactions(
      this.state.transactions,
      this.state.filter
    );

    return (
      <div className="container">
        <h2>Budget: ${this.state.budget}</h2>
        <hr />
        Description:
        <Input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
        Amount:
        <Input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
        <Transactions
          filteredTransactions={filteredTransactions}
          deleteTransaction={this.deleteTransaction}
        />
        <hr />
        <Filters
          setFilterToAll={this.setFilterToAll}
          setFilterToIncomes={this.setFilterToIncomes}
          setFilterToExpenses={this.setFilterToExpenses}
        />
      </div>
    );
  }
}
