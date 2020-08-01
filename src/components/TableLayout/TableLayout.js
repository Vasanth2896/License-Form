import React from "react";
import './TableLayout.scss';
import ReactTable from 'react-table-v6'
import { Button } from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../store/appActions';
import _ from 'lodash';



const TableLayout = (props) => {
    const { history, state } = props;
    const currentState = _.cloneDeep(state);
    const { userList } = currentState;

    const columns = [
        {
            Header: (
                <div className='HeaderContent'>
                    S.NO
                </div>
            ),
            width: 70
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>User name</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'username',
            accessor: d => d.personalDetails.username
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>Mail id</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'mailId',
            accessor: d => d.personalDetails.mailId
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>Mobile no</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'mobileNumber',
            accessor: d => d.personalDetails.mobileNumber
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>Profession</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'profession',
            accessor: d => d.professionalDetailToggle
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>Address</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'Address',
            accessor: d => d.addressDetails.communicationAddress
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>District</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'District',
            accessor: d => d.addressDetails.district
        },
        {
            Header: (
                <div className='HeaderContent'>
                    <span style={{ fontWeight: 'bold' }}>State</span>
                    <div style={{ pointerEvents: 'auto' }}>
                        <SortIcon style={{ color: 'blue' }} />
                    </div>
                </div>
            ),
            id: 'State',
            accessor: d => d.addressDetails.state
        },
    ];

    return (
        <div className='tableLayoutContainer'>
            <div className='tableLayoutHeader' >
                <div className='userListHeader'>
                    <h3>Individual Users</h3>
                    <p>({userList.length})</p>
                </div>
                <div className='searchbarContainer'>
                    <div>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ textTransform: 'unset' }}
                            onClick={() => history.push('/layout/PersonalDetails')}
                        >+ New User</Button>
                    </div>
                </div>
            </div>
            <div>
                <ReactTable
                    data={userList}
                    columns={columns}
                    className='-striped -highlight'
                    minRows={0}
                />
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);