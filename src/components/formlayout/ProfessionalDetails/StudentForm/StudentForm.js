import React from 'react';
import {
    Paper, makeStyles, Grid, Box, FormControl,
    TextField, Select, MenuItem, InputLabel
} from "@material-ui/core";
import { states } from '../../../../seed/stateSeed'
import { connect } from 'react-redux';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../../../store/appActions';


const useStyles = makeStyles((theme) => ({
    studentFormContainer: {
        background: '#8080801f',
        height: '30em'
    },
}));

const StudentForm = (props) => {
    const { state,onChange } = props;
    const currentState = _.cloneDeep(state);
    const { student } = currentState;
    const classes = useStyles();
    const indianStates = [...states];
    const renderStateOptions = indianStates.map(state => {
        return (
            <MenuItem key={state} value={state}>{state}</MenuItem>
        )
    });

    const handleChange = (e) => {
        student[e.target.name] = e.target.value;
        onChange('student', student);
    }

    return (
        <Paper className={classes.studentFormContainer}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box >
                            <FormControl fullWidth>
                                <InputLabel id="currentQualification" style={{ paddingLeft: 10 }}>Current Qualification</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="currentQualification"
                                    name='currentQualification'
                                    value={student.currentQualification}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <MenuItem value='B.E' >B.E</MenuItem>
                                    <MenuItem value='B.tech'>B.tech</MenuItem>
                                    <MenuItem value='PG'>PG</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='Institution name'
                                name='institutionName'
                                value={student.institutionName}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='Studying at'
                                name='studyingAt'
                                value={student.studyingAt}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='Institution Address'
                                name='institutionAddress'
                                value={student.institutionAddress}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='Country'
                                name='country'
                                value={student.country}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="state" style={{ paddingLeft: 10 }}>State</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="state"
                                    id="state"
                                    name='state'
                                    value={student.state}
                                    onChange={(e) => handleChange(e)}
                                >
                                    {renderStateOptions}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='District'
                                name='district'
                                value={student.district}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                variant='filled'
                                label='Pincode'
                                name='pincode'
                                value={student.pincode}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                            />
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

export default connect(mapStateToProps,mapDispatchToProps)(StudentForm);
