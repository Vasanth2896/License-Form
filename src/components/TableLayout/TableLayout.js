import React, { useState } from "react";
import './TableLayout.scss';
import ReactTable from 'react-table-v6'
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../store/appActions';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import TableHeaderContent from "./TableHeaderContent/TableHeaderContent";


const TableLayout = (props) => {
    const { history, state } = props;
    const currentState = _.cloneDeep(state);
    const { userList } = currentState;
    const [userTableState, setUserTableState] = useState({
        usernameSort: false,
        mailIdSort: false,
        mobileNumberSort: false,
        professionSort: false,
        addressSort: false,
        stateSort: false,
        districtSort: false
    });
    const { usernameSort, mailIdSort, mobileNumberSort, professionSort, addressSort, stateSort, districtSort } = userTableState;

    const handleSortChangeStyle = (props) => {
        if (props[0].id !== '') {
            const sortStyle = { ...userTableState };
            sortStyle[`${props[0].id + 'Sort'}`] = props[0].desc;
            setUserTableState({ ...sortStyle })

        }
    }

    const columns = [
        {
            Header: (
                <div className='HeaderContent'>
                    S.NO
                </div>
            ),
            width: 70,
            resizable: false
        },
        {
            Header: <TableHeaderContent columnName='User name' columnSortState={usernameSort} />,
            id: 'username',
            accessor: d => d.personalDetails.username
        },
        {
            Header: <TableHeaderContent columnName='Mail id' columnSortState={mailIdSort} />,
            id: 'mailId',
            accessor: d => d.personalDetails.mailId
        },
        {
            Header: <TableHeaderContent columnName='Mobile no' columnSortState={mobileNumberSort} />,
            id: 'mobileNumber',
            accessor: d => d.personalDetails.mobileNumber
        },
        {
            Header: <TableHeaderContent columnName='Profession' columnSortState={professionSort} />,
            id: 'profession',
            accessor: d => d.professionalDetailToggle
        },
        {
            Header: <TableHeaderContent columnName='Address' columnSortState={addressSort} />,
            id: 'address',
            accessor: d => d.addressDetails.communicationAddress
        },
        {
            Header: <TableHeaderContent columnName='District' columnSortState={districtSort} />,
            id: 'district',
            accessor: d => d.addressDetails.district
        },
        {
            Header: <TableHeaderContent columnName='State' columnSortState={stateSort} />,
            id: 'state',
            accessor: d => d.addressDetails.state
        },
        {
            Header: '',
            Cell: ({ value, index }) => {
                return (
                    <div className='actionsContainer' >
                        <FontAwesomeIcon icon={faEllipsisH} style={{ color: 'blue' }} />
                    </div>
                )
            },
            width: 100,
            resizable: false
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
                    onSortedChange={(props) => handleSortChangeStyle(props)}
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