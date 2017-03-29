import fs from 'fs';
import {
    compileTokens,
    lexizeScript,
    parseFountainScript,
    tokenizeLines
} from 'utility/fountain-parser';

const dataDir = process.cwd() + '/src/frontend/js/utility/__tests__/data';

// example data
const exampleDialogue = fs.readFileSync(dataDir + '/dialogue.fountain', 'utf8');
const exampleNotes = fs.readFileSync(dataDir + '/notes.fountain', 'utf8');
const examplePageBreaks = fs.readFileSync(dataDir + '/page_break.fountain', 'utf8');
const exampleSceneHeadings = fs.readFileSync(dataDir + '/scene_headings.fountain', 'utf8');
const exampleSections = fs.readFileSync(dataDir + '/sections.fountain', 'utf8');
const exampleTitlePage = fs.readFileSync(dataDir + '/title_page.fountain', 'utf8');
const exampleTransitions = fs.readFileSync(dataDir + '/transitions.fountain', 'utf8');

describe('fountainParser.tokenizeLines()', () => {
    test.only('tokenize dialogue', () => {
        const tokens = tokenizeLines(lexizeScript(exampleDialogue));
        console.log(tokens);
    });
    test('tokenize page_breaks', () => {
        const tokens = tokenizeLines(lexizeScript(examplePageBreaks));
        console.log(tokens);
    });
    test('tokenize notes', () => {
        const tokens = tokenizeLines(lexizeScript(exampleNotes));
        console.log(tokens);
    });
    test('tokenize scene_headings', () => {
        const tokens = tokenizeLines(lexizeScript(exampleSceneHeadings));
        console.log(tokens);
    });
    test('tokenize sections', () => {
        const tokens = tokenizeLines(lexizeScript(exampleSections));
        console.log(tokens);
    });
    test('tokenize title_page', () => {
        const tokens = tokenizeLines(lexizeScript(exampleTitlePage));
        console.log(tokens);
    });
    test('tokenize transitions', () => {
        const tokens = tokenizeLines(lexizeScript(exampleTransitions));
        console.log(tokens);
    });

    test('compile dialogue', () => {
        const compiled = compileTokens(tokenizeLines(lexizeScript(exampleDialogue)));
        console.log(compiled);
    });
});