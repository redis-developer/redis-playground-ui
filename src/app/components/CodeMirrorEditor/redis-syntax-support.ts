import {
  LRLanguage,
  LanguageSupport,
  defineLanguageFacet,
  HighlightStyle,
  syntaxHighlighting,
  StreamLanguage,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";

const redisCommands = [
  "GET",
  "HGET",
  "PING",
  "KEYS",
  "LRANGE",
  "FT.CREATE",
  "FT.SEARCH",
];

// /^(GET|HGET|PING|KEYS|LRANGE)\b/i  where \b is word boundary
const commandPattern = new RegExp(`^(${redisCommands.join("|")})\\b`, "i");

const redisLanguage = StreamLanguage.define({
  name: "redis",

  token(stream, state) {
    if (stream.eatSpace()) return null;

    if (stream.match(commandPattern)) {
      return "keyword";
    }

    // Numbers
    if (stream.match(/^\d+/)) {
      return "number";
    }

    // JSON paths and other identifiers
    if (stream.match(/^\$\.?\w*/)) {
      return "property";
    }

    // Tags and other variables
    if (stream.match(/^\w+/)) {
      return "variable";
    }

    // Strings (e.g., 'dbIndexName', 'keyPrefix')
    if (stream.match(/^'.*?'|".*?"/)) {
      return "string";
    }

    // Brackets and delimiters
    if (stream.match(/^[\[\](),;]/)) {
      return "bracket";
    }

    stream.next();
    return null;
  },
});

const redisHighlightStyle = HighlightStyle.define([
  // Commands or keywords
  {
    tag: tags.keyword,
    color: "#c8b6f3",
    //fontWeight: "bold",
  },

  // Variables and identifiers
  { tag: tags.variableName, color: "#c98e75" },

  // Numbers
  { tag: tags.number, color: "#98c379" },

  // JSON paths ($.productId)
  { tag: tags.propertyName, color: "#e5c07b" },

  // Strings (quoted values)
  { tag: tags.string, color: "#e06c75" },

  // Brackets and delimiters
  { tag: tags.bracket, color: "#56b6c2" },
]);

// Language support with highlighting
export const redisSyntaxSupport = new LanguageSupport(redisLanguage, [
  syntaxHighlighting(redisHighlightStyle),
]);
