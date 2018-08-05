import React from 'react';
import TarjetaRol from '../tarjeta-rol/TarjetaRol';

class RolIndividuo {
    constructor(rol, nombre) {
      this.rol = rol;
      this.nombre = nombre;
    }
  }

const styleList = {
  width: '400px',
  maxHeight: '600px'
}

class Resultados extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        resultados: this.props.resultados  
      };
    }

    getListaResultados(){
        var registros = this.state.resultados.split("@data")[1];
        var lines = registros.split('\n');
        var retorno = [];
        for(var i = 0;i < lines.length;i++){
            if (lines[i].length > 1){
                var features = lines[i].split(",");
                var rol = {
                  rol: features[0],
                  name: features[1]
                }
                retorno.push(rol);
               }
        }
        console.log(retorno);
        return retorno;
    }
  
    render() {
      var listaRoles = this.getListaResultados();
      console.log (listaRoles);
      const content = listaRoles.map((itemRol) =>
        <TarjetaRol rol={itemRol.rol.charAt(0).toUpperCase() + itemRol.rol.slice(1)} 
                    name={itemRol.name.charAt(0)=="'" ? itemRol.name.slice(1, -1) : itemRol.name} 
                    srcImage={require('../resources/roles/' + itemRol.rol + '.png')}>
        </TarjetaRol>
      );
      return (
        <div style={styleList}>
          <h2>Resultados</h2>
          { content }
        </div>
      );
    }
  }

  export default Resultados;