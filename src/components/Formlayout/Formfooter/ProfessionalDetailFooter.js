import React from "react";
import { Button } from "@material-ui/core";
import { footerButtonStyles } from "../../Common/commonStyles";

const ProfessionalDetailFooter = (props) => {

    const { history, handleBack, errorValidation, onSave, setActiveStep, state } = props;
    const { editableIndex } = state;
    const classes = footerButtonStyles();

    const handleSave = () => {
        const isValid = errorValidation();
        if (isValid) {
            onSave();
            history.push('/');
        }
        else {
            setActiveStep(0);
            history.push('/layout/PersonalDetails');
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={() => {
                    handleBack();
                }}
            >previous</Button>
            <Button
                variant='contained'
                onClick={handleSave}
                className={classes.proceed}
            >{editableIndex !== null ? 'update':'save'}</Button>
        </div>
    )
}

export default ProfessionalDetailFooter;