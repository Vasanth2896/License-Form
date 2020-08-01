import React from 'react';
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorValidation,onCancel } from '../../../../store/appActions'

const PersonalDetailFooter = (props) => {

    const { history, handleNext, errorValidation,onCancel } = props
    const handleCancel = () => {
        history.push('/');
        onCancel();
    }

    const handleErrorValidation = async () => {
        const dummy =  await errorValidation();
        if (dummy) {
            history.push('/layout/AddressDetails')
            handleNext();
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleCancel}
            >cancel</Button>
            <Button
                variant='contained'
                onClick={() => handleErrorValidation()}
                style={{ background: 'blue', color: 'white' }}
            >next</Button>
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
        errorValidation: errorValidation,
        onCancel: onCancel
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailFooter);


