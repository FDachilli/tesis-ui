import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './tarjeta-rol.css';


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
                    height: '100px',
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
                        <Typography variant="headline" component="h2">
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