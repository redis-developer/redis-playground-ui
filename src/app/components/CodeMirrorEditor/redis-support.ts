import {
  LRLanguage,
  LanguageSupport,
  defineLanguageFacet,
} from "@codemirror/language";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { StreamLanguage } from "@codemirror/language";

// Define Redis language with explicit tag mapping
const redisLanguage = StreamLanguage.define({
  name: "redis",

  token(stream, state) {
    if (stream.eatSpace()) return null;

    // Commands
    if (stream.match(/^(GET|HGET|PING|KEYS|LRANGE)\b/i)) {
      return "keyword";
    }

    // Extended Commands
    if (stream.match(/^(FT\.CREATE|FT\.SEARCH)\b/i)) {
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

    // Strings (e.g., '{dbIndexName}', '{keyPrefix}')
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

// Define highlighting style
const redisHighlightStyle = HighlightStyle.define([
  // Commands (FT.CREATE, GET, SET, etc.)
  {
    tag: tags.keyword,
    color: "#c8b6f3", //#111111
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

// Create language support with highlighting
export const redisSupport = new LanguageSupport(redisLanguage, [
  syntaxHighlighting(redisHighlightStyle),
]);
