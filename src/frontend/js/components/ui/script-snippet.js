import React from 'react';
import {
    Menu,
    Segment
} from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';
import fountainMode from 'codemirror-mode/fountain/fountain';

import ScriptToken from 'components/ui/script/script-token';

import { tokenizeScript } from 'utility/script-utils';


const ScriptSnippet = React.createClass({
    getInitialState() {
        return {
            activeItem: "fountain"
        }
    },
    handleItemClick(e, { name }) {
        this.setState(
            { activeItem: name }
        );
    },
    componentDidMount() {
        if (this.refs.fountain) {
            this.refs.fountain.getCodeMirror().refresh();
        }
    },
    propTypes: {
        snippet: React.PropTypes.string.isRequired
    },
    renderContent() {
        const { snippet } = this.props;
        const { activeItem } = this.state;

        if (activeItem=="fountain") {
            return (
                <Segment attached="top">
                    <CodeMirror
                        value={ snippet || '' }
                        options={{
                            lineNumbers: true,
                            lineWrapping: true,
                            mode: 'fountain',
                            theme: 'storystation',
                            readOnly: true,
                            autoRefresh: true
                        }}
                        ref="fountain"
                    />
                </Segment>
            );
        } else {
            const tokens = tokenizeScript(snippet);

            const scriptNodes = tokens.scriptTokens.map(function(token, i){
                return (
                    <ScriptToken
                        token={ token }
                        characters={ [] }
                        currentLine={ 0 }
                        onFindActiveToken={ ()=>{} }
                        type='script'
                        key={ i }
                        onClickToken={ ()=>{} }
                    />
                )
            });

            const titleNodes = tokens.titleTokens.map(function(token, i){
                return (
                    <ScriptToken
                        token={ token }
                        characters={ [] }
                        currentLine={ 0 }
                        onFindActiveToken={ ()=>{} }
                        type='title'
                        key={ i }
                        onClickToken={ ()=>{} }
                    />
                )
            });

            return (
                <Segment attached="top" className="fountain-container">
                    <div className='fountain'>
                        { titleNodes }
                        { scriptNodes }
                    </div>
                </Segment>
            );
        }

    },
    render() {
        const { snippet } = this.props;
        const { activeItem } = this.state;
        return (
            <div>
                { this.renderContent() }
                <Menu attached='bottom' tabular>
                    <Menu.Item name='fountain' active={ activeItem=="fountain" } onClick={ this.handleItemClick } as="a">
                        .fountain
                    </Menu.Item>

                    <Menu.Item name='rendered' active={ activeItem=="rendered" } onClick={ this.handleItemClick } as="a">
                        rendered
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
})

export default ScriptSnippet;
