import React from 'react';
import { Button } from "@material-ui/core";
import { footerButtonStyles } from "../../Common/commonStyles";

const PersonalDetailFooter = (props) => {

    const { history, handleNext, errorValidation,onCancel } = props;
    const classes = footerButtonStyles();


    const handleCancel = () => {
        history.push('/');
        onCancel();
    }

    const handleErrorValidation = async () => {
        const isValid =  await errorValidation();
        if (isValid) {
            handleNext();
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleCancel}
            >cancel</Button>
            <Button
                variant='contained'
                onClick={() => handleErrorValidation()}
                className={classes.proceed}
            >next</Button>
        </div>
    )
}

export default PersonalDetailFooter;


