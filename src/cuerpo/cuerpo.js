import React from 'react';
import SelectorArchivo from '../selector-archivo/SelectorArchivo';
import Hangouts from '../cuerpo/hangouts/Hangouts';
import Filtros from '../filtros/Filtros';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import cuerpoApi from './CuerpoAPI';
import Resultados from '../resultados/Resultados';

const initialStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '10vh' 
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

const divButStyle ={
  float: 'right', 
  marginTop:'30px', 
  marginRight: '100px', 
  display: 'flex', 
  flexDirection: 'row'
}



class Cuerpo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hangouts: null,
        loadingFile: false,
        processing: false,
        hangoutsConversations: {},
        hangoutsCurrentConversation: null,
        resultados: null
      };
      this.handleSelectorOnChange = this.handleSelectorOnChange.bind(this);
      this.onClickProcesar = this.onClickProcesar.bind(this);
    }

    //Eventos selector archivos
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

    //Eventos Hangouts
    onClickProcesar(){
      this.setState({ processing : true });
      console.log(this.state)
      fetch(cuerpoApi.predecirDirecto(this.state.hangoutsConversations[this.state.hangoutsCurrentConversation], 'J48'))
        .then(result=>result.text())
        .then((data) =>{
          this.setState({resultados: data, processing: false}),
          console.log(this.state)
        } 
        )

    }

    handleConversationsOnChange = event => {
      console.log(event);
      this.setState({hangoutsConversations: event})
    }

    handleCurrentConversationOnChange = event => {
      console.log(event);
      this.setState({hangoutsCurrentConversation: event})
    }


  
    render() {
      let styleCuerpo;
      let cuerpo;
      console.log(this.state)
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
            <Hangouts style={hangoutsStyle} 
                      Hangouts={this.state.hangouts} 
                      conversaciones={this.state.hangoutsConversations}
                      onChangeConversations= {this.handleConversationsOnChange} 
                      onChangeCurrentConversation= {this.handleCurrentConversationOnChange}>
            </Hangouts>
          </div>
      }
      let results = this.state.resultados != null ? <Resultados resultados={this.state.resultados}></Resultados> : null;
      let fileProgress = this.state.loadingFile ? <CircularProgress style={{marginTop: '7px'}} color="primary"/> : null;
      let processProgress = this.state.processing ? <LinearProgress color="secondary"/> : null
      return ( 
            <div style={styleCuerpo}>
              <div style={divSelectorStyle}>
                    <SelectorArchivo onChange={this.handleSelectorOnChange}></SelectorArchivo>
                    { fileProgress }
                </div>
                {cuerpo}
                <div style={divSelectorStyle}>
                    {processProgress}
                    <div style={divButStyle}>
                        {this.state.hangoutsCurrentConversation != null && <Button style={{marginRight: '10px'}} color="primary" onClick={this.onClickProcesar}>
                                Procesar
                        </Button>}
                        {this.state.hangoutsCurrentConversation != null && <Button style={{ backgroundColor : 'rgb(189, 68, 50)', color: 'white'}} >
                              Procesar Todo
                        </Button>}
                    </div>
                </div>
                {results}
            </div>
      );
    }
  }

  export default Cuerpo;