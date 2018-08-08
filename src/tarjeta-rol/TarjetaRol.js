import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './TarjetaRol.css';

const styleImage = {widht: '50px', 
                    height: '50px', 
                    paddingRight:'5px', 
                    paddingTop: '5px',
                    paddingBottom: '10px'}

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
                    <div className="TarjetaRol" style={{margin: 'auto'}}>
                        <img 
                        src={this.props.srcImage}
                        style={styleImage}
                        />
                        <Typography variant="title" style={{margin: 'auto'}}>
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