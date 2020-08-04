import React from 'react';
import { Paper } from "@material-ui/core";
import { professionalDetailsFormStyles } from '../../Common/commonStyles'

const HousewivesForm = () => {
    const classes = professionalDetailsFormStyles();

    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <p>No Details necessary</p>
            </div>
        </Paper>
    )
}

export default HousewivesForm