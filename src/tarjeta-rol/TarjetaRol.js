import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './TarjetaRol.css';


class TarjetaRol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          srcImage: null,
          name: null,
          rol: null
        };
      }
      render() {
        return (
            <div>
            <Card style={{
                    width: '275px',
                    height: '110px',
                 }}>
                <CardContent>
                    <Typography className=".title" color="textSecondary">
                        Rol de usuario: {this.props.name}
                    </Typography>
                    <div style={{
                    width: '275px',
                    height: '50px',
                    display: 'flex', 
                    flexDirection: 'row'}}>
                        <img 
                        src={this.props.srcImage}
                        style={{widht: '50px', height: '50px', paddingRight:'5px', paddingTop: '5px'}}
                        />
                        <Typography variant="title" style={{paddingTop: '5px'}}>
                            {this.props.rol}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            </div>
        );
    }
}


export default TarjetaRol;