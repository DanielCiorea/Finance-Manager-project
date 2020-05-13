import React from "react";

const Filters = (props) => {
  return (
    <div className="buttons">
      <button onClick={props.setFilterToAll}>All</button>
      <button onClick={props.setFilterToIncomes}>Incomes</button>
      <button onClick={props.setFilterToExpenses}>Expenses</button>
    </div>
  );
};

export default Filters;
