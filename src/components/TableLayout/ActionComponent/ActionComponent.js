import React, { useState } from 'react';
import { Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onDelete, onEdit } from '../../../store/appActions'
import { useHistory } from 'react-router-dom';
import './ActionComponent.scss';


const ActionComponent = (props) => {
    const history = useHistory();

    const { index, value, onDelete, onEdit } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (index, value) => {
        onEdit(index, value);
        history.push('/layout/PersonalDetails');
        setAnchorEl(null);
    }

    const handleDelete = (index) => {
        onDelete(index);
        setAnchorEl(null);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <FontAwesomeIcon icon={faEllipsisH} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'blue' }} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleEdit(index, value)}>Edit user</MenuItem>
                <MenuItem onClick={() => handleDelete(index)}>Delete user</MenuItem>
            </Menu>
        </div>
    );

}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onDelete: onDelete,
        onEdit: onEdit
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ActionComponent)