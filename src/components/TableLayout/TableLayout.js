import React, { useState } from "react";
import './TableLayout.scss';
import ReactTable from 'react-table-v6'
import { Button, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange, onCancel } from '../../store/appActions';
import _ from 'lodash';
import TableHeaderContent from "./TableHeaderContent/TableHeaderContent";
import ActionComponent from "./ActionComponent/ActionComponent";


const TableLayout = (props) => {
    const { history, state,onCancel } = props;
    const currentState = _.cloneDeep(state);
    const { userList } = currentState;
    const [userTableState, setUserTableState] = useState({
        filteredData: userList,
        searchInput: '',
        usernameSort: false,
        mailIdSort: false,
        mobileNumberSort: false,
        professionSort: false,
        addressSort: false,
        stateSort: false,
        districtSort: false
    });
    const { searchInput, usernameSort, mailIdSort, mobileNumberSort, professionSort, addressSort, stateSort, districtSort } = userTableState;
    let newFilteredData;

    const handleSortChangeStyle = (props) => {
        if (props[0].id !== '') {
            const sortStyle = { ...userTableState };
            sortStyle[`${props[0].id + 'Sort'}`] = props[0].desc;
            setUserTableState({ ...sortStyle })

        }
    }

    const handleSearchInputchange = (e) => {
        setUserTableState({ ...userTableState, searchInput: e.target.value });
    }

    


    const columns = [
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
            accessor: '',
            Cell: ({ value, index }) => {
                return (
                    <div className='actionsContainer'  >
                        <ActionComponent value={value} index={index} />
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
                        <TextField
                            label="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type='search'
                            variant='outlined'
                            onChange={(e) => handleSearchInputchange(e)}
                            value={searchInput}
                        />
                    </div>
                    <div>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ textTransform: 'unset' }}
                            onClick={() => {
                                history.push('/layout/PersonalDetails');
                                onCancel();
                            }}
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
                    showPagination={false}
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
        onChange: app_onChange,
        onCancel: onCancel
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);