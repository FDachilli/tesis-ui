import React, { Component } from 'react';
import TarjetaRol from '../tarjeta-rol/TarjetaRol';

class RolIndividuo {
    constructor(rol, nombre) {
      this.rol = rol;
      this.nombre = nombre;
    }
  }

class Resultados extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        resultados:         "@relation 'chat-weka.filters.unsupervised.attribute.Remove-R2-4,6-17,27-47,66-68'\r\n" + 
        "\r\n" + 
        "@attribute class_rol {finalizador,impulsor,cerebro,colaborador,especialista,implementador,monitor,investigador,coordinador}\r\n" + 
        "@attribute nombre string\r\n" + 
        "@attribute finalizador_companeros numeric\r\n" + 
        "@attribute impulsor_companeros numeric\r\n" + 
        "@attribute cerebro_companeros numeric\r\n" + 
        "@attribute colaborador_companeros numeric\r\n" + 
        "@attribute especialista_companeros numeric\r\n" + 
        "@attribute implementador_companeros numeric\r\n" + 
        "@attribute monitor_companeros numeric\r\n" + 
        "@attribute investigador_companeros numeric\r\n" + 
        "@attribute coordinador_companeros numeric\r\n" + 
        "@attribute C1 numeric\r\n" + 
        "@attribute C2 numeric\r\n" + 
        "@attribute C3 numeric\r\n" + 
        "@attribute C4 numeric\r\n" + 
        "@attribute C5 numeric\r\n" + 
        "@attribute C6 numeric\r\n" + 
        "@attribute C7 numeric\r\n" + 
        "@attribute C8 numeric\r\n" + 
        "@attribute C9 numeric\r\n" + 
        "@attribute C10 numeric\r\n" + 
        "@attribute C11 numeric\r\n" + 
        "@attribute C12 numeric\r\n" + 
        "@attribute R1 numeric\r\n" + 
        "@attribute R2 numeric\r\n" + 
        "@attribute R3 numeric\r\n" + 
        "@attribute R4 numeric\r\n" + 
        "@attribute A1 numeric\r\n" + 
        "@attribute A2 numeric\r\n" + 
        "@attribute Horario1 numeric\r\n" + 
        "@attribute Horario2 numeric\r\n" + 
        "@attribute Horario3 numeric\r\n" + 
        "@attribute cant_mensajes numeric\r\n" + 
        "\r\n" + 
        "@data\r\n" + 
        "colaborador,'Juan Ignacio Martinez',0,3,0,0,1,0,0,0,1,0.125,0.053571,0.375,0.047619,0.041667,0.345238,0.005952,0.005952,0,0,0,0,0.553571,0,0.011905,0.434524,0.553571,0.446429,0.25,0.303571,0.446429,168\r\n" + 
        "investigador,'Joaquin Cattaneo',2,0,0,0,0,0,1,0,1,0.070175,0.105263,0.684211,0,0,0.122807,0,0,0,0,0.017544,0,0.859649,0.017544,0,0.122807,0.877193,0.122807,0.105263,0.473684,0.421053,57\r\n" + 
        "coordinador,facundo.violante@gmail.com,2,0,0,0,0,1,0,1,0,0.122807,0.026316,0.438596,0.017544,0.026316,0.342105,0.008772,0.008772,0,0.008772,0,0,0.587719,0.008772,0.017544,0.385965,0.596491,0.403509,0.114035,0.377193,0.508772,114\r\n" + 
        "impulsor,'Ulises Pedrozo',0,0,1,0,0,1,1,1,0,0.1375,0.05,0.525,0.05,0.0375,0.175,0.025,0,0,0,0,0,0.7125,0,0.025,0.2625,0.7125,0.2875,0.375,0.375,0.25,80\r\n" + 
        "finalizador,'Roberto Ezequiel Pintos',1,0,0,0,0,1,2,0,0,0.133333,0.038095,0.619048,0.028571,0.009524,0.152381,0,0.019048,0,0,0,0,0.790476,0,0.019048,0.190476,0.790476,0.209524,0.314286,0.285714,0.4,105\r\n" + 
        "especialista,'Elvis Suarez',0,1,0,0,0,1,2,0,0,0.255814,0.139535,0.255814,0.023256,0.116279,0.139535,0,0.023256,0,0,0.046512,0,0.651163,0.046512,0.023256,0.27907,0.697674,0.302326,0.093023,0.488372,0.418605,43\r\n" + 
        "monitor,'Roque San Juan',1,1,0,1,0,1,0,0,0,0.21875,0.125,0.40625,0.09375,0.03125,0.125,0,0,0,0,0,0,0.75,0,0,0.25,0.75,0.25,0.03125,0.875,0.09375,32\r\n" + 
        "implementador,'Romina Bello',0,0,0,0,2,0,2,0,0,0.208333,0.104167,0.416667,0.0625,0,0.104167,0,0.104167,0,0,0,0,0.729167,0,0.104167,0.166667,0.729167,0.270833,0.020833,0.770833,0.208333,48\r\n" + 
        "cerebro,'Matias Adrian Peñalba Paz',1,0,0,1,0,1,1,0,0,0.12766,0.06383,0.382979,0.021277,0.021277,0.361702,0,0.021277,0,0,0,0,0.574468,0,0.021277,0.404255,0.574468,0.425532,0.042553,0.744681,0.212766,47"
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
                  name: features [1]
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
        <div className="shopping-list">
        <h1>Resultados</h1>
        { content }
      </div>
      );
    }
  }

  export default Resultados;