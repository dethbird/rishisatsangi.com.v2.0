import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectCharacters = React.createClass({
    getInitialState: function() {
        return {
            showContent: false
        };
    },
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    handleClickList() {
        const showContent = !this.state.showContent;
        this.setState({
            showContent
        });
    },
    handleClickItem(id) {
        browserHistory.push(
            '/project/' + this.props.project.id
            + '/character/' + id
        )
    },
    render: function() {
        const that = this;
        let characterNodes;
        let showButtonClassName = classNames(['btn', 'btn-secondary']);
        let showButtonCopy = 'Show';

        if (this.state.showContent) {
            showButtonClassName = classNames([showButtonClassName, 'active'])
            showButtonCopy = 'Hide';
            characterNodes = this.props.project.characters.map(function(character){
                let src;
                if(character.revisions.length)
                    src = character.revisions[0].content;

                return (
                    <CardClickable
                        className="col-xs-3"
                        key={ character.id }
                        onClick={ that.handleClickItem.bind(that, character.id) }
                    >
                        <strong>{ character.name }</strong>
                        <ImagePanelRevision src={ src } />
                        <br />
                        <br />
                    </CardClickable>
                );
            });
        }

        return (
            <section className="clearfix well">
                <div className="pull-left">
                    <SectionHeader><Count count={ this.props.project.characters.length } />  Characters</SectionHeader>
                </div>
                <ul className="nav nav-pills pull-right">
                    <li className="nav-item">
                        <button
                            onClick={ this.handleClickList }
                            className={ showButtonClassName }
                        >{ showButtonCopy }</button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={ '/project/' + this.props.project.id + '/characters' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                </ul>
                <div className="clearfix">
                    { characterNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectCharacters = ProjectCharacters