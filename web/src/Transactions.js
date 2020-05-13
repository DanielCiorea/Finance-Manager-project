import React from "react";

const Transactions = (props) => {
  return (
    <section>
      {props.filteredTransactions.map((transaction) => (
        <div className="transactions" key={transaction.id}>
          <label
            className={`transaction ${
              transaction.amount >= 0 ? "positive" : "negative"
            }`}
          >
            <span>{transaction.description}</span>{" "}
            <span>${transaction.amount}</span>
          </label>
          <button
            className="delButton"
            onClick={() => props.deleteTransaction(transaction.id)}
          >
            🗑
          </button>
        </div>
      ))}
    </section>
  );
};

export default Transactions;
