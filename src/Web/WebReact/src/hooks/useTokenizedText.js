import { useEffect, useState } from "react";
import jptokenizer from "../api/jptokenizer";

const useTokenizedText = (defaultText) => {
  const [tokenizedText, setTokenizedText] = useState({
    tokens: [],
    dictionary: {},
  });
  useEffect(() => {
    tokenize(defaultText);
  }, [defaultText]);
  const tokenize = async (inputText) => {
    const response = await jptokenizer.post("/text", { text: inputText });
    setTokenizedText({
      tokens: response.data.tokens,
      dictionary: response.data.dictionary,
    });
  };
  return [tokenizedText, tokenize];
};

export default useTokenizedText;
