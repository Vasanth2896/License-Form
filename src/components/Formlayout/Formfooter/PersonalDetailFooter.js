import React from 'react';
import { Button } from "@material-ui/core";

const PersonalDetailFooter = (props) => {

    const { history, handleNext, errorValidation,onCancel } = props
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
                style={{ background: 'blue', color: 'white' }}
            >next</Button>
        </div>
    )
}

export default PersonalDetailFooter;


