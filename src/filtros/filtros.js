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
        this.state = {
            procesamiento: '',
            clasificadores: jsonClasificadores.sort((a, b) => a.descripcion.localeCompare(b.descripcion)),
            clasificador: '',
            clasificador2: '',
            clasificador3: '',
            clasificador4: '',
            clasificador5: '',
          };
      }

  handleChangeProcesamiento = event => {
    this.setState({ procesamiento : event.target.value });
    this.props.onChangeTipoProcesamiento(event.target.value);
    this.setState({ clasificador : '' });
    this.props.onChangeClasificador();
    this.setState({ clasificador2 : '' });
    this.props.onChangeClasificador2(null);
    this.setState({ clasificador3 : '' });
    this.props.onChangeClasificador3(null);
    this.setState({ clasificador4 : '' });
    this.props.onChangeClasificador4(null);
    this.setState({ clasificador5 : '' });
    this.props.onChangeClasificador5(null);
  };

  handleChangeClasificador = event => {
    this.setState({ clasificador : event.target.value });
    this.props.onChangeClasificador(event.target.value);
};

  handleChangeClasificador2 = event => {
      this.setState({ clasificador2 : event.target.value });
      this.props.onChangeClasificador2(event.target.value);
  };

  handleChangeClasificador3 = event => {
      this.setState({ clasificador3 : event.target.value });
      this.props.onChangeClasificador3(event.target.value);
  };

  handleChangeClasificador4 = event => {
    this.setState({ clasificador4 : event.target.value });
    this.props.onChangeClasificador4(event.target.value);
};

handleChangeClasificador5 = event => {
  this.setState({ clasificador5 : event.target.value });
  this.props.onChangeClasificador5(event.target.value);
};

  render() {
    console.log(this.state)
    const { classes } = this.props;
    const labelClasificador = this.state.procesamiento == 'fase' ? 'Fase 1' : 'Clasificador';
    const styleClas = this.state.procesamiento == 'fase' ? widthClasificadorF : widthClasificador;
    return (
      <form className={classes.root} autoComplete="off">
            <FormControl style={formControl}>
                <InputLabel htmlFor="fases">Procesar</InputLabel>
                <Select
                    style= {{minWidth: '100px'}}
                    value={this.state.procesamiento}
                    onChange={this.handleChangeProcesamiento}
                    inputProps={{
                      name: 'fases',
                      id: 'fases',
                    }}
                >
                    <MenuItem value='directo'>Directo</MenuItem>
                    <MenuItem value='fase'>Fases</MenuItem>
                    <MenuItem value='faseCompuesto'>Fases Compuesto</MenuItem>
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
            {(this.state.procesamiento == 'fase' || this.state.procesamiento == 'faseCompuesto') && <FormControl style={formControl}>
                <InputLabel htmlFor="clasificador2">Fase 2</InputLabel>
                <Select
                        style= {{minWidth: '80px'}}
                        value={this.state.clasificador2}
                        onChange={this.handleChangeClasificador2}
                        inputProps={{
                            name: 'clasificador2',
                            id: 'clasificador2',
                        }}>
                        {this.state.clasificadores.map((clasificador) =>
                          <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                            {clasificador.descripcion}
                          </MenuItem>
                        )}
                </Select>
            </FormControl>}
            {(this.state.procesamiento == 'fase' || this.state.procesamiento == 'faseCompuesto') && 
              <div>
                <FormControl style={formControl}>
                    <InputLabel htmlFor="clasificador3">Fase 3</InputLabel>
                    <Select
                            style= {{minWidth: '80px'}}
                            value={this.state.clasificador3}
                            onChange={this.handleChangeClasificador3}
                            inputProps={{
                                name: 'clasificador3',
                                id: 'clasificador3',
                            }}>
                            {this.state.clasificadores.map((clasificador) =>
                              <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                                {clasificador.descripcion}
                              </MenuItem>
                            )}
                    </Select>
                </FormControl>
                {this.state.procesamiento == 'faseCompuesto' && 
                    <div>
                      <div>
                          <FormControl style={formControl}>
                            <Select
                                style= {{minWidth: '80px'}}
                                value={this.state.clasificador4}
                                onChange={this.handleChangeClasificador4}
                                inputProps={{
                                    name: 'clasificador4',
                                    id: 'clasificador4',
                                }}>
                                {this.state.clasificadores.map((clasificador) =>
                                  <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                                    {clasificador.descripcion}
                                  </MenuItem>
                                )}
                            </Select>
                          </FormControl>
                      </div>
                      <div>
                          <FormControl style={formControl}>
                            <Select
                                    style= {{minWidth: '80px'}}
                                    value={this.state.clasificador5}
                                    onChange={this.handleChangeClasificador5}
                                    inputProps={{
                                        name: 'clasificador5',
                                        id: 'clasificador5',
                                    }}>
                                    {this.state.clasificadores.map((clasificador) =>
                                      <MenuItem key={clasificador.codigo} value={clasificador.codigo}>
                                        {clasificador.descripcion}
                                      </MenuItem>
                                    )}
                            </Select>
                          </FormControl>
                      </div>
                    </div>
                }
              </div>
            }
    </form>
    );
  }    
}
export default withStyles(styles)(Filtros);