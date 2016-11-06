import React from 'react';
import { browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigo700, indigo800, indigoA700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {fade} from 'material-ui/utils/colorManipulator';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    fontFamily: 'Hind Vadodara',
    palette: {
        primary1Color: '#304FAD',
        primary2Color: '#31469E',
        accent1Color: '#4A7CE0',
        pickerHeaderColor: '#304FAD',
    },
});

const App = React.createClass({

    render: function() {
        const AppBarIcon = (props) => (
            <IconMenu
                iconButtonElement={
                  <IconButton iconStyle={{color: 'white'}}><NavigationMenu/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Projects" onTouchTap={ () => browserHistory.push('/projects')}/>
                    <MenuItem primaryText="Scripts" onTouchTap={ () => browserHistory.push('/scripts')}/>
            </IconMenu>
        );
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="StoryStation"
                        iconElementLeft={ <AppBarIcon /> }
                    />
                    <Paper zDepth={1} className="container-fluid" style={ { textAlign: 'center', padding: '15px' } }>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
})

module.exports.App = App
