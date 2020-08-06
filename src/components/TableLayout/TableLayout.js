import React, { useState, useEffect } from "react";
import './TableLayout.scss';
import ReactTable from 'react-table-v6'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange, onCancel, onEdit, onDelete } from '../../store/appActions';
import _ from 'lodash';
import TableHeaderContent from "./TableHeaderContent";
import ActionComponent from "./ActionComponent";
import SearchBox from "./SearchBox";

const TableLayout = (props) => {
    const { history, state, onCancel, onEdit, onDelete } = props;
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
    const { filteredData,
        searchInput, usernameSort, mailIdSort, mobileNumberSort,
        professionSort, addressSort, stateSort, districtSort } = userTableState;

    let newFilteredData = [];


    useEffect(() => {
        setUserTableState({ ...userTableState, filteredData: userList });
    }, [state])

    const handleSortChangeStyle = (props) => {
        if (props[0].id !== '') {
            const sortStyle = { ...userTableState };
            sortStyle[`${props[0].id + 'Sort'}`] = props[0].desc;
            setUserTableState({ ...sortStyle });
        }
    }

    const handleSearchInputchange = (e) => {
        setUserTableState({ ...userTableState, searchInput: e.target.value });
    }

    useEffect(() => {
        searchInput ? globalSearchFilter() : setUserTableState({ ...userTableState, filteredData: userList });
    }, [searchInput, state]);


    const globalSearchFilter = () => {
        if (searchInput) {
            newFilteredData = userList.filter(user => {
                return (
                    user.personalDetails.username.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.personalDetails.mailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.personalDetails.mobileNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.professionalDetailToggle.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.addressDetails.communicationAddress.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.addressDetails.district.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.addressDetails.state.toLowerCase().includes(searchInput.toLowerCase())
                );
            });
            newFilteredData.length ?
                setUserTableState({ ...userTableState, filteredData: newFilteredData }) : setUserTableState({ ...userTableState, filteredData: [] });

        }
    }

    const columns = [
        {
            Header: <TableHeaderContent columnName='User name' columnSortState={usernameSort} />,
            id: 'username',
            accessor: user => user.personalDetails.username
        },
        {
            Header: <TableHeaderContent columnName='Mail id' columnSortState={mailIdSort} />,
            id: 'mailId',
            accessor: user => user.personalDetails.mailId
        },
        {
            Header: <TableHeaderContent columnName='Mobile no' columnSortState={mobileNumberSort} />,
            id: 'mobileNumber',
            accessor: user => user.personalDetails.mobileNumber
        },
        {
            Header: <TableHeaderContent columnName='Profession' columnSortState={professionSort} />,
            id: 'profession',
            accessor: user => user.professionalDetailToggle
        },
        {
            Header: <TableHeaderContent columnName='Address' columnSortState={addressSort} />,
            id: 'address',
            accessor: user => user.addressDetails.communicationAddress
        },
        {
            Header: <TableHeaderContent columnName='District' columnSortState={districtSort} />,
            id: 'district',
            accessor: user => user.addressDetails.district
        },
        {
            Header: <TableHeaderContent columnName='State' columnSortState={stateSort} />,
            id: 'state',
            accessor: user => user.addressDetails.state
        },
        {
            Header: '',
            accessor: '',
            Cell: ({ value, index }) => {
                return (
                    <div className='actionsContainer'  >
                        <ActionComponent
                            value={value}
                            index={index}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            userTableState={userTableState}
                            setUserTableState={setUserTableState}
                        />
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
                    <h3>&nbsp;({userList.length})</h3>
                </div>
                <SearchBox
                    handleSearchInputchange={handleSearchInputchange}
                    searchInput={searchInput}
                    history={history}
                    onCancel={onCancel}
                />
            </div>
            {!filteredData.length || !userList.length ? <div><h1>There is no user</h1></div> :
                <div>
                    <ReactTable
                        data={filteredData}
                        columns={columns}
                        className='-striped -highlight'
                        minRows={0}
                        onSortedChange={(props) => handleSortChangeStyle(props)}
                        showPagination={false}
                    />
                </div>
            }
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
        onCancel: onCancel,
        onEdit: onEdit,
        onDelete: onDelete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);