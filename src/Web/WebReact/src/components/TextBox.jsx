import React, { useState } from "react";
import "./TextBox.css";

const TextBox = ({ onFormSubmit }) => {
  const [text, setText] = useState("お前はもう死んでいる");

  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(text);
  };
  return (
    <div className="text-box">
      <form onSubmit={onSubmit}>
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          type="text"
        ></textarea>
        <button>Tokenize</button>
      </form>
    </div>
  );
};

export default TextBox;
