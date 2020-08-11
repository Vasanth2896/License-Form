import { makeStyles } from "@material-ui/core";

export const professionalDetailsFormStyles = makeStyles({
    professionalDetailsFormStyles: {
        background: '#8080801f',
        height: '30em'
    },
});

export const professionalDetailRadioButtonStyles = makeStyles({
    professionalRadioButtonContainer: {
        height: 100,
        background: '#8080801f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    professionalRadioButtons: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
});

export const AddressDetailsStyles = makeStyles({
    AddressDetailsStyles: {
        background: '#8080801f',
        height: '30em'
    },
});

export const personalDetailStyles = makeStyles({

    personalDetailsContainer: {
        background: '#8080801f',
        height: 'auto'
    },
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
});


export const footerButtonStyles = makeStyles({
    proceed: {
        background: 'blue',
        color: 'white'
    }
});


