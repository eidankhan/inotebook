import React from "react";

export default function Alert(props) {

  const toUCase = (word) => {
      if(word === "danger")
        word = "error"
      return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <div style={{height: '50px'}}>
    { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
     <strong> {toUCase(props.alert.type)} ! </strong> {props.alert.message} 
    </div>}
    </div>
  );
}