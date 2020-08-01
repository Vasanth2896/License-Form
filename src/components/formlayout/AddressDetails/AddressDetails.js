import React from 'react';
import {
    Paper, Grid, Box, TextField, Checkbox
    , FormControl, InputLabel, Select, MenuItem
} from "@material-ui/core";
import { connect } from 'react-redux';
import _ from 'lodash'
import { states } from "../../../seed/stateSeed";
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../../store/appActions';


const AddressDetails = (props) => {
    const { state,onChange } = props;
    const currentState = _.cloneDeep(state);
    const { addressDetails } = currentState;

    // const { state,onChange } = props;
    // const { addressDetails } = state;

    const handleChange = (e) => {
        addressDetails[e.target.name] = e.target.value;
        onChange('addressDetails',addressDetails);
    }
    const renderStateOptions = states.map(state => {
        return (
            <MenuItem key={state} value={state}>{state}</MenuItem>
        )
    });

    return (
        <Paper className='personalDetailsContainer' elevation={2}>
            <div style={{ padding: '25px 40px 40px 40px', height: '30em' }}>
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
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="state" style={{ paddingLeft: 10 }}>State</InputLabel>
                                <Select
                                    variant='filled'
                                    labelId="state"
                                    id="state"
                                    name='state'
                                    value={addressDetails.state}
                                    onChange={(e) => handleChange(e)}
                                >
                                    {renderStateOptions}
                                </Select>
                            </FormControl>
                        </Box>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddressDetails);