import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import SelectorArchivo from '../selector-archivo/selector-archivo';
import Filtros from '../filtros/filtros';

class Cuerpo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        textFile: 'Cargue un archivo para clasificar...'
      };
      this.handleSelectorOnChange = this.handleSelectorOnChange.bind(this);
    }

    handleSelectorOnChange(e) {
    
        const fileSelected = e.target.files[0];
        var reader = new FileReader();
    
        reader.onload = (result) => {
              var array = new Uint8Array(result.target.result);
              console.log(array);
              var stringFile = new TextDecoder("utf-8").decode(array);
              console.log(stringFile)
              this.setState({ textFile : stringFile });
        }
         reader.readAsArrayBuffer(fileSelected);
           
    }
  
    render() {
      return (
        <div style={{paddingLeft: '20px'}}>
            <SelectorArchivo onChange={this.handleSelectorOnChange}></SelectorArchivo>
            <Filtros></Filtros>
            <div>
                <InputLabel>Entrada</InputLabel>
            </div>
            <div style={{paddingTop: '5px'}}>
                <textarea value={this.state.textFile} readOnly="true" style={{
                            width: '900px',
                            height: '500px',
                        }}/>
            </div>
        </div>
      );
    }
  }

  export default Cuerpo;