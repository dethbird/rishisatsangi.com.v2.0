import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Image,
    Item,
    Icon
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet, charactersPostOne } from 'actions/character';

import { collateScriptCharactersWithCharacters } from 'utility/fountain-parser';

const ScriptCastList = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            models: []
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    handleClickCreateCharacter(e, payload){
        const { dispatch } = this.props;
        dispatch(charactersPostOne(payload));
    },
    renderCharacters(chars) {
        const { handleClickCreateCharacter } = this;
        const renderButton = (name, existing) => {
            if(existing) {
                return <Button as="a" icon="edit" size="mini" basic onClick={()=>{ browserHistory.push(`/character/${existing.id}/edit`) }}></Button>
            } else {
                return <Button as="a" icon="add" size="mini" basic color="green" onClick={ (e)=>{ handleClickCreateCharacter(e, { name })} }></Button>
            }
        }
        const nodes = chars.map(function(char, i){
            return (
                <Item key={ i }>{renderButton(char.name, char.existing)} <Image src={ char.existing ? (char.existing.avatar_image_url ? char.existing.avatar_image_url : 'https://myspace.com/common/images/user.png')  : 'https://myspace.com/common/images/user.png' } avatar spaced /> { char.name }</Item>
            )
        });
        return nodes;
    },
    render() {
        const { renderCharacters } = this;
        const { models, ui_state, errors, script } = this.props;

        if(!script)
            return null;

        // cross check script characters with saved characters
        const collated = collateScriptCharactersWithCharacters(script, models);
        return (
            <Container text={ true }>
                <Item.Group>
                    { renderCharacters(collated.existing) }
                    { renderCharacters(collated.not_found) }
                </Item.Group>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ScriptCastList);