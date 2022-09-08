from flask import Flask, request
from flask_restful import Api, Resource
from jamdict import Jamdict
import spacy
import jaconv
import ginza
from flask_cors import CORS
nlp = spacy.load('ja_ginza')

app = Flask(__name__)
api = Api(app)
CORS(app)


def find_meaning(jam: Jamdict, token:  ginza.Token):

    meaning = ""
    reading = ""
    furigana = False

    if token.pos_ not in ["ADP", "AUX", "PUNCT"]:
        meanings = jam.lookup(token.lemma_).entries
        meaning = meanings[0].text() if 0 < len(meanings) else ""
        furigana = True
        readings = token.morph.get("Reading")
        reading = readings[0] if 0 < len(readings) else ""
    return {"reading": jaconv.kata2hira(reading), "meaning": meaning, "furigana": furigana}


def tokenize(text: str):

    jam = Jamdict()
    tokens = []
    dictionary = {}
    doc = nlp(text)
    for sent in doc.sents:
        for token in sent:
            if token.lemma_ not in dictionary:
                dictionary[token.lemma_] = find_meaning(jam, token)
            tokens.append(
                {"orth": token.orth_, "lemma": token.lemma_, "furigana": dictionary[token.lemma_]["furigana"]})

    return {"tokens": tokens, "dictionary": dictionary}


class Text(Resource):
    def get(self):
        return tokenize('銀座でランチをご一緒しましょう。')


class TextList(Resource):
    def post(self):
        text = request.get_json()["text"]
        return tokenize(text)


api.add_resource(Text, "/text")
api.add_resource(TextList, "/text")

if __name__ == "__main__":
    app.run()
