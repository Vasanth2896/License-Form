import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@material-ui/core";
import FormFooter from './Formfooter/FormFooter';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import ProfessionalDetails from './ProfessionalDetails/ProfessionalDetails';
import AddressDetails from './AddressDetails/AddressDetails';
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../store/appActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NavigationStepper from '../Common/NavigationStepper';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#8080801f'
    },
}));

const FormLayout = (props) => {
    const { state, history } = props;
    const { student, professional, personalDetails, addressDetails, professionalDetailToggle, personalDetailError } = state;
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [errorFree, setErrorFree] = useState(false);
    const newCompleted = { ...completed };
    const newErrorFree = personalDetailError.usernameError || personalDetailError.mailIdError;
    const steps = [
        {
            id: 0,
            name: 'Personal Details',
            routePath: '/layout/PersonalDetails'
        },
        {
            id: 1,
            name: 'Address Details',
            routePath: '/layout/AddressDetails'
        },
        {
            id: 2,
            name: 'Professional Details',
            routePath: '/layout/ProfessionalDetails'
        }
    ];

    function handleBlankSpace(detail){
        return !detail.toString().replace(/\s/g, '').length <= 0;
    }

    function CheckPersonalDetailsStep() {
        const { dateOfBirth, preferredLanguage, productKnowledge, other, ...textDetails } = personalDetails;
        const productKnowledgeChecked = Object.values(productKnowledge).some(checked => checked);
        const textDetailsFilled = Object.values(textDetails).every(detail => handleBlankSpace(detail));
        const otherIsChecked = dateOfBirth && preferredLanguage.length &&
            productKnowledgeChecked && textDetailsFilled && productKnowledge.otherCheck && other !== '';
        const otherIsNotChecked = dateOfBirth && preferredLanguage.length
            && productKnowledgeChecked && textDetailsFilled && !productKnowledge.otherCheck;

            

        if (otherIsChecked || otherIsNotChecked) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        const personalDetailFlag = CheckPersonalDetailsStep();
        handleComplete(personalDetailFlag, 0);

    }, [personalDetails]);

    useEffect(() => {
        const { action, location } = history;
        if (action === 'POP') {
            const popStep = steps.find(step => step.routePath === location.pathname);
            setActiveStep(popStep.id);
        }
    });

    const backButtonNavigation = (stepItem) => {
        if (stepItem.id) {
            history.push(steps[stepItem.id - 1].routePath);
            setActiveStep(stepItem.id - 1);
        }
        else {
            history.push('/');
        }
    }

    const handleComplete = (completeflag, currentStep) => {
        newCompleted[currentStep] = completeflag;
        setCompleted({ ...newCompleted });
    };

    useEffect(() => {
        setErrorFree(newErrorFree);
        handleComplete(Object.values(addressDetails).every(detail => handleBlankSpace(detail)), 1);
        if (professionalDetailToggle === 'housewives') {
            handleComplete(true, 2);
        }
        else {
            handleComplete(Object.values(state[professionalDetailToggle]).every(detail =>  handleBlankSpace(detail)), 2);
        }

    }, [professional, student, professionalDetailToggle, addressDetails, newErrorFree]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        history.push(steps[activeStep + 1].routePath);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        history.push(steps[activeStep - 1].routePath);
    };

    const handleStep = (step) => {
        history.push(steps[step].routePath);
        setActiveStep(step);
    };

    return (
        <div >
            <Container style={{ height: '100vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '18%', marginBottom: '20px' }}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => backButtonNavigation(steps[activeStep])} style={{ cursor: 'pointer' }} />
                    <h3>Individual User</h3>
                </div>
                <Grid container spacing={7}>
                    <Grid item xs={3} style={{ cursor: errorFree ? 'not-allowed' : 'default' }} >
                        <NavigationStepper
                            stepperSteps={steps}
                            stepperClassname={classes.root}
                            activeStep={activeStep}
                            handleStep={handleStep}
                            completed={completed}
                            disabled={errorFree}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Redirect from='/' to={'/layout/PersonalDetails'} />
                            <Switch>
                                <Route path={'/layout/PersonalDetails'} render={() => <PersonalDetails {...props} />} />
                                <Route path={'/layout/AddressDetails'} render={() => <AddressDetails {...props} />} />
                                <Route path={'/layout/ProfessionalDetails'} render={() => <ProfessionalDetails {...props} />} />
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <FormFooter handleNext={handleNext} handleBack={handleBack} setActiveStep={setActiveStep} {...props} />
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
        errorValidation: appActions.errorValidation,
        onCancel: appActions.onCancel,
        onSave: appActions.onSave,
        onChange: appActions.app_onChange
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);