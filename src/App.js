import React, { Component } from 'react';
import logo from './resources/logo.png';
import './App.css';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TarjetaRol from './tarjeta-rol/tarjeta-rol';
import Cuerpo from './cuerpo/cuerpo';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000', 
    },
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

class App extends Component {

  render() {
    const img = require('./resources/roles/cerebro.png');
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
          <AppBar position="static" style={{backgroundColor: "rgb(189, 68, 50)"}}>
            <Toolbar>
              <img src={logo} alt="logo"  style={{widht: '50px', height: '50px', paddingRight: '10px'}}/>
              <Typography variant="title" style={{color: "#F5F5F5"}}>
                Inferencia de roles de usuario
              </Typography>
            </Toolbar>
          </AppBar>
         
          <TarjetaRol rol="Investigador de recursos" name="Joaquin Colacci" srcImage={img}></TarjetaRol>
          <Cuerpo></Cuerpo>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
