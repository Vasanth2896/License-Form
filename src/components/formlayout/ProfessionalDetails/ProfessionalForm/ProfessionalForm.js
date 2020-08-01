import React from 'react';
import {
    Paper, makeStyles, Grid, Box, FormControl,
    Select, MenuItem, InputLabel
} from "@material-ui/core";
import { connect } from 'react-redux';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../../../store/appActions'
import { professionalDetails } from '../../../../seed/routeSeed';

const useStyles = makeStyles((theme) => ({
    ProfessionalFormContainer: {
        background: '#8080801f',
        height: '30em'
    },
}));

const ProfessionalForm = (props) => {
    const classes = useStyles();
    const { state,onChange } = props;
    const currentState = _.cloneDeep(state);
    const { professional } = currentState;

    const handleChange = (e) => {
        professional[e.target.name] = e.target.value;
        onChange('professional',professional);
    }

    return (
        <Paper className={classes.ProfessionalFormContainer}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box >
                            <FormControl fullWidth>
                                <InputLabel id="level" style={{ paddingLeft: 10 }}>Level</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="level"
                                    id="level"
                                    name='level'
                                    onChange={(e) => handleChange(e)}
                                    value={professional.level}
                                >
                                    <MenuItem value='Junior' >Junior</MenuItem>
                                    <MenuItem value='Senior' >Senior</MenuItem>
                                    <MenuItem value='Super Senior' >Super Senior</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="salary" style={{ paddingLeft: 10 }}>Salary per annum</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="salary"
                                    name='salary'
                                    value={professional.salary}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <MenuItem value='1-5 Lakhs' >1-5 Lakhs</MenuItem>
                                    <MenuItem value='5-10 Lakhs' >5-10 lakhs</MenuItem>
                                    <MenuItem value='10-15 Lakhs' >10-15 Lakhs</MenuItem>
                                    <MenuItem value='Above 15 Lakhs'>Above 15 Lakhs</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                </Grid>
            </div>
        </Paper>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChange: app_onChange
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalForm);

