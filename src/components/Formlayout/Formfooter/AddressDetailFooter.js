import React from 'react';
import { Button } from "@material-ui/core";

const AddressDetailFooter = (props) => {
    const {handleNext,handleBack} = props;
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
                onClick={() => {
                    handleNext();
                }}
                style={{ background: 'blue', color: 'white' }}
            >next</Button>
        </div>
    )

}

export default AddressDetailFooter;