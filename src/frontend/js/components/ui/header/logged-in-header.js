import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Container,
    Dropdown,
    Item,
    Label,
    Menu,
    Segment
} from 'semantic-ui-react';

const LoggedInHeader = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        securityContext: React.PropTypes.object.isRequired
    },
    renderSecurityContext(){
        const { securityContext } = this.props;

        return (
            <Container textAlign="right" fluid={ true }>
                <Label as='a' image color="black">
                    <img src={ securityContext.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    {  securityContext.username }
                </Label>
                <Button as="a" onClick={ () => { window.location.href = "/logout"} } basic color="grey" size="mini">Logout</Button>
            </Container>
        );
    },
    renderAdminUsersMenuItem() {
        const { securityContext } = this.props;
        const { path } = this.props;

        if(securityContext.admin_user!==1)
            return null;

        return (
            <Item as="a" onClick={()=>{browserHistory.push('/admin/users')}} className={ path=="/admin/users" ? "active" : null } content="Users"/>
        )
    },
    render() {
        const { renderAdminUsersMenuItem } = this;
        const { path } = this.props;
        return (
            <Segment inverted={ true } >
                <Container fluid>
                    <Menu size="large" inverted={ true } secondary={ true }>
                        <Item as="a" content="Dashboard" className={ path=="dashboard" ? "active" : null } onClick={ (e) => { browserHistory.push('/dashboard'); } }/>
                        <Dropdown item text='Projects'>
                            <Dropdown.Menu>
                                <Dropdown.Item as="a" icon='list' text='List' onClick={ (e) => { browserHistory.push('/projects'); } } />
                                <Dropdown.Item as="a" icon='add' text='Create' onClick={ (e) => { browserHistory.push('/project/create'); } }  />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='Stories'>
                            <Dropdown.Menu>
                                <Dropdown.Item as="a" icon='list' text='List' onClick={ (e) => { browserHistory.push('/stories'); } } />
                                <Dropdown.Item as="a" icon='add' text='Create' onClick={ (e) => { browserHistory.push('/story/create'); } }  />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='Characters'>
                            <Dropdown.Menu>
                                <Dropdown.Item as="a" icon='list' text='List' onClick={ (e) => { browserHistory.push('/characters'); } } />
                                <Dropdown.Item as="a" icon='add' text='Create' onClick={ (e) => { browserHistory.push('/character/create'); } }  />
                            </Dropdown.Menu>
                        </Dropdown>
                        {  renderAdminUsersMenuItem() }
                        <Item content={ this.renderSecurityContext() } className="right" />
                    </Menu>
                </Container>
            </Segment>
        )
    }
})

export default LoggedInHeader;
