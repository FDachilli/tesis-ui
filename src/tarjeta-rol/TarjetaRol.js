import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import './TarjetaRol.css';
import { Divider } from '@material-ui/core';

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

class TarjetaRol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
        };
        this.handleCardClick = this.handleCardClick.bind(this)
      }

      getData(resultado, tipoProcesamiento){
        var resjson = {};
        var features = resultado.split(",");
        if (tipoProcesamiento == "directo"){
            resjson["rol"]=features[0];
            resjson["nombre"]=features[1];
            resjson["rol_companeros"]=features[2];
            resjson["horario1"]=features[21];
            resjson["horario2"]=features[22];
            resjson["horario3"]=features[23];
            resjson["dominante"]=features[24];
            resjson["sumiso"]=features[25];
            resjson["amistoso"]=features[26];
            resjson["no_amistoso"]=features[27];
            resjson["tarea"]=features[28];
            resjson["socio_emocional"]=features[29];
            resjson["participacion"]=features[30];
        }else{
            resjson["rol"]=features[0];
            resjson["tipo_rol"]=features[1];
            resjson["nombre"]=features[2];
            resjson["tipo_rol_companeros"]=features[3];
            resjson["rol_companeros"]=features[4];
            resjson["horario1"]=features[23];
            resjson["horario2"]=features[24];
            resjson["horario3"]=features[25];
            resjson["dominante"]=features[26];
            resjson["sumiso"]=features[27];
            resjson["amistoso"]=features[28];
            resjson["no_amistoso"]=features[29];
            resjson["tarea"]=features[30];
            resjson["socio_emocional"]=features[31];
            resjson["participacion"]=features[32];
        }
        return resjson;
      }

      handleCardClick(){
          this.setState({open: !this.state.open})
      }

      render() {
        let data = this.getData(this.props.resultado, this.props.tipoProcesamiento);
        let cuerpo = this.props.tipoProcesamiento == "directo" ? 
                        <div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Rol asignado por compañeros: </strong></label>
                                {data.rol_companeros.charAt(0).toUpperCase() + data.rol_companeros.slice(1)}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en introducción: </strong></label>
                                {data.horario1}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en desarrollo: </strong></label>
                                {data.horario2}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en finalización: </strong></label>
                                {data.horario3}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Dominante (SYMLOG): </strong></label>
                                {data.dominante}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Sumiso (SYMLOG): </strong></label>
                                {data.sumiso}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Amistoso (SYMLOG): </strong></label>
                                {data.amistoso}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>No amistoso (SYMLOG): </strong></label>
                                {data.no_amistoso}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Tarea (SYMLOG): </strong></label>
                                {data.tarea}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Socio emocional (SYMLOG): </strong></label>
                                {data.socio_emocional}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Participación </strong></label>
                                {data.participacion}
                            </div>
                          
                        </div>
                        :
                        <div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Tipo de Rol: </strong></label>
                                {data.tipo_rol.charAt(0).toUpperCase() + data.tipo_rol.slice(1)}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Rol asignado por compañeros: </strong></label>
                                {data.rol_companeros.charAt(0).toUpperCase() + data.rol_companeros.slice(1)}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Tipo de Rol asignado por compañeros: </strong></label>
                                {data.tipo_rol_companeros.charAt(0).toUpperCase() + data.tipo_rol_companeros.slice(1)}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en introducción: </strong></label>
                                {data.horario1}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en desarrollo: </strong></label>
                                {data.horario2}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Mensajes en finalización: </strong></label>
                                {data.horario3}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Dominante (SYMLOG): </strong></label>
                                {data.dominante}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Sumiso (SYMLOG): </strong></label>
                                {data.sumiso}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Amistoso (SYMLOG): </strong></label>
                                {data.amistoso}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>No amistoso (SYMLOG): </strong></label>
                                {data.no_amistoso}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Tarea (SYMLOG): </strong></label>
                                {data.tarea}
                            </div>
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Socio emocional (SYMLOG): </strong></label>
                                {data.socio_emocional}
                            </div>
                        
                            <div style={divStyle}>
                                <label style={labelStyle}><strong>Participación </strong></label>
                                {data.participacion}
                            </div>
                        </div>;



        return (
            
            <div>
            {data && <Card style={cardStyle} onClick={this.handleCardClick}>
                <CardHeader avatar={
                    <Avatar aria-label="Recipe" src={require('../resources/roles/' + data.rol + '.png')}/>}
                    title= {data.nombre.charAt(0)=="'" ? data.nombre.slice(1, -1) : data.nombre}
                    subheader={data.rol.charAt(0).toUpperCase() + data.rol.slice(1)}/>
                <Divider/>                
                {this.state.open && 
                <CardContent>
                    {cuerpo}
                </CardContent>}
            </Card>}
            </div>
        );
    }
}


export default TarjetaRol;