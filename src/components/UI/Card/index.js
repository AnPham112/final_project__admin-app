import React from "react";
import "./style.css";

const Card = (props) => {
  return (
    <div className="card" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader" style={props.cardheaderstyle}>
          {props.headerleft && <div>{props.headerleft}</div>}
          {props.headerright && props.headerright}
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Card;