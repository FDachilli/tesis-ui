import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class SelectorArchivo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <input
                    accept=".json"
                    className={classes.input}
                    id="button-file"
                    onChange={this.props.onChange}
                    type="file"
                />
                <label htmlFor="button-file">
                    <Button variant="contained" color="primary" component="span" className={classes.button}>
                        Cargar archivo
                    </Button>
                </label>
            </div>
        );
    }
}


export default withStyles(styles) (SelectorArchivo);