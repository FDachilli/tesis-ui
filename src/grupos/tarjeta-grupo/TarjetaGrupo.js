import React from 'react';
import { Card, Divider} from '@material-ui/core';

const divTopStyle = {
    marginTop: '8px',
    display: 'flex', 
    flexDirection: 'row'
}

const divStyle = {
    display: 'flex', 
    flexDirection: 'row'
}

const labelStyle = {
    marginRight: '8px',
    marginBottom: '8px'
}


const labelRolesStyle = {
    marginTop: '12px',
    marginRight: '8px',
    fontSize: '12px', 
    color: 'red'
}

const textRolesStyle = {
    fontSize: '12px', 
    color: 'red'
}


class TarjetaGrupo extends React.Component {
   
      getIntegrantes(integrantes){
          let stringIntegrantes = "";
          for (let integrante of integrantes){
                stringIntegrantes += integrante.nombre.charAt(0)=="'" ? integrante.nombre.slice(1, -1) : integrante.nombre;
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
            <Card style={divStyle}>
                <div>
                    <div style={divTopStyle}>
                        <label style={labelStyle}><strong>Integrantes: </strong></label>
                        {integrantes}
                    </div>
                    {rolesFaltantes != '.' && <div style={divStyle}>
                        <label style={labelRolesStyle}><strong>Roles faltantes: </strong></label>
                        <p style={textRolesStyle}>{rolesFaltantes}</p>
                    </div>}
                </div>
                <Divider/>
            </Card>
        );
    }
}


export default TarjetaGrupo;