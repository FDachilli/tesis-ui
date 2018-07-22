import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import SelectorArchivo from '../selector-archivo/SelectorArchivo';
import Hangouts from '../cuerpo/hangouts/Hangouts';
import Filtros from '../filtros/Filtros';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      let hangoutArea;
      if (this.state.hangouts == null) {
        hangoutArea = <div class="col-md-9">
                          <h3>Como obtener el archivo Hangouts.json</h3>Visita <a href="https://www.google.com/settings/takeout" target="_blank">Google Takeout</a> ,clickear "No seleccionar ninguno" y luego solo seleccionar la opción de Hangouts.
                              Selecciona las opciones que desee, y luego de unos minutos recibirá un archivo zip con Hangouts.json dentro.
                              Extraer el archivo y seleccionarlo desde "Cargar archivo". Tenga en cuenta que si el historial del chat es de gran tamaño podría demorar unos minutos su carga.
                      </div>
      } else {
        hangoutArea =  <Hangouts Hangouts={this.state.hangouts}></Hangouts>
      }

      return (
        <div style={{paddingLeft: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <SelectorArchivo onChange={this.handleSelectorOnChange}></SelectorArchivo>
              {this.state.loadingFile && <CircularProgress style={{marginTop: '7px'}}color="primary" />}
            </div>
            <Filtros></Filtros>
            {hangoutArea}
        </div>
      );
    }
  }

  export default Cuerpo;