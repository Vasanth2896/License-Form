import React, { useState } from 'react';
import { Grid, Paper, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import StudentForm from './StudentForm/StudentForm';
import ProfessionalForm from './ProfessionalForm/ProfessionalForm';
import HousewivesForm from './HousewivesForm/HousewivesForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../../store/appActions'
import _ from 'lodash'
import { professionalDetailRadioButtonStyles } from '../../common/commonStyles'

const ProfessionalDetails = (props) => {
    const classes = professionalDetailRadioButtonStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { professional, student, professionalDetailToggle } = currentState;
    const [professionalValue, setProfessionalValue] = useState(professionalDetailToggle);

    const handleRadioChange = (e) => {
        setProfessionalValue(e.target.value);
        onChange('professionalDetailToggle', e.target.value);
        if (professionalValue === 'student') {
            Object.assign(student, {
                currentQualification: '',
                institutionName: '',
                studyingAt: '',
                institutionAddress: '',
                district: '',
                state: '',
                country: '',
                pincode: '',
            });
            onChange('student', student);
        }
        else if (professionalValue === 'professional') {
            Object.assign(professional, {
                level: '',
                salary: ''
            })
            onChange('professional', professional);
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                >
                    <Paper elevation={2} className={classes.professionalRadioButtonContainer}>
                        <RadioGroup aria-label="professionals" name="professionals" onChange={(e) => handleRadioChange(e)} value={professionalValue} className={classes.professionalRadioButtons} row>
                            <FormControlLabel value="student" control={<Radio color='primary' />} label="Student" />
                            <FormControlLabel value="professional" control={<Radio color='primary' />} label="Professional" />
                            <FormControlLabel value="housewives" control={<Radio color='primary' />} label="Housewives" />
                        </RadioGroup>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    {professionalValue === 'student' && <StudentForm />}
                    {professionalValue === 'professional' && <ProfessionalForm />}
                    {professionalValue === 'housewives' && <HousewivesForm />}
                </Grid>
            </Grid>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetails);