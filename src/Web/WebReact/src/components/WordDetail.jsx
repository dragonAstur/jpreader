import React from "react";

const WordDetail = ({ word }) => {
  return (
    <div className="word-detail">
      <p>Word: {word.text}</p>
      <p>Reading: {word.reading}</p>
      <p>Meaning: {word.meaning}</p>
    </div>
  );
};

export default WordDetail;
