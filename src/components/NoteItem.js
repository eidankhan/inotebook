import React from "react";

export const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="far fa-trash-alt mx-2"></i>
          <i className="far fa-edit mx-2"></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};
