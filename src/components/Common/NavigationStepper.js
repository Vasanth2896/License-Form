import React from 'react';
import { Stepper, Step, StepButton } from '@material-ui/core/';
import './NavigationStepper.scss';

const NavigationStepper = (props) => {

    const { stepperSteps,stepperClassname, activeStep, handleStep, completed, disabled } = props
    
    return (
        <div>
            <Stepper elevation={2} className={stepperClassname} activeStep={activeStep} nonLinear orientation="vertical">
                {stepperSteps.map((step) => (
                    <Step key={step.id}>
                        <StepButton onClick={() => handleStep(step.id)} completed={completed[step.id]} disabled={disabled} >
                            {step.name}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default NavigationStepper;