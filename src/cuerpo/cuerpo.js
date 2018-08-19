import React from 'react';
import SelectorArchivo from '../selector-archivo/SelectorArchivo';
import Hangouts from '../cuerpo/hangouts/Hangouts';
import Filtros from '../filtros/Filtros';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import cuerpoApi from './CuerpoAPI';
import Resultados from '../resultados/Resultados';
import AlertDialog from '../common/alert-dialog/AlertDialog';
import DialogoArmarGrupo from '../grupos/dialogo-armar-grupo/DialogoArmarGrupo';
import exportResultados from '../common/Export';
import Fade from '@material-ui/core/Fade';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const initialStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
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
    flexDirection: 'row',
}

const divContainerStyle = {
  display: 'flex', 
  flexDirection: 'row',
}

const divFiltrosStyle = {
  display: 'flex', 
  flexDirection: 'row',
  width: '600px'
}

const hangoutsStyle = {
  marginTop: '10px', 
}

const divButStyle ={
  float: 'right', 
  marginTop:'15px', 
  marginRight: '100px', 
  display: 'flex', 
  flexDirection: 'row'
}

const divButExpStyle ={
  marginTop: '20px',
}

const imgExpStyle = {
  heigth: '25%',
  width: '25%',
  margin: 'auto'
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
        resultados: {},
        tipoProcesamiento: null,
        clasificador: null,
        clasificador2: null,
        clasificador3: null,
        openAlertDialog: false,
        openGruposDialog: false,
        titleDialog: "",
        contentDialog: "",
        dataset: null
      };
      this.handleSelectorOnChange = this.handleSelectorOnChange.bind(this);
      this.onClickProcesar = this.onClickProcesar.bind(this);
      this.onClickLimpiar = this.onClickLimpiar.bind(this);
    }

    //Eventos selector archivos
    handleSelectorOnChange(e) {
        const fileSelected = e.target.files[0];
        if (!fileSelected){
          return;
        }
        this.setState({ loadingFile : true });
        var reader = new FileReader();
        reader.readAsText(fileSelected, "UTF-8");
        reader.onload = (result) => {
              var chats = JSON.parse(result.target.result);
              this.setState({ hangouts : chats });
              this.setState({ loadingFile : false });
        }
    }

    onClickProcesar(){
      this.setState({ processing : true });
      let url = null;
      let conversacion = this.state.hangoutsConversations[this.state.hangoutsCurrentConversation];
      if (this.state.tipoProcesamiento == 'directo'){
          url = cuerpoApi.predecirDirecto(conversacion, this.state.clasificador)
      }else{
         url = cuerpoApi.predecirFases(conversacion, this.state.clasificador, this.state.clasificador2, this.state.clasificador3);
      }
      fetch(url)
        .then((result)=>{
          if (result.ok) {
            return result.text();
          } else {
            this.setState({processing: false,
                           titleDialog: "ERROR",
                           contentDialog: "Se produjo un error al procesar",
                           openAlertDialog: true});
            throw new Error('Something went wrong');
          }
        })
        .then((data) =>{
          const resultsAux = this.state.resultados;
          resultsAux[this.state.hangoutsCurrentConversation] = data;
          this.setState({resultados: resultsAux, processing: false});
          this.setState({dataset: exportResultados.exportarAExcelWithColumns(this.state.resultados, this.state.tipoProcesamiento)});
          console.log(this.state.dataset)
        })
        .catch((error)=>{
          this.setState({processing: false,
            titleDialog: "ERROR",
            contentDialog: "Se produjo un error al procesar",
            openAlertDialog: true});
        })
    }

    onClickLimpiar(){
      const resultsAux = this.state.resultados;
      delete resultsAux[this.state.hangoutsCurrentConversation];
      this.setState({resultados: resultsAux})
    }

    onClickProcesarTodo(){
      this.setState({ processing : true });
      let url = null;
      let conversacion = this.state.hangouts;
      if (this.state.tipoProcesamiento == 'directo'){
          url = cuerpoApi.predecirDirectoTotal(conversacion, this.state.clasificador)
      }else{
         url = cuerpoApi.predecirFasesTotal(conversacion,  this.state.clasificador, this.state.clasificador2, this.state.clasificador3);
      }
      fetch(url)
        .then(result=>result.text())
        .then((data) =>{
          this.setState({resultados: data, processing: false})
        })
    }

    //Eventos Hangouts
    handleConversationsOnChange = event => {
      console.log(event);
      this.setState({hangoutsConversations: event})
    }

    handleCurrentConversationOnChange = event => {
      console.log(event);
      this.setState({hangoutsCurrentConversation: event})
    }

    //Eventos filtros

    handleTipoProcesamientoOnChange = event => {
      console.log(event);
      this.setState({tipoProcesamiento: event})
    }

    handleClasificadorOnChange = event => {
      console.log(event);
      this.setState({clasificador: event})
    }

    handleClasificador2OnChange = event => {
      console.log(event);
      this.setState({clasificador2: event})
    }

    handleClasificador3OnChange = event => {
      console.log(event);
      this.setState({clasificador3: event})
    }

    //Dialogo aviso events
    handleCloseAlertDialog = () => {
      this.setState({ openAlertDialog: false });
    };

    handleOpenGrupoDialog = () => {
      this.setState({ openGruposDialog: true });
    };

    handleCloseGrupoDialog = (event) => {
      console.log(event);
      this.setState({ openGruposDialog: false });
      this.setState({ processing : true });
      let rolParticipantes = this.getRolesParticipantesResultado();
      console.log(rolParticipantes);
    };

    getRolesParticipantesResultado(){
        let participantes=[];
        for (let key in this.state.resultados) {
            let res = this.state.resultados[key];
            var registros = res.split("@data")[1];
            var lines = registros.split('\n');
            for (let line of lines){
                let participante={};
                if (line.length > 0){
                    var features = line.split(",");
                    if (this.state.tipoProcesamiento == "directo"){
                      participante["rolPrincipal"]=features[0];
                      participante["nombre"]=features[1];
                      participante["rolSecundario"]=features[2];
                    }else{
                      participante["rolPrincipal"]=features[0];
                      participante["nombre"]=features[2];
                      participante["rolSecundario"]=features[4];
                    }
                participantes.push(participante);
                  
              }
            }
        }
        return participantes;
    }

    exportToArff = () => {
      var element = document.createElement("a");
      let resultToExport = exportResultados.getArff(this.state.resultados);
      var file = new Blob([resultToExport], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "resultados.arff";
      element.click();
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
            <div style={divContainerStyle}>
                <div style={divFiltrosStyle}>
                  <Filtros onChangeClasificador= {this.handleClasificadorOnChange} 
                          onChangeClasificador2= {this.handleClasificador2OnChange} 
                          onChangeClasificador3= {this.handleClasificador3OnChange}
                          onChangeTipoProcesamiento= {this.handleTipoProcesamientoOnChange}
                            >
                  </Filtros>
                  <Fade
                      in={this.state.processing}
                      style={{
                        transitionDelay: this.state.processing ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                    >
                    <CircularProgress style={{marginTop: '7px'}} color="primary"/> 
                  </Fade>
                </div>
                    {JSON.stringify(this.state.resultados) != JSON.stringify({}) && 
                    <div style={divSelectorStyle}>
                      
                        <div style={{width: '440px'}}></div>
                        <div style={divButExpStyle}>
                          {/*Object.keys(this.state.resultados).length >= 3 && */}<Button onClick={() => this.handleOpenGrupoDialog()} style={{margin: 'auto',width: '150px',backgroundColor : 'rgb(189, 68, 50)', color: 'white'}}>
                                Armar grupos
                          </Button>
                          <ExcelFile filename="resultados" element={<Button variant="contained" style={{margin: 'auto',width: '100px',backgroundColor : '#2e7d32', color: 'white', marginLeft:'10px'}}>
                                                Exportar
                                              <img style={imgExpStyle} src={require('../resources/excel.png')}/>
                                              </Button>}>
                            <ExcelSheet dataSet={this.state.dataset} name="Resultados prediccion de roles"/>
                          </ExcelFile>
                          <Button onClick={() => this.exportToArff()} style={{margin: 'auto',width: '100px',backgroundColor : '#01579b', color: 'white', marginLeft:'10px'}}>
                                Exportar
                                <img style={imgExpStyle} src={require('../resources/arff.png')}/>
                          </Button>
                    </div>
                </div>}
              </div>
              <Hangouts style={hangoutsStyle} 
                        Hangouts={this.state.hangouts} 
                        conversaciones={this.state.hangoutsConversations}
                        onChangeConversations= {this.handleConversationsOnChange} 
                        onChangeCurrentConversation= {this.handleCurrentConversationOnChange}>
              </Hangouts>
          </div>
      }
      let results = this.state.resultados[this.state.hangoutsCurrentConversation] != null ? <Resultados resultados={this.state.resultados[this.state.hangoutsCurrentConversation]} 
                                                                tipoProcesamiento={this.state.tipoProcesamiento}>
                                                    </Resultados> : null;

      let enableButtons = false;
      if (this.state.tipoProcesamiento == 'directo'){
          if (this.state.clasificador != null){
            enableButtons = true
          }
      }else{
        if (this.state.clasificador != null && this.state.clasificador2 != null && this.state.clasificador3 != null){
          enableButtons = true
        }
      }
   
      return ( 
            <div style={styleCuerpo}>
                <AlertDialog open={this.state.openAlertDialog} 
                            body={this.state.contentDialog} 
                            title={this.state.titleDialog}
                            closeDialog={this.handleCloseAlertDialog}>
                </AlertDialog>
                <DialogoArmarGrupo open={this.state.openGruposDialog}
                                  closeDialogArmarGrupo={this.handleCloseGrupoDialog}>
                </DialogoArmarGrupo>
                <div style={divSelectorStyle}>
                      <SelectorArchivo onChange={this.handleSelectorOnChange}></SelectorArchivo>
                      <Fade
                        in={this.state.loadingFile}
                        style={{
                          transitionDelay: this.state.loadingFile ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                      >
                        <CircularProgress style={{marginTop: '7px'}} color="primary"/> 
                      </Fade>
                      
                </div>
                {cuerpo}
                <div style={divButStyle}>                  
                    {this.state.hangoutsCurrentConversation != null && 
                     this.state.resultados[this.state.hangoutsCurrentConversation] == null &&
                        <Button style={{marginRight: '10px'}} color="primary" onClick={this.onClickProcesar} disabled={!enableButtons} >
                            Procesar
                        </Button>}
                      {this.state.resultados[this.state.hangoutsCurrentConversation] != null && 
                      <Button style={{ backgroundColor : 'rgb(189, 68, 50)', color: 'white'}} 
                              onClick={this.onClickLimpiar}>
                          Limpiar Resultados
                    </Button>}
                    {/*this.state.hangoutsCurrentConversation != null && 
                      <Button style={{ backgroundColor : 'rgb(189, 68, 50)', color: 'white'}} 
                              disabled={!enableButtons} onClick={this.onClickProcesarTodo}>
                          Procesar Todo
                    </Button>*/}
                  
                </div>
                {results}
            </div>
      );
    }
  }

  export default Cuerpo;