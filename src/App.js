import React, { Component } from 'react';
import logo from './resources/logo.png';
import './App.css';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Cuerpo from './cuerpo/Cuerpo';
import Resultados from './resultados/Resultados';


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

const logoStyle = {
     widht: '50px', 
     height: '50px', 
     paddingRight: '10px'
};

const textStyle = {
    color: "#F5F5F5"
}

class App extends Component {

  procesar(){
    console.log("Entro al llamado");
    fetch('http://localhost:8080/tesis-backend/rest/roles/mensajeHola')
    .then(result=>result.text())
    .then(data => console.log(data))
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
            <AppBar position="static" style={appBarStyle}>
              <Toolbar>
                <img src={logo} alt="logo"  style={logoStyle}/>
                <Typography variant="title" style={textStyle}>
                  Inferencia de roles de usuario
                </Typography>
              </Toolbar>
            </AppBar>
            <Cuerpo></Cuerpo>
            <Button color="primary" onClick={() => this.procesar()}>
                Procesar
            </Button>
            <Resultados></Resultados>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
