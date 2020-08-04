import React from 'react';
import { Paper, Grid, Box, TextField } from "@material-ui/core";
import _ from 'lodash'
import InputSelect from '../../Common/InputSelect';
import { IndianStates, currentQualificationList } from "../../../seed/seed";
import { professionalDetailsFormStyles } from '../../Common/commonStyles'

const StudentForm = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { student } = currentState;
    const classes = professionalDetailsFormStyles();
    const handleChange = (e) => {
        student[e.target.name] = e.target.value;
        onChange('student', student);
    }

    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputSelect
                            labelName='Current Qualification'
                            labelId='currentQualification'
                            name='currentQualification'
                            handleChange={handleChange}
                            value={student.currentQualification}
                            menuOptions={currentQualificationList}
                        />
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
                        <InputSelect
                            labelName='State'
                            labelId='state'
                            name='state'
                            handleChange={handleChange}
                            value={student.state}
                            menuOptions={IndianStates}
                        />
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
        </Paper >
    )
}

export default StudentForm;
