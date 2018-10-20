import React from 'react';
import TarjetaRol from '../tarjeta-rol/TarjetaRol';

const styleList = {
  width: '400px',
  maxHeight: '500px',
  overflowY: 'auto'
}

class Resultados extends React.Component {

     getListaResultados(resultados){
        var registros = resultados.split("@data")[1];
        var lines = registros.split('\n');
        var retorno = [];
        for (let line of lines){
          if (line.length > 0){
            retorno.push(line)
          }
        }
        return retorno;
    }
  
    render() {
      var listaRoles = this.getListaResultados(this.props.resultados);
      const content = listaRoles.map((itemRol) =>
        <TarjetaRol resultado = {itemRol}
                    tipoProcesamiento = {this.props.tipoProcesamiento}>
        </TarjetaRol>
      );
      return (
        <div style={{marginTop: '20px'}}>
          <h2>Resultados</h2>
          <div style={styleList}>
            { content }
          </div>
        </div>
      );
    }
  }

  export default Resultados;