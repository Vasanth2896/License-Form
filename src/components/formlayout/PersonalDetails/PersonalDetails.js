import React from 'react';
import './PersonalDetails.scss'
import {
    TextField, Paper, Grid, Box, RadioGroup, FormLabel, FormControlLabel,
    Radio, makeStyles, FormControl, FormGroup, Checkbox, withStyles, Select,
    InputLabel, MenuItem
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { languages } from "../../../seed/languageSeed";
import { Autocomplete } from "@material-ui/lab";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import { app_onChange } from '../../../store/appActions';

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

const useStyles = makeStyles((theme) => ({

    genderGroupContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    genderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '20em'
    },
    feedbackCheckboxContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100
    },
    showOrder: {
        display: 'block'
    },
    hideOrder: {
        display: 'none'
    }
}));

const PersonalDetails = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { personalDetails, personalDetailError } = currentState;
    const { productKnowledge } = personalDetails;
    const classes = useStyles();
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

    const renderLanguageOptions = languages.map(language => {
        return (
            <MenuItem key={language} value={language}>{language}</MenuItem>
        )
    });

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
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="motherTongue" style={{ paddingLeft: 10 }}>Mother Tongue</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="motherTongue"
                                    name='motherTongue'
                                    value={personalDetails.motherTongue}
                                    onChange={(e) => handleChange(e)}
                                >
                                    {renderLanguageOptions}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <CustomAutocomplete
                                multiple
                                id="tags-standard"
                                value={personalDetails.preferredLanguage}
                                options={languages}
                                getOptionLabel={language => language}
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
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">How you come to know about the product?</FormLabel>
                            <FormGroup className={classes.feedbackCheckboxContainer} onChange={(e) => handleCheckChange(e)} row>
                                <FormControlLabel
                                    control={<Checkbox color='primary' checked={productKnowledge.newspaperCheck} />}
                                    label="Newspaper / Ads"
                                    name='newspaperCheck'
                                /><FormControlLabel

                                    control={<Checkbox color='primary' checked={productKnowledge.tvCheck} />}
                                    label="TV media"
                                    name='tvCheck'

                                />
                                <FormControlLabel
                                    control={<Checkbox color='primary' checked={productKnowledge.faceBookCheck} />}
                                    label="Facebook"
                                    name='faceBookCheck'

                                />
                                <FormControlLabel
                                    control={<Checkbox color='primary' checked={productKnowledge.linkedInCheck} />}
                                    label="LinkedIn"
                                    name='linkedInCheck'

                                />
                                <FormControlLabel
                                    control={<Checkbox color='primary' checked={productKnowledge.byFriendCheck} />}
                                    label="By Friend"
                                    name='byFriendCheck'
                                />
                                <FormControlLabel
                                    control={<Checkbox color='primary' checked={productKnowledge.otherCheck} />}
                                    label="Others"
                                    name='otherCheck'
                                />
                            </FormGroup>
                        </FormControl>
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
