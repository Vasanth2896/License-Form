import React, { useState } from 'react';
import { Grid, Paper, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import StudentForm from './StudentForm';
import ProfessionalForm from './ProfessionalForm';
import HousewivesForm from './HousewivesForm';
import _ from 'lodash'
import { professionalDetailRadioButtonStyles } from '../../Common/commonStyles'
import AlertBox from './AlertBox';

const ProfessionalDetails = (props) => {
    const classes = professionalDetailRadioButtonStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { professional, student, professionalDetailToggle, editableIndex } = currentState;
    const [professionalValue, setProfessionalValue] = useState(professionalDetailToggle);
    const [open, setOpen] = useState(false);
    const [editProfessionalValue, setEditProfessionalvalue] = useState(null);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setProfessionalValue(editProfessionalValue);
        onChange('professionalDetailToggle', editProfessionalValue);
        dataClearance();
        setOpen(false);
    }

    const handleRadioChange = (e) => {
        if (editableIndex !== null) {
            handleClickOpen();
            setEditProfessionalvalue(e.target.value);
        }
        else {
            setEditProfessionalvalue(null);
            setProfessionalValue(e.target.value);
            onChange('professionalDetailToggle', e.target.value);
            dataClearance();
        }
    }

    function dataClearance() {
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
                        <RadioGroup aria-label="professionals" name="professionals" onChange={(e) => { handleRadioChange(e) }} value={professionalValue} className={classes.professionalRadioButtons} row>
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
                    {professionalValue === 'student' && <StudentForm {...props} />}
                    {professionalValue === 'professional' && <ProfessionalForm  {...props}/>}
                    {professionalValue === 'housewives' && <HousewivesForm   {...props}/>}
                    <AlertBox open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} handleOk={handleOk} professionalValue={professionalValue} />
                </Grid>
            </Grid>
        </div>
    )

}

export default ProfessionalDetails;
