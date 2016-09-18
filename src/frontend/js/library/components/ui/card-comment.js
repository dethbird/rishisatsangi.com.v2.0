import { Link } from 'react-router'
import classNames from 'classnames';
import React from 'react'
import TimeAgo from 'react-timeago'

import { Card } from "../ui/card"
import { CardBlock } from "../ui/card-block"

const CardComment = React.createClass({

    propTypes: {
        comment: React.PropTypes.object.isRequired
    },

    render: function() {
        let className = classNames(['comment', this.props.comment.status])
        return (
            <Card
                className={ className }
            >
                <CardBlock>
                    <strong>{ this.props.comment.username }:</strong><br />
                    <blockquote>{ this.props.comment.comment }</blockquote>
                </CardBlock>
                <div className="card-footer text-muted clearfix">
                    <Link to={ '/comment/' + this.props.comment.id }>
                        <TimeAgo date={ this.props.comment.date_added } />
                    </Link>
                </div>
            </Card>
        );
    }
})

module.exports.CardComment = CardComment