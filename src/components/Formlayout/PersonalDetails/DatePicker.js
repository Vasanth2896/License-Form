import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Box } from '@material-ui/core';


const DatePicker = (props) => {

    const {personalDetails,onChange} = props;
  

    return (
        <Box>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} >
                <KeyboardDatePicker
                    clearable
                    label='Date Of birth'
                    value={personalDetails.dateOfBirth}
                    onChange={date => {
                        personalDetails['dateOfBirth'] = date
                        onChange('personalDetails', personalDetails);
                    }}
                    format="DD/MM/YYYY"
                    inputVariant='filled'
                    fullWidth
                />
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default DatePicker;