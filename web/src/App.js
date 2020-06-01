import React from "react";
import {
  getBudget,
  modifyBudget,
  createTransaction,
  deleteTransaction,
  listTransactions,
} from "./transactionsAxios";

// import Header from "./Header";
import Filters from "./Filters";
import Transactions from "./Transactions";
import Input from "./Input";
import { getUser, deleteUser, deleteToken } from "./session";

export default class App extends React.Component {
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
    this.setState({
      budget: budget[0].budget,
    });
  };

  modifyBudget = async (budget) => {
    const user = await getUser();
    await modifyBudget(JSON.parse(user).id, budget);
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
      const budget = await getBudget();
      this.setState({
        transactions,
        budget: parseInt(budget[0].budget) + parseInt(this.state.amount),
        description: "",
        amount: "",
      });
      await this.modifyBudget(this.state.budget);
    }
  };

  deleteTransaction = async (id, amount) => {
    await deleteTransaction(id);

    const transactions = await listTransactions();

    let budget = this.state.budget;
    budget = budget - amount;
    this.setState({
      transactions,
      budget: budget,
    });

    await this.modifyBudget(this.state.budget);
  };

  signOut = () => {
    deleteUser();
    deleteToken();
    this.props.history.push("/signIn");
  };

  render() {
    const filteredTransactions = this.filterTransactions(
      this.state.transactions,
      this.state.filter
    );

    return (
      <div className="container">
        {/* <Header /> */}
        <h2>Budget: ${this.state.budget}</h2>
        <hr />
        <h3>Add your incomes and expenses below.</h3>
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
        <button onClick={this.signOut}>Sign out</button>
      </div>
    );
  }
}
