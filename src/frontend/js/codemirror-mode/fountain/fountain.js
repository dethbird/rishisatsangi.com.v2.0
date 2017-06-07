import { REGEX } from 'constants/section';

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("codemirror/lib/codemirror"), require("codemirror/mode/xml/xml"), require("codemirror/mode/meta"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["codemirror/lib/codemirror", "codemirror/mode/xml/xml", "codemirror/mode/meta"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("fountain", function() {

    return {
        token: function(stream, state) {
            let match = false;
            let nextChar = false;

            // note started
            if (state.note) {
                match = stream.skipTo(']]');
                if (match) {
                    stream.eat(']]');
                    stream.next();
                    stream.next();
                    state.note = false;
                    return 'note';
                } else {
                    stream.skipToEnd();
                    return 'note';
                }
            }

            if (state.character_extended) {
                nextChar = stream.peek();
                if (nextChar == '(') {
                    match = stream.skipTo(')');
                    if (match) {
                        stream.eat(')');
                        stream.eatSpace();
                        return 'character-parenthetical';
                    } else {
                        stream.skipToEnd();
                        return null;
                    }
                } else if (nextChar == '^') {
                    stream.eat('^');
                    stream.skipToEnd();
                    return 'character-dual';
                }

                stream.skipToEnd();
                return "dialogue";
            }

            // section subelements
            if (state.section) {
                if (stream.match(REGEX.IMAGE)) {
                    nextChar = stream.peek();
                    return 'section-image';
                } else if (stream.match(/^[0-9]?[0-9]:[0-9][0-9]/) && state.section_level == 4) {
                    stream.skipToEnd();
                    return 'section-duration';
                } else if (stream.match(/^,/) && state.section_level == 4) {
                    return null;
                } else {
                    state.section = false;
                    state.section_level = false;
                    return null;
                }
            }
            // title
            if (stream.match(REGEX.TITLE)){
                stream.skipTo(':');
                stream.next();
                return "title-keyword";
            }
            // scene heading
            if (stream.match(REGEX.SCENE)){
                state.section = true;
                stream.skipToEnd();
                return "heading";
            }
            // section
            if (match = stream.match(REGEX.SECTION)){
                state.section = true
                state.section_level = match[1].length;
                stream.skipToEnd();
                return "section-" + match[1].length;
            }
            // character / dialogue
            if (match = stream.match(/^([A-Z][A-Z0-9'\-. ]+([A-Z0-9'\-. ])+)/)){
                stream.eatSpace();
                nextChar = stream.peek();
                if (nextChar && nextChar !== '(' && nextChar !=='^') {
                    stream.skipToEnd();
                    return null;
                } else if (nextChar == '(' || nextChar == '^') {
                    state.character_extended = true;
                    return "character";
                }
                state.character_extended = true;
                stream.skipToEnd();
                return "character";
            }
            if (match = stream.match(/^([@][A-Za-z]+)/)){
                stream.eatSpace();
                nextChar = stream.peek();
                if (nextChar && nextChar !== '(' && nextChar !=='^') {
                    stream.skipToEnd();
                    return null;
                } else if (nextChar == '(' || nextChar == '^') {
                    state.character_extended = true;
                    return "character";
                }
                state.character_extended = true;
                stream.skipToEnd();
                return "character";
            }

            // lyrics
            if (stream.match(/^~ /)){
                stream.skipToEnd();
                return "lyrics";
            }
            // synopsis
            if (stream.match(/^= /)){
                stream.skipToEnd();
                return "synopsis";
            }
            // page-break
            if (stream.match(REGEX.PAGE_BREAK)){
                stream.skipToEnd();
                return "page-break";
            }
            // check for notes
            if (stream.match(/\[\[/g)){
                match = stream.skipTo('[[');
                if (!match) {
                    stream.backUp(2);
                }
                state.note = true;
                return null;
            }

            stream.skipToEnd();
            return null;
        },
        blankLine(state) {
            state.character_extended = false;
        },
        startState: function() {
            return {
                last_line_blank: false,
                character_extended: false,
                section: false,
                section_level: false,
                note: false,
            };
      }
    };
}, "fountain");

CodeMirror.defineMIME("text/x-fountain", "fountain");

});
