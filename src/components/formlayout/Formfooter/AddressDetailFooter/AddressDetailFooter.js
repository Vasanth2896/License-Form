import React from 'react';
import { Button } from "@material-ui/core";

const AddressDetailFooter = (props) => {
    const {history,handleNext,handleBack} = props;

    return (
        <div>
            <Button
                variant='contained'
                onClick={() => {
                    history.push('/layout/PersonalDetails');
                    handleBack();
                }}
            >previous</Button>
            <Button
                variant='contained'
                onClick={() => {
                    history.push('/layout/ProfessionalDetails');
                    handleNext();
                }}
                style={{ background: 'blue', color: 'white' }}
            >next</Button>
        </div>
    )

}

export default AddressDetailFooter;