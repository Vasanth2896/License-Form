import React from 'react';
import {
    Box, FormLabel, FormControlLabel, FormControl, FormGroup, Checkbox
} from '@material-ui/core';


const CheckboxGroup = (props) => {

    const { checkboxList, formLabel, handleChange, formGroupClassName } = props;
    return (
        <Box>
            <FormControl fullWidth>
                <FormLabel component="legend">{formLabel}</FormLabel>
                <FormGroup className={formGroupClassName} onChange={handleChange} row>
                    {checkboxList.map(checkboxes => {
                        return (
                            <FormControlLabel

                                control={<Checkbox color='primary' checked={checkboxes.value} />}
                                label={checkboxes.label}
                                name={checkboxes.name}
                                key={checkboxes.id}
                            ></FormControlLabel>
                        )
                    })}
                    </FormGroup>
            </FormControl>
        </Box>
    )

}

export default CheckboxGroup;