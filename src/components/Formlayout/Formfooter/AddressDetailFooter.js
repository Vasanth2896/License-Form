import React from 'react';
import { Button } from "@material-ui/core";
import { footerButtonStyles } from "../../Common/commonStyles";

const AddressDetailFooter = (props) => {
    const {handleNext,handleBack} = props;
    const classes = footerButtonStyles();
    return (
        <div>
            <Button
                variant='contained'
                onClick={() => handleBack()}
            >previous</Button>
            <Button
                variant='contained'
                onClick={() => handleNext()}
                className={classes.proceed}
            >next</Button>
        </div>
    )

}

export default AddressDetailFooter;