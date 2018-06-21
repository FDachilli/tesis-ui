import React from 'react';
import { FilePicker } from 'react-file-picker';
import {Button} from '@material-ui/core';
import './selector-archivo.css';



class SelectorArchivo extends React.Component {

    render() {
        return (
            <span className="btn btn-primary btn-file">
                Cargar archivo<input type="file" 
                    onChange={this.props.onChange}
                    accept=".jpg"/>
            </span>
        );
    }
}

export default SelectorArchivo;