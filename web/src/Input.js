import React from "react";

const Input = (props) => {
  return (
    <section>
      <input
        type={props.type}
        className="input"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
      />
    </section>
  );
};

export default Input;
