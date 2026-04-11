/* jshint esversion: 11, node: true */
const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

function analyzeText(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize((text || '').toLowerCase());
  const score = analyzer.getSentiment(tokens);

  if (score > 0) {
    return 'positive';
  }

  if (score < 0) {
    return 'negative';
  }

  return 'neutral';
}

module.exports = { analyzeText };
