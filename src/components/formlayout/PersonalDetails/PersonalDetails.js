import React from 'react';
import './PersonalDetails.scss'
import {
    TextField, Paper, Grid, Box, RadioGroup, FormLabel, FormControlLabel, Radio, makeStyles, withStyles,
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Autocomplete } from "@material-ui/lab";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import { app_onChange } from '../../../store/appActions';
import InputSelect from '../../common/InputSelect';
import { languages } from '../../../seed/seed'
import CheckboxGroup from '../../common/CheckboxGroup';
import { personalDetailStyles  } from "../../common/commonStyles";

const CustomAutocomplete = withStyles({
    tag: {
        backgroundColor: "#BFB6AA",
        height: 24,
        position: "relative",
        zIndex: 0,
        "& .MuiChip-label": {
            color: "black"
        },
        "&:after": {
            content: '""',
            position: "absolute",
            backgroundColor: "grey",
            zIndex: -1
        }
    }
})(Autocomplete);

const PersonalDetails = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { personalDetails, personalDetailError } = currentState;
    const { productKnowledge } = personalDetails;
    const classes = personalDetailStyles();
    const handleChange = (e) => {
        personalDetails[e.target.name] = e.target.value;
        onChange('personalDetails', personalDetails);
        if (e.target.name === 'username' || e.target.name === 'mailId') {
            personalDetailError[`${e.target.name}Error`] = false;
            personalDetailError[`${e.target.name}HelperText`] = ''
            onChange('personalDetailError', personalDetailError);
        }
    }

    const onTagsChange = (e, values) => {
        personalDetails['preferredLanguage'] = values;
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
        <Paper className='personalDetailsContainer' elevation={2}>
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
                                value={personalDetails.username}
                                error={personalDetailError.usernameError}
                                helperText={personalDetailError.usernameHelperText}
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.genderGroupContainer}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={personalDetails.gender} className={classes.genderContainer} onChange={(e) => handleChange(e)} row>
                                <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
                                <FormControlLabel value='female' control={<Radio color='primary' />} label="Female" />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
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
                        <Box>
                            <CustomAutocomplete
                                multiple
                                id="tags-standard"
                                value={personalDetails.preferredLanguage}
                                options={languages}
                                getOptionLabel={language => language.name}
                                onChange={(onTagsChange)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Preferred languages for the app"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                        </Box>
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

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChange: app_onChange
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
