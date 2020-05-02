import React from "react";

class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionValue: "",
      amountValue: "",
      entries: [],
    };
  }

  render() {
    return <input className="descriptionInput" placeholder={"Description"} />;
  }
}

export default EntryList;
