import _ from 'lodash';
export const UPDATE_STATE = "UPDATE_STATE";

export const initialState = {
    personalDetails: {
        username: '',
        gender: 'male',
        dateOfBirth: null,
        age: '',
        mailId: '',
        mobileNumber: '',
        motherTongue: '',
        preferredLanguage: [],
        productKnowledge: {
            newspaperCheck: false,
            tvCheck: false,
            facebookCheck: false,
            linkedInCheck: false,
            byFriendCheck: false,
            otherCheck: false
        },
        other: ''
    },
    addressDetails: {
        communicationAddress: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
    },
    student: {
        currentQualification: '',
        institutionName: '',
        studyingAt: '',
        institutionAddress: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
    },
    professional: {
        level: '',
        salary: ''
    },
    professionalDetailToggle: 'student',
    personalDetailError: {
        usernameError: false,
        mailIdError: false,
        usernameHelperText: '',
        mailIdHelperText: '',
    },
    editableIndex: null,
    userList: [
        {
            id: 0,
            personalDetails: {
                username: 'dummy1',
                gender: 'Male',
                dateOfBirth: null,
                age: '19',
                mailId: 'dum@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'Tamil',
                preferredLanguage: ['Tamil', 'Telugu'],
                productKnowledge: {
                    newspaperCheck: true,
                    tvCheck: false,
                    facebookCheck: false,
                    linkedInCheck: false,
                    byFriendCheck: false,
                    otherCheck: false
                },
                other: ''
            },
            addressDetails: {
                communicationAddress: 'dummy1',
                district: 'salem',
                state: 'TamilNadu',
                country: 'India',
                pincode: '123123',
            },
            student: {
                currentQualification: '',
                institutionName: '',
                studyingAt: '',
                institutionAddress: '',
                district: '',
                state: '',
                country: '',
                pincode: '',
            },
            professional: {
                level: '',
                salary: ''
            },
            professionalDetailToggle: 'housewives',
        },
        {
            id: 1,
            personalDetails: {
                username: 'dummy2',
                gender: 'female',
                dateOfBirth: null,
                age: '20',
                mailId: 'dummy2@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'Tamil',
                preferredLanguage: ['Telugu'],
                productKnowledge: {
                    newspaperCheck: true,
                    tvCheck: false,
                    facebookCheck: false,
                    linkedInCheck: false,
                    byFriendCheck: false,
                    otherCheck: false
                },
                other: ''
            },
            addressDetails: {
                communicationAddress: 'dummy2',
                district: 'Salem',
                state: 'TamilNadu',
                country: 'India',
                pincode: '123123',
            },
            student: {
                currentQualification: 'B.E',
                institutionName: 'dummy2',
                studyingAt: 'dummy2',
                institutionAddress: 'dummy2',
                district: 'salem',
                state: 'Tamil Nadu',
                country: 'India',
                pincode: '123123',
            },
            professional: {
                level: '',
                salary: ''
            },
            professionalDetailToggle: 'student',
        },
    ]
}


export function app_onChange(name, value) {
    return { type: UPDATE_STATE, payload: { name: name, value: value } };
}

export function errorValidation() {
    return (dispatch, getState) => {
        const { personalDetails, userList, personalDetailError, editableIndex } = getState().appReducer;
        const { username, mailId } = personalDetails;
        const mailIdRegex = /^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/;

        const newUserList = editableIndex !== null ? userList.filter((user, index) => { return index !== editableIndex }) : userList;
        const emailDuplicateFlag = newUserList.some(user => user.personalDetails.mailId === mailId);

        if (emailDuplicateFlag) {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'The mail id already exists';
        }


        if (username === '') {
            personalDetailError.usernameError = true;
            personalDetailError.usernameHelperText = 'Please enter the username';
        }

        if (mailId === '') {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'Please enter the mail id';
        }

        if (mailId !== '' && !mailIdRegex.test(mailId)) {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'invalid email ID';
        }

        dispatch(app_onChange('personalDetailError', personalDetailError));
        if (personalDetailError.usernameError || personalDetailError.mailIdError) {
            return false;
        }
        else {
            return true
        }
    }
}


export function onCancel() {
    return (dispatch) => {
        const restoreInitialState = _.cloneDeep(initialState);
        const { personalDetails, addressDetails, professional, student, professionalDetailToggle, editableIndex } = restoreInitialState;
        dispatch(app_onChange('personalDetails', personalDetails));
        dispatch(app_onChange('addressDetails', addressDetails));
        dispatch(app_onChange('professional', professional));
        dispatch(app_onChange('student', student));
        dispatch(app_onChange('professionalDetailToggle', professionalDetailToggle));
        dispatch(app_onChange('personalDetailError', { usernameError: false, mailIdError: false, usernameHelperText: "", mailIdHelperText: "" }));
        dispatch(app_onChange('editableIndex', null));

    }
}

export function onSave() {
    return (dispatch, getState) => {
        const { personalDetails, addressDetails, professional, student, professionalDetailToggle, userList, editableIndex } = getState().appReducer;
        const restoreInitialState = _.cloneDeep(initialState);
        if (editableIndex === null) {
            userList.push({
                personalDetails: personalDetails,
                addressDetails: addressDetails,
                professional: professional,
                student: student,
                professionalDetailToggle: professionalDetailToggle,
            })
        }
        else {
            const newEditeduser = {
                personalDetails: personalDetails,
                addressDetails: addressDetails,
                professional: professional,
                student: student,
                professionalDetailToggle: professionalDetailToggle,
            }
            userList.splice(editableIndex, 1, newEditeduser);
        }
        dispatch(app_onChange('userList', userList));
        dispatch(app_onChange('personalDetails', restoreInitialState.personalDetails));
        dispatch(app_onChange('addressDetails', restoreInitialState.addressDetails));
        dispatch(app_onChange('professional', restoreInitialState.professional));
        dispatch(app_onChange('student', restoreInitialState.student));
        dispatch(app_onChange('professionalDetailToggle', restoreInitialState.professionalDetailToggle));
        dispatch(app_onChange('personalDetailError', { usernameError: false, mailIdError: false, usernameHelperText: "", mailIdHelperText: "" }));
        dispatch(app_onChange('editableIndex', null));
    }
}

export function onDelete(deleteIndex) {
    return (dispatch, getState) => {
        const { userList } = getState().appReducer
        const newUserList = userList.filter(user => JSON.stringify(user) !== JSON.stringify(userList[deleteIndex]));
        dispatch(app_onChange('userList', newUserList));
    }
}

export function onEdit(editableIndex, editableData) {
    return (dispatch, getState) => {
        dispatch(app_onChange('personalDetails', editableData.personalDetails));
        dispatch(app_onChange('addressDetails', editableData.addressDetails));
        dispatch(app_onChange('student', editableData.student));
        dispatch(app_onChange('professional', editableData.professional));
        dispatch(app_onChange('professionalDetailToggle', editableData.professionalDetailToggle));
        dispatch(app_onChange('editableIndex', editableIndex));
    }
}


export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return { ...state, [action.payload.name]: action.payload.value };
        default:
            return state;
    }
};