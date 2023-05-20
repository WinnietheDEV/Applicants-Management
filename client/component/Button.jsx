import React from "react";

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.handleClick}>
      {props.name}
    </button>
  );
};

export default Button;
