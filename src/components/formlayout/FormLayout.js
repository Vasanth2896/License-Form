import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Toolbar, Grid } from "@material-ui/core";
import { Stepper, Step, StepButton } from '@material-ui/core/';
import FormFooter from './Formfooter/FormFooter';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import ProfessionalDetails from './ProfessionalDetails/ProfessionalDetails';
import AddressDetails from './AddressDetails/AddressDetails';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorValidation } from '../../store/appActions'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './FormLayout.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#8080801f'
    },
}));

function getSteps() {
    return ['Personal Details', 'Address Details', 'Professional Details'];
}


const FormLayout = (props) => {
    const { state } = props;
    const { student, professional, personalDetails, addressDetails, professionalDetailToggle, personalDetailError } = state;
    const history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [errorFree, setErrorFree] = useState(false);
    const steps = getSteps();
    const newCompleted = { ...completed };

    const newErrorFree = personalDetailError.usernameError || personalDetailError.mailIdError;

    const data = _.cloneDeep(personalDetails);
    let test = false, productknowledgecheckflag = false, dateFlag = false, testingFlag = false, optionalFlag = false;
    let testing = [];

    const dummy = (data) => {

        for (let key in data) {
            if (typeof (data[key]) === 'object') {
                if (Array.isArray(data[key])) {
                    test = data[key].length > 0 ? true : false
                }
                else {
                    if (key === 'dateOfBirth') {
                        dateFlag = data[key] !== null ? true : false;
                    }
                    else {
                        productknowledgecheckflag = Object.values(data[key]).some(detail => detail)
                    }
                }
            }
            else {
                if (key === 'other' && data['productKnowledge'].otherCheck) {
                    optionalFlag = data[key] !== '' ? true : false;
                } else if (key !== 'other') {
                    testing.push(data[key]);
                    testingFlag = testing.every(detail => detail !== '');
                }
            }
        }
    }

    dummy(data);
    const mainFlag = [test, productknowledgecheckflag, dateFlag, testingFlag].every(flag => flag);

    useEffect(() => {

        if (mainFlag && !optionalFlag) {
            console.log('This is if in personal details');
            handleComplete(mainFlag)
        }
        else if (mainFlag && optionalFlag) {
            console.log('This is else if in personal details');
            handleComplete(mainFlag);
        }
        else {
            console.log('This is else  in personal details');
            handleComplete(false);
        }
    }, [mainFlag, optionalFlag])

    const backButtonNavigation = () => {
        const dummy = ['/layout/PersonalDetails', '/layout/AddressDetails', '/layout/ProfessionalDetails'];
        if (history.location.pathname === '/layout/PersonalDetails') {
            history.push('/');
        }
        else {
            handleStep(dummy.indexOf(dummy.find(path => path === history.location.pathname)) - 1);
            history.push(dummy[dummy.indexOf(dummy.find(path => path === history.location.pathname)) - 1]);
        }
    }

    const handleComplete = (dum, currentStep) => {
        console.log(dum, 'dum');
        if (currentStep) {
            newCompleted[currentStep] = dum;
        }
        else {
            newCompleted[activeStep] = dum;
        }
        setCompleted({ ...newCompleted });
    };

    useEffect(() => {
        setErrorFree(newErrorFree);
    });

    useEffect(() => {
        console.log(addressDetails, activeStep, `This is address Details in  use Effect`);
        handleComplete(Object.values(addressDetails).every(detail => detail !== ''), 1);
        console.log(newCompleted, 'This is newCompleted in useEffect')

    }, [addressDetails]);

    useEffect(() => {
        handleComplete(Object.values(professional).every(detail => detail !== ''));
    }, [professional]);

    useEffect(() => {
        handleComplete(Object.values(student).every(detail => detail !== ''));
    }, [student]);

    useEffect(() => {
        if (professionalDetailToggle === 'housewives') {
            handleComplete(true);
        }
        else {
            handleComplete(false);
        }
    }, [professionalDetailToggle]);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step, label) => {
        if (label === 'Personal Details') {
            history.push('/layout/PersonalDetails');
        }
        else if (label === 'Address Details') {
            history.push('/layout/AddressDetails');
        } else if (label === 'Professional Details') {
            history.push('/layout/ProfessionalDetails');
        }
        setActiveStep(step);
    };

    return (
        <div >
            <Container style={{ height: '100vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '25%' }}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={backButtonNavigation} style={{ cursor: 'pointer' }} />
                    <h2>Individual User</h2>
                </div>
                <Grid container spacing={7}>
                    <Grid item xs={3}>
                        <Stepper elevation={2} className={classes.root} activeStep={activeStep} nonLinear orientation="vertical">
                            {steps.map((label, index) => ( // step.id step.index
                                <Step key={label}>
                                    <StepButton onClick={() => handleStep(index, label)} completed={completed[index]} disabled={errorFree} >
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Redirect from='/' to={'/layout/PersonalDetails'} />
                            <Switch>
                                <Route path={'/layout/PersonalDetails'} render={() => <PersonalDetails />} />
                                <Route path={'/layout/AddressDetails'} render={() => <AddressDetails />} />
                                <Route path={'/layout/ProfessionalDetails'} render={() => <ProfessionalDetails />} />
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <FormFooter handleNext={handleNext} handleBack={handleBack} setActiveStep={setActiveStep} />
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        errorValidation: errorValidation,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);