import React from 'react';
import { Paper, Grid, } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from '../../Common/InputSelect';
import InputText from '../../Common/InputText';
import { IndianStates, currentQualificationList } from "../../../seed/seed";
import { professionalDetailsFormStyles } from '../../Common/commonStyles'

const StudentForm = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { student } = currentState;
    const classes = professionalDetailsFormStyles();
    const handleChange = (e) => {
        student[e.target.name] = e.target.value
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
                        <InputText
                            label='Institution name'
                            name='institutionName'
                            value={student.institutionName || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Studying at'
                            name='studyingAt'
                            value={student.studyingAt || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            label='Institution Address'
                            name='institutionAddress'
                            value={student.institutionAddress || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Country'
                            name='country'
                            value={student.country || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='State'
                            labelId='state'
                            name='state'
                            handleChange={handleChange}
                            value={student.state || ''}
                            menuOptions={IndianStates}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='District'
                            name='district'
                            value={student.district || ''}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Pincode'
                            name='pincode'
                            value={student.pincode || ''}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper >
    )
}

export default StudentForm;
