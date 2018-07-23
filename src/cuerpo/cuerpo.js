import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import SelectorArchivo from '../selector-archivo/SelectorArchivo';
import Hangouts from '../cuerpo/hangouts/Hangouts';
import Filtros from '../filtros/Filtros';
import CircularProgress from '@material-ui/core/CircularProgress';

const initialStyle = {
  height: '10em',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '10%' 
}

const withHangoutStyle = {
  paddingLeft: '20px'
}

const textStyle = {
  textAlign: 'center',
  width: '70%'
}

const divSelectorStyle = {
    display: 'flex', 
    flexDirection: 'row'
}

const hangoutsStyle = {
  marginTop: '10px', 
}


class Cuerpo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hangouts: null,
        loadingFile: false,
      };
      this.handleSelectorOnChange = this.handleSelectorOnChange.bind(this);
    }

    handleSelectorOnChange(e) {
        this.setState({ loadingFile : true });
        const fileSelected = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(fileSelected, "UTF-8");
        reader.onload = (result) => {
              var chats = JSON.parse(result.target.result);
              console.log("Loaded: " + result.target.result.length);
              this.setState({ hangouts : chats });
              this.setState({ loadingFile : false });
        }
  
    }
  
    render() {
      let styleCuerpo;
      let cuerpo;
      if (this.state.hangouts == null) {
        styleCuerpo = initialStyle;
        cuerpo = 
            <div style={textStyle}>
              <h3>Como obtener el archivo Hangouts.json</h3>Visita <a href="https://www.google.com/settings/takeout" target="_blank">Google Takeout</a>, clickear "No seleccionar ninguno" y luego solo seleccionar la opción de Hangouts.
                  Luego presione "Crear Archivo" con las opciones predefinidas, y luego de unos minutos recibirá un archivo zip con Hangouts.json dentro.
                  Extraer el archivo y seleccionarlo desde "Cargar archivo". Tenga en cuenta que si el historial del chat es de gran tamaño podría demorar unos minutos su carga.
            </div>
      } else {
        styleCuerpo = withHangoutStyle;
        cuerpo =  
          <div>
            <Filtros></Filtros>
            <Hangouts style={hangoutsStyle} Hangouts={this.state.hangouts}></Hangouts>
          </div>
      }

      return ( 
        <div style={styleCuerpo}>
           <div style={divSelectorStyle}>
                <SelectorArchivo onChange={this.handleSelectorOnChange}></SelectorArchivo>
                {this.state.loadingFile && <CircularProgress style={{marginTop: '7px'}}color="primary" />}
            </div>
            {cuerpo}
        </div>
      );
    }
  }

  export default Cuerpo;