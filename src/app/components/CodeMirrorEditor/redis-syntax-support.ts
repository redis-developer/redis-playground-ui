import {
  LRLanguage,
  LanguageSupport,
  defineLanguageFacet,
  HighlightStyle,
  syntaxHighlighting,
  StreamLanguage,
} from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

const redisCommands = [
  "GET",
  "HGET",
  "PING",
  "KEYS",
  "LRANGE",
  "FT.CREATE",
  "FT.SEARCH",
  "FT.AGGREGATE",
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
    if (stream.match(/^[\[\](){},;:]/)) {
      return "bracket";
    }

    // Start of line Comments with # or //
    if (stream.sol() && (stream.match(/^#.*$/) || stream.match(/^\/\/.*$/))) {
      return "comment";
    }

    stream.next();
    return null;
  },
});

const redisHighlightStyle = HighlightStyle.define([
  // Commands or keywords
  {
    tag: tags.keyword,
    color: "#F28100",
    //fontWeight: "bold",
  },

  // Variables and identifiers
  { tag: tags.variableName, color: "#8F2EC4" },

  // Numbers
  { tag: tags.number, color: "#1750EB" },

  // JSON paths ($.productId)
  { tag: tags.propertyName, color: "#FF16B4" },

  // Strings (quoted values)
  { tag: tags.string, color: "#018800" },

  // Brackets and delimiters
  { tag: tags.bracket, color: "#091A23" },

  // Comments
  { tag: tags.comment, color: "#939598" },
]);

// Add selection theme configuration
const selectionTheme = EditorView.theme({
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
    backgroundColor: "#E9E9E9 !important",
  },
});

// Language support with highlighting
export const redisSyntaxSupport = new LanguageSupport(redisLanguage, [
  syntaxHighlighting(redisHighlightStyle),
  selectionTheme,
]);
