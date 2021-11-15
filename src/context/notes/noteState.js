import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [state, setstate] = useState({
    name: "Eidan",
    age: "23",
  });

  const updateState = () => {
      setTimeout(() => {
          setstate({
              "name": "Asmat Zubair",
              "age": 24,
          })
      }, 1500);
  };


  return (
    <NoteContext.Provider value={{state, updateState}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
