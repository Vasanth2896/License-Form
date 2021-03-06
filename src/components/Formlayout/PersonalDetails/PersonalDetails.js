import React from 'react';
import {
    TextField, Paper, Grid, Box, RadioGroup, FormLabel, FormControlLabel, Radio, 
} from '@material-ui/core';
import _ from 'lodash'
import InputSelect from '../../Common/InputSelect';
import { languages } from '../../../seed/seed'
import CheckboxGroup from '../../Common/CheckboxGroup';
import { personalDetailStyles } from "../../Common/commonStyles";
import DatePicker from "./DatePicker";
import LanguageAutoComplete from './LanguageAutoComplete';

const PersonalDetails = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { personalDetails, personalDetailError } = currentState;
    const { productKnowledge } = personalDetails;
    const classes = personalDetailStyles();
    const handleChange = (e, values) => {
        console.log(e, values);
        personalDetails[e.target.name] = e.target.value;

        if (values) {
            personalDetails['preferredLanguage'] = values;
        }

        if ((e.target.name === 'username' || e.target.name === 'mailId') && !e.target.value.toString().replace(/\s/g, '').length <= 0) {
            personalDetailError[`${e.target.name}Error`] = false;
            personalDetailError[`${e.target.name}HelperText`] = ''
            onChange('personalDetailError', personalDetailError);
        }

        onChange('personalDetails', personalDetails);
    }

    const handleCheckChange = (e) => {
        productKnowledge[e.target.name] = e.target.checked
        if (!productKnowledge['otherCheck']) {
            personalDetails.other = ''
        }
        onChange('personalDetails', personalDetails);
    }

    const checkboxList = [
        {
            id: 0,
            label: 'Newspaper / Ads',
            name: 'newspaperCheck',
            value: productKnowledge.newspaperCheck
        },
        {
            id: 1,
            label: 'TV media',
            name: 'tvCheck',
            value: productKnowledge.tvCheck
        },
        {
            id: 2,
            label: 'Facebook',
            name: 'facebookCheck',
            value: productKnowledge.facebookCheck
        },
        {
            id: 3,
            label: 'LinkedIn',
            name: 'linkedInCheck',
            value: productKnowledge.linkedInCheck
        },
        {
            id: 4,
            label: 'By Friend',
            name: 'byFriendCheck',
            value: productKnowledge.byFriendCheck
        },
        {
            id: 5,
            label: 'Others',
            name: 'otherCheck',
            value: productKnowledge.otherCheck
        }
    ]

    return (
        <Paper style={{ background: '#8080801f', height: 'auto' }} elevation={2}>
            <div style={{ padding: '25px 40px 40px 40px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='User name'
                                onChange={(e) => handleChange(e)}
                                name='username'
                                value={personalDetails.username || ''}
                                error={personalDetailError.usernameError}
                                helperText={personalDetailError.usernameHelperText}
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.genderGroupContainer}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={personalDetails.gender || 'male'} className={classes.genderContainer} onChange={(e) => handleChange(e)} row>
                                <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
                                <FormControlLabel value='female' control={<Radio color='primary' />} label="Female" />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            personalDetails={personalDetails}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Age'
                                onChange={(e) => handleChange(e)}
                                name='age'
                                value={personalDetails.age}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                type='email'
                                variant='filled'
                                label='Mail id'
                                onChange={(e) => handleChange(e)}
                                name='mailId'
                                value={personalDetails.mailId}
                                error={personalDetailError.mailIdError}
                                helperText={personalDetailError.mailIdHelperText}
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Mobile no'
                                onChange={(e) => handleChange(e)}
                                name='mobileNumber'
                                value={personalDetails.mobileNumber}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Mother Tongue'
                            labelId='motherTongue'
                            name='motherTongue'
                            handleChange={handleChange}
                            value={personalDetails.motherTongue}
                            menuOptions={languages}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        < LanguageAutoComplete
                            personalDetails={personalDetails}
                            languages={languages}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CheckboxGroup
                            checkboxList={checkboxList}
                            formLabel='How you come to know about the product?'
                            handleChange={handleCheckChange}
                            formGroupClassName={classes.feedbackCheckboxContainer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={productKnowledge.otherCheck ? classes.showOrder : classes.hideOrder} >
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Other'
                                name='other'
                                value={personalDetails.other}
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}


export default PersonalDetails;
