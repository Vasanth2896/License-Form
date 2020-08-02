import React from 'react';
import {Paper, Grid, Box, TextField, Checkbox} from "@material-ui/core";
import { connect } from 'react-redux';
import _ from 'lodash'
import { IndianStates } from "../../../seed/seed";
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../../store/appActions';
import InputSelect from "../../common/InputSelect";
import {AddressDetailsStyles} from '../../common/commonStyles'


const AddressDetails = (props) => {
    const classes = AddressDetailsStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { addressDetails } = currentState;

    const handleChange = (e) => {
        addressDetails[e.target.name] = e.target.value;
        onChange('addressDetails', addressDetails);
    }

    return (
        <Paper className={classes.AddressDetailsStyles} elevation={2}>
            <div style={{ padding: '25px 40px 40px 40px' }}>
                <h2>Communication Address</h2>
                <Grid container spacing={5}>,
                    <Grid item xs={12}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Address'
                                name='communicationAddress'
                                value={addressDetails.communicationAddress}
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Country'
                                name='country'
                                value={addressDetails.country}
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='State'
                            labelId='state'
                            name='state'
                            handleChange={handleChange}
                            value={addressDetails.state}
                            menuOptions={IndianStates}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='District'
                                name='district'
                                value={addressDetails.district}
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='pincode'
                                name='pincode'
                                value={addressDetails.pincode}
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                color='primary'
                            ></Checkbox>
                            <p>Permanent address is same as communication Address</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);