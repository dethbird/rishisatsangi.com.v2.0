import React from 'react';
import {
    Button,
    Container,
    Grid,
    Icon,
    Segment
} from 'semantic-ui-react';

const Player = React.createClass({
    getInitialState() {
        return {
            panelIndex: 0,
            playing: false,
            timeout: null
        }
    },
    propTypes: {
        panels: React.PropTypes.array.isRequired,
        onClickPlay: React.PropTypes.func.isRequired,
        onClickPause: React.PropTypes.func.isRequired
    },
    play(index) {
        const { play } = this;
        const { panels, onClickPlay } = this.props;
        const nextIndex = (index + 1 == panels.length) ? 0 : index + 1;

        onClickPlay(null, panels[index]);

        this.setState({
            ... this.state,
            panelIndex: index,
            playing: true,
            timeout: setTimeout(function(){
                play(nextIndex);
            }, 3000)
        });

    },
    handleClickPlay(e) {
        const { panelIndex } = this.state;
        const { onClickPlay, panels } = this.props;
        this.play(0);
        onClickPlay(e, panels[0]);
    },
    handleClickPause(e) {
        const { timeout } = this.state;
        const { onClickPause, panels } = this.props;
        this.setState({
            ... this.state,
            playing: false,
            timeout: clearTimeout(timeout)
        });
        onClickPause(e);
    },
    render() {
        const { handleClickPlay, handleClickPause } = this;
        const { panels, onClickPause } = this.props;
        const { panelIndex, playing } = this.state;
        if (panels.length==0) {
            return (
                <Container fluid>
                    <Segment color="red">
                        Your selection contains no Panels.
                    </Segment>
                </Container>
            );
        }
        console.log(panels[panelIndex]);
        return (
            <Segment.Group as={ Container } text>
                <Segment inverted  className="player">
                </Segment>
                <Segment>
                    <Grid>
                        <Grid.Column width={ 4 }><span>{ panels.length } panel(s)</span></Grid.Column>
                        <Grid.Column width={ 8 } textAlign="center">bar</Grid.Column>
                        <Grid.Column width={ 4 } textAlign="right">time</Grid.Column>
                    </Grid>
                </Segment>
                <Segment textAlign='center'>
                    <Button as="a" onClick={ handleClickPause } disabled={ !playing }><Icon name="pause" /> Pause</Button>
                    <Button as="a" color="teal" onClick={ handleClickPlay } disabled={ playing }><Icon name="play" /> Play</Button>
                </Segment>
            </Segment.Group>
        )
    }
})

export default Player;
