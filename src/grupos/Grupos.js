import React from 'react';
import TarjetaGrupo from './tarjeta-grupo/TarjetaGrupo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const styleList = {
  maxHeight: '500px',
  overflowY: 'auto'
}

const divButStyle ={
    float: 'right', 
    marginRight: '100px',
    marginBottom: '10px', 
    display: 'flex', 
    flexDirection: 'row'
}

class DialogoGrupos extends React.Component {

  handleClose = () => {
    this.props.closeDialogGrupos();
  };

  exportGrupos = () => {
    var element = document.createElement("a");
    let resultToExport = this.getGruposToExport();
    var file = new Blob([resultToExport], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "grupos.txt";
    element.click();
  }

  getGruposToExport(){
    let stringExport = "";
    let contador = 1;
    for (let grupo of this.props.grupos){
        stringExport += "Grupo " + contador + ": \n"; 
        let stringIntegrantes = "";
        for (let integrante of grupo.integrantes){
            stringIntegrantes += integrante.nombre.charAt(0)=="'" ? integrante.nombre.slice(1, -1) : integrante.nombre;
            stringIntegrantes += " (" + integrante.rolPrincipal +", "+ integrante.rolSecundario +  ")";
            stringIntegrantes += ", ";
        }
        stringIntegrantes = stringIntegrantes.substring(0, stringIntegrantes.length - 2);
        stringIntegrantes += ".";
        stringExport += "Integrantes: " + stringIntegrantes + "\n";
        let stringRolesFaltantes = "";
        for (let rol of grupo.rolesFaltantes){
            stringRolesFaltantes += rol + ", ";
        }
        stringRolesFaltantes = stringRolesFaltantes.substring(0, stringRolesFaltantes.length - 2);
        stringRolesFaltantes += ".";
        if (stringRolesFaltantes != ".")
            stringExport += "Roles faltantes: " + stringRolesFaltantes + "\n";
        stringExport += "----------------------------------------------------------------------------------\n";
        contador++;
    }
    return stringExport;
}

  
    render() {
      
      const content = this.props.grupos && this.props.grupos.map((itemGrupo) =>
        <TarjetaGrupo grupo = {itemGrupo}>
        </TarjetaGrupo>
      );
      return (
        <Dialog
            open={this.props.open}
            aria-labelledby="form-dialog-title"
            style={{width: '1500px'}}
            maxWidth= 'false'
        >
        <DialogTitle id="form-dialog-title" color= 'rgb(189, 68, 50)'>Grupos</DialogTitle>
        <DialogContent>
            <div>
                { content }
            </div>
        </DialogContent>
        <DialogActions>
            <Button style={{ backgroundColor : 'rgb(189, 68, 50)', color: 'white'}} 
                                onClick={() => this.exportGrupos()}>
                Exportar
            </Button>
            <Button onClick={this.handleClose} color="primary">
                 Cerrar
            </Button>
        </DialogActions>
        </Dialog>
      );
    }
  }

  export default DialogoGrupos;