import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/*
PARA LOS CLASIFICADORES !
class Selector extends React.Component {
  contructor(props) {
    super(props);
    this.state = { obj: null }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({obj: this.props.listOption[e.target.value].obj})
  }

  render() {
    <select onChange={handleChange}>
     {this.props.listOption.map((option, index) =>
       <option key={index} value={index}>
        {option.name}
       </option>
      )}
    </select>
  }
}
*/

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class Filtros extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeProcesamiento = this.handleChangeProcesamiento.bind(this);
        this.handleChangeProcesamiento = this.handleChangeProcesamiento.bind(this);
        this.state = {
            procesamiento: '',
            clasificador1: '',
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

  handleChangeClasificador1 = event => {
    console.log(event.target.value);
    this.setState({ clasificador1 : event.target.value });
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
    const clasificadores = this.state.procesamiento == 'fase' 
      ? <div>
            <FormControl>
                <InputLabel htmlFor="clasificador1">Fase 1</InputLabel>
                <Select
                        style= {{width: '80px'}}
                        value={this.state.clasificador1}
                        onChange={this.handleChangeClasificador1}
                        inputProps={{
                            name: 'clasificadores-fase1',
                            id: 'clasificador1',
                        }}>
                        <MenuItem value='lmt'>LMT</MenuItem>
                        <MenuItem value='j48'>J48</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="clasificador2">Fase 2</InputLabel>
                <Select
                        style= {{width: '80px'}}
                        value={this.state.clasificador2}
                        onChange={this.handleChangeClasificador2}
                        inputProps={{
                            name: 'clasificadores-fase2',
                            id: 'clasificador2',
                        }}>
                        <MenuItem value='lmt'>LMT</MenuItem>
                        <MenuItem value='j48'>J48</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="clasificador3">Fase 3</InputLabel>
                <Select
                        style= {{width: '80px'}}
                        value={this.state.clasificador3}
                        onChange={this.handleChangeClasificador3}
                        inputProps={{
                            name: 'clasificadores-fase3',
                            id: 'clasificador3',
                        }}>
                        <MenuItem value='lmt'>LMT</MenuItem>
                        <MenuItem value='j48'>J48</MenuItem>
                </Select>
            </FormControl>
        </div>
      : null;

    return (
      <form className={classes.root} autoComplete="off">
       
            <FormControl>
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
        
        { clasificadores }
    </form>
    );
  }    
}
export default withStyles(styles)(Filtros);