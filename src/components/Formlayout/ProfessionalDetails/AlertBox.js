import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Button} from "@material-ui/core";

const AlertBox = (props) => {

    const { handleClose, open, handleOk } = props;

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30em' }}  >
                <h2>Do you wish to proceed?</h2>
                <p><b>Note: </b>This Results in data loss</p>
            </div>
            <div style={{ height: '5em', width: '12em', margin: 'auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                    <Button variant='contained' color='primary' onClick={() => handleOk(props.professionalValue)}>ok</Button>
                </div>
                <div>
                    <Button variant='contained' color='primary' onClick={() => handleClose(props.professionalValue)}>cancel</Button>
                </div>
            </div>
        </Dialog >
    );
}

export default AlertBox;
