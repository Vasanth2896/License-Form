import React from 'react';
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    housewivesFormContainer: {
        background: '#8080801f',
        height: '30em'
    },
}));

const HousewivesForm = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.housewivesFormContainer}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <p>No Details necessary</p>
            </div>
        </Paper>
    )
}

export default HousewivesForm