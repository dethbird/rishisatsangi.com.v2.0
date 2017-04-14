import { REGEX } from 'utility/fountain-parser';

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
            // section subelements
            if (state.section) {
                if (stream.match(/^https:\/\/.*.(jpg|jpeg|gif|png|svg)/i)) {
                    stream.skipToEnd();
                    return 'section-image';
                } else if (stream.match(/^[0-9]?[0-9]:[0-9][0-9]/)) {
                    stream.skipToEnd();
                    return 'section-duration';
                } else {
                    state.section = false;
                    return null;
                }
            }
            // title
            if (stream.match(REGEX.TITLE_PAGE)){
                stream.skipTo(':');
                stream.next();
                return "title-keyword";
            }
            // scene heading
            if (stream.match(REGEX.SCENE_HEADING)){
                state.section = true;
                stream.skipToEnd();
                return "heading";
            }
            // section
            if (match = stream.match(REGEX.SECTION)){
                state.section = true;
                stream.skipToEnd();
                return "section-" + match[1].length;
            }
            // character / dialogue
            if (stream.match(/^([A-Z][A-Z-0-9]+([A-Z-0-9 ])+)(\([A-Za-z0-9 ]+\))?(?:\ )?(\^)?/)){
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
            stream.skipToEnd();
            return null;
        },
        startState: function() {
            return {
                section: false,
            };
      }
    };
}, "fountain");

CodeMirror.defineMIME("text/x-fountain", "fountain");

});
