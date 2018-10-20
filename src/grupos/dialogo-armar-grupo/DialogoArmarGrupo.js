import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

class DialogoArmarGrupo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tamanio: '',
        };
    }
   
      handleChangeTamanio = event => {
        this.setState({ tamanio : event.target.value });
      };

      handleClose = () => {
        this.setState({ tamanio: ''});
        this.props.closeDialogArmarGrupo(null);
      };

      handleArmarGrupo = () => {
        this.setState({ open: false });
        this.props.closeDialogArmarGrupo(this.state.tamanio);
      };
      

      render() {
        return (
             <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
             >
                  <DialogTitle id="form-dialog-title" color= 'rgb(189, 68, 50)'>Armar grupos</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{marginBottom: '10px'}}>
                      Ingrese el tamaño del grupo.
                    </DialogContentText>
                    <InputLabel style={{marginTop: '15px', marginRight: '10px'}} htmlFor="tamano">Tamaño</InputLabel>
                    <Select
                          style= {{width: '50px'}}
                          value={this.state.tamanio}
                          onChange={this.handleChangeTamanio}
                          inputProps={{
                            name: 'tamano',
                            id: 'tamano',
                          }}
                      >
                      <MenuItem value='5'>5</MenuItem>
                      <MenuItem value='6'>6</MenuItem>
                      <MenuItem value='7'>7</MenuItem>
                      <MenuItem value='8'>8</MenuItem>
                      <MenuItem value='9'>9</MenuItem>
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleArmarGrupo} color="primary" disabled={this.state.tamanio === ''}>
                      Armar grupos
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
        );
    }
}


export default DialogoArmarGrupo;