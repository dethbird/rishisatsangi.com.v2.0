import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'


const ProjectCharacters = React.createClass({
    propTypes: {
      project: React.PropTypes.object
    },
    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let characterNodes = project.characters.map(function(character){
            let src;
            if(character.revisions.length)
                src = character.revisions[0].content;

            return (
                <Card
                    className="content-secondary"
                    key={ character.id }
                >
                    <Image src={ src } />
                    <CardText>{ character.name }</CardText>
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/character/${character.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/character/${character.id}/edit`)}
                            secondary={ true }
                        />
                    </CardActions>
                </Card>
            );
        });

        return (
            <Card className='content-primary'>
                <CardTitle
                    actAsExpander={ true }
                    showExpandableButton={ true }
                >
                    <Count count={ project.characters.length } /><span className='section-header'>Characters</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { characterNodes }
                </CardMedia>
                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="Add"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/character/add`)}
                    />
                    <CardActionsButton
                        title="Reorder"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/characters/edit`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectCharacters = ProjectCharacters
