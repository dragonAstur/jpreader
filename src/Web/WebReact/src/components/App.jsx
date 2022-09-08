import { useState } from "react";
import useTokenizedText from "../hooks/useTokenizedText";
import TextBox from "./TextBox";
import TokenizedBox from "./TokenizedBox";
import WordDetail from "./WordDetail";
function App() {
  const [tokenizedText, tokenizeText] =
    useTokenizedText("お前はもう死んでいる");

  const [selectedWord, setSelectedWord] = useState({
    text: "text",
    reading: "no",
    meaning: "42",
  });

  const onWordSelected = (token) => {
    setSelectedWord({
      text: token.orth,
      reading: tokenizedText.dictionary[token.lemma].reading,
      meaning: tokenizedText.dictionary[token.lemma].meaning,
    });
  };

  return (
    <div className="App">
      <TextBox onFormSubmit={tokenizeText}></TextBox>
      <TokenizedBox
        tokenizedText={tokenizedText}
        onWordSelected={onWordSelected}
      ></TokenizedBox>
      <WordDetail word={selectedWord}></WordDetail>
    </div>
  );
}

export default App;
