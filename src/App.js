import React, { Component } from 'react';
import logo from './resources/logo.png';
import './App.css';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Cuerpo from './cuerpo/Cuerpo';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: 'rgb(189, 68, 50)',
      dark: '#ba000d',
      contrastText: '#fff', 
    },
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

const appBarStyle = {
   backgroundColor: "rgb(189, 68, 50)"
};

const textStyle = {
    color: "#F5F5F5"
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div>
            <AppBar position="static" style={appBarStyle}>
              <Toolbar>
                <img src={logo} alt="logo" className="logo-style"/>
                <Typography variant="title" style={textStyle}>
                  Inferencia de roles de usuario
                </Typography>
              </Toolbar>
            </AppBar>
            <Cuerpo></Cuerpo>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
