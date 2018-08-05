import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import jsonClasificadores from './../resources/clasificadores.json';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const formControl = {
  marginRight: '5px'
}

const widthClasificadorF = {
    minWidth: '80px'
}

const widthClasificador = {
  minWidth: '120px'
}

class Filtros extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeProcesamiento = this.handleChangeProcesamiento.bind(this);
        this.handleChangeClasificador = this.handleChangeClasificador.bind(this);
        this.handleChangeClasificador2 = this.handleChangeClasificador2.bind(this);
        this.handleChangeClasificador3 = this.handleChangeClasificador3.bind(this);
        this.state = {
            procesamiento: '',
            clasificadores: jsonClasificadores,
            clasificador: '',
            clasificador2: '',
            clasificador3: '',
          };
      }

  handleChangeProcesamiento = event => {
    console.log(event.target.value);
    this.setState({ procesamiento : event.target.value });
    console.log("STATE EN HANDLE")
    console.log(this.state)
  };

  handleChangeClasificador = event => {
    console.log(event.target.value);
    this.setState({ clasificador : event.target.value });
    console.log(this.state)
};

  handleChangeClasificador2 = event => {
      console.log(event.target.value);
      this.setState({ clasificador2 : event.target.value });
      console.log(this.state)
  };

  handleChangeClasificador3 = event => {
      console.log(event.target.value);
      this.setState({ clasificador3 : event.target.value });
      console.log(this.state)
  };

  render() {
    console.log("STATE EN RENDER")
    console.log(this.state)
    const { classes } = this.props;
    const labelClasificador = this.state.procesamiento == 'fase' ? 'Fase 1' : 'Clasificador';
    const styleClas = this.state.procesamiento == 'fase' ? widthClasificadorF : widthClasificador;
    const clasificadores = this.state.procesamiento == 'fase' 
      ? <div>
           <FormControl style={formControl}>
                <InputLabel htmlFor="clasificador2">Fase 2</InputLabel>
                <Select
                        style= {{minWidth: '80px'}}
                        value={this.state.clasificador2}
                        onChange={this.handleChangeClasificador2}
                        inputProps={{
                            name: 'clasificadores-fase2',
                            id: 'clasificador2',
                        }}>
                        {this.state.clasificadores.map((clasificador) =>
                          <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                            {clasificador.descripcion}
                          </MenuItem>
                        )}
                </Select>
            </FormControl>
            <FormControl style={formControl}>
                <InputLabel htmlFor="clasificador3">Fase 3</InputLabel>
                <Select
                        style= {{minWidth: '80px'}}
                        value={this.state.clasificador3}
                        onChange={this.handleChangeClasificador3}
                        inputProps={{
                            name: 'clasificadores-fase3',
                            id: 'clasificador3',
                        }}>
                        {this.state.clasificadores.map((clasificador) =>
                          <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                            {clasificador.descripcion}
                          </MenuItem>
                        )}
                </Select>
            </FormControl>
        </div>
      : null;

    return (
      <form className={classes.root} autoComplete="off">
            <FormControl style={formControl}>
                <InputLabel htmlFor="fases">Procesar</InputLabel>
                <Select
                    style= {{width: '100px'}}
                    value={this.state.procesamiento}
                    onChange={this.handleChangeProcesamiento}
                    inputProps={{
                      name: 'fases',
                      id: 'fases',
                    }}
                >
                    <MenuItem value='directo'>Directo</MenuItem>
                    <MenuItem value='fase'>Fases</MenuItem>
                </Select>
          </FormControl>
          <FormControl style={formControl}>
                <InputLabel htmlFor="clasificador">{labelClasificador}</InputLabel>
                <Select
                        style= {styleClas}
                        value={this.state.clasificador}
                        onChange={this.handleChangeClasificador}
                        inputProps={{
                            name: 'clasificador1',
                            id: 'clasificador',
                        }}>
                        {this.state.clasificadores.map((clasificador) =>
                          <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                            {clasificador.descripcion}
                          </MenuItem>
                        )}
                </Select>
            </FormControl>
        
        { clasificadores }
    </form>
    );
  }    
}
export default withStyles(styles)(Filtros);