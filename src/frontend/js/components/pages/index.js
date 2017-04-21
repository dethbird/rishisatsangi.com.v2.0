import React from 'react';
import {
    Container,
    Header,
    Image,
    Grid,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import Masthead from 'components/ui/header/masthead';

const Index = React.createClass({
    getInitialState() {
        return (
            { visible: false }
        );
    },
    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    },
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='overlay' direction='top' visible={visible} inverted={ true }>
                    <LoginForm onClickCancel={ this.toggleVisibility } />
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <Masthead onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }/>
                    <Segment className="main-content" as={ Container }>
                        <Container textAlign="center">
                            <Header as="h1" className="display-header">Focus on story development</Header>
                        </Container>
                        <br />
                        <Container text>
                            <Grid>
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                        </Grid.Column>
                                        <Grid.Column width={ 11 }>
                                            <Header as="h2">What is it?</Header>
                                            StoryStation is a tool for pre-pre-pre-production, a.k.a. story development.
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 11 } textAlign="right">
                                            <Header as="h2">What is it for?</Header>
                                            Imagine and write your stories in StoryStation before taking into your favorite storyboarding / animating / production tool.
                                        </Grid.Column>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                        </Grid.Column>
                                        <Grid.Column width={ 11 }>
                                            <Header as="h2">What does it do?</Header>
                                            <ul>
                                                <li>Create <code>characters</code>, <code>scripts</code>, <code>locations</code> and other assets as parts of narrative projects.</li>
                                                <li>You can write your script, and our smart script-editor will keep track of new characters as you type that you can flesh out later.</li>
                                                <li>Write your script and then hit play to preview it in storyboard form in real-time.</li>
                                            </ul>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 11 } textAlign="right">
                                            <Header as="h2">How does it work?</Header>
                                             Using the <code>.fountain</code> script-writing format, quickly jot down and start developing your story.
                                        </Grid.Column>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

export default Index;
