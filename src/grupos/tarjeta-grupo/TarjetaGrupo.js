import React from 'react';
import { Card, Divider} from '@material-ui/core';
import './TarjetaGrupo.css';

class TarjetaGrupo extends React.Component {
   
      getIntegrantes(integrantes){
          let stringIntegrantes = "";
          for (let integrante of integrantes){
                stringIntegrantes += integrante.nombre.charAt(0)==="'" ? integrante.nombre.slice(1, -1) : integrante.nombre;
                stringIntegrantes += " (" + integrante.rolPrincipal +", "+ integrante.rolSecundario +  ")";
                stringIntegrantes += ", ";
          }
          stringIntegrantes = stringIntegrantes.substring(0, stringIntegrantes.length - 2);
          stringIntegrantes += ".";
          return stringIntegrantes;
      }

      getRolesFaltantes(roles){
        let stringRolesFaltantes = "";
        for (let rol of roles){
            stringRolesFaltantes += rol + ", ";
        }
        stringRolesFaltantes = stringRolesFaltantes.substring(0, stringRolesFaltantes.length - 2);
        stringRolesFaltantes += ".";
        return stringRolesFaltantes;
      }
      

      render() {
        let integrantes = this.getIntegrantes(this.props.grupo.integrantes);
        let rolesFaltantes = this.getRolesFaltantes(this.props.grupo.rolesFaltantes);
        return (
            <Card className="div-style">
                <div>
                    <div className="div-top-style">
                        <label className="label-style"><strong>Integrantes: </strong></label>
                        {integrantes}
                    </div>
                    {rolesFaltantes !== '.' && <div className="div-style">
                        <label className="label-roles-style"><strong>Roles faltantes: </strong></label>
                        <p className="text-roles-style">{rolesFaltantes}</p>
                    </div>}
                </div>
                <Divider/>
            </Card>
        );
    }
}


export default TarjetaGrupo;