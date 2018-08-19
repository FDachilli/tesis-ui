import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './TarjetaRol.css';

const cardStyle = {
    cursor: 'pointer',
}

const divStyle = {
    display: 'flex', 
    flexDirection: 'row'
}
const labelStyle = {
    marginRight: '8px',
    marginBottom: '8px'
}

class TarjetaGrupo extends React.Component {
   
      getIntegrantes(){
      }

      getRolesFaltantes();

      render() {
        let integrantes = this.getIntegrantes();
        let rolesFaltantes = this.getRolesFaltantes();
        return (
            
            <div style={divStyle}>
                <div>
                    <div style={divStyle}>
                        <label style={labelStyle}><strong>Integrantes: </strong></label>
                        {integrantes}
                    </div>
                    <div style={divStyle}>
                        <label style={labelStyle}><strong>Roles faltantes: </strong></label>
                        {integrantes}
                    </div>
                </div>
            </div>
        );
    }
}


export default TarjetaGrupo;