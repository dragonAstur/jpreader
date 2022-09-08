import "./TokenizedBox.css";

const TokenizedBox = ({ tokenizedText, onWordSelected }) => {
  const renderedBox = tokenizedText.tokens.map((token) => {
    if (token.furigana) {
      return (
        <ruby>
          <span
            onClick={() => {
              onWordSelected(token);
            }}
          >
            {token.orth}
          </span>
          <rt>{tokenizedText.dictionary[token.lemma].reading}</rt>
        </ruby>
      );
    }
    if (token.lemma === "。")
      return (
        <span>
          {token.orth}
          <br />
        </span>
      );
    return <span>{token.orth}</span>;
  });
  return <div className="tokenized-box">{renderedBox}</div>;
};

export default TokenizedBox;
