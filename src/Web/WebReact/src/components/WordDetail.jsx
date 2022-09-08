import React from "react";
import "./WordDetail.css";

const WordDetail = ({ word }) => {
  return (
    <div className="word-detail">
      <p className="title">Word</p>
      <p className="description">{word.text}</p>
      <p className="title">Reading</p>
      <p className="description">{word.reading}</p>
      <p className="title">Meaning</p>
      <p className="description">{word.meaning}</p>
    </div>
  );
};

export default WordDetail;
