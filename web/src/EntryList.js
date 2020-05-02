import React from "react";
import { createEntry, listEntries, modifyEntry, deleteEntry } from "./entries";

export default class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionValue: "",
      amountValue: "",
      entries: [],
    };
  }

  // Add modify functionality
  modifyEntry = async (id, description, amount) => {
    await modifyEntry(id, description, amount);
    const entries = await listEntries();
    this.setState({ entries });
  };

  async componentDidMount() {
    const entries = await listEntries();
    this.setState({ entries });
  }

  render() {
    return (
      <div>
        <input className="input" value={this.state.descriptionValue} placeholder={"Description"} />
        <input className="input" value={this.state.amountValue} placeholder={"Amount"} />
        {this.state.entries.map((entry) => (
          <label key={entry.id} className="entry">
            <button>edit</button>
            {entry.description} | ${entry.amount}
            <button>delete</button>
          </label>
        ))}
      </div>
    );
  }
}
