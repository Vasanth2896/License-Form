import React from "react";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorValidation, onSave } from '../../../../store/appActions'

const ProfessionalDetailFooter = (props) => {
    const { history, handleBack, errorValidation, onSave, setActiveStep } = props;

    const handleSave = () => {
        const isValid = errorValidation();
        if (isValid) {
            onSave();
            history.push('/');
        }
        else {
            setActiveStep(0);
            history.push('/layout/PersonalDetails');
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={() => {
                    handleBack();
                }}
            >previous</Button>
            <Button
                variant='contained'
                onClick={handleSave}
                style={{ background: 'blue', color: 'white' }}
            >save</Button>
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
        onSave: onSave
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetailFooter);