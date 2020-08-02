import _ from 'lodash';
export const UPDATE_STATE = "UPDATE_STATE";

export const initialState = {
    personalDetails: {
        username: '',
        gender: '',
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
    userList: [
        {
            personalDetails: {
                username: 'dummy1',
                gender: 'Male',
                dateOfBirth: null,
                age: '19',
                mailId: 'dum@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'Konkani',
                preferredLanguage: ['Tamil','Telugu'],
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
            personalDetails: {
                username: 'dummy2',
                gender: 'female',
                dateOfBirth: null,
                age: '20',
                mailId: 'dummy2@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'tamil',
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
            professionalDetailToggle: 'Housewives',
        },
        {
            personalDetails: {
                username: 'dummy3',
                gender: 'female',
                dateOfBirth: null,
                age: '20',
                mailId: 'dummy2@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'tamil',
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
                communicationAddress: 'dummy3',
                district: 'Salem',
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
            professionalDetailToggle: 'Housewives',
        },
        {
            personalDetails: {
                username: 'dummy4',
                gender: 'female',
                dateOfBirth: null,
                age: '20',
                mailId: 'dummy4@gmail.com',
                mobileNumber: '123123123',
                motherTongue: 'tamil',
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
                communicationAddress: 'dummy4',
                district: 'Salem',
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
            professionalDetailToggle: 'Housewives',
        }


    ]
}


export function app_onChange(name, value) {
    return { type: UPDATE_STATE, payload: { name: name, value: value } };
}

export function errorValidation() {
    return (dispatch, getState) => {
        const { personalDetails, personalDetailError } = getState().appReducer;
        const { username, mailId } = personalDetails;
        const mailIdRegex = /^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/;

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
        const { personalDetails, addressDetails, professional, student, professionalDetailToggle } = restoreInitialState;
        dispatch(app_onChange('personalDetails', personalDetails));
        dispatch(app_onChange('addressDetails', addressDetails));
        dispatch(app_onChange('professional', professional));
        dispatch(app_onChange('student', student));
        dispatch(app_onChange('professionalDetailToggle', professionalDetailToggle));
        dispatch(app_onChange('personalDetailError', { usernameError: false, mailIdError: false, usernameHelperText: "", mailIdHelperText: "" }));
    }
}

export function onSave() {
    return (dispatch, getState) => {
        const { personalDetails, addressDetails, professional, student, professionalDetailToggle, userList } = getState().appReducer;
        const restoreInitialState = _.cloneDeep(initialState);
        userList.push({
            userId: userList.length,
            personalDetails: personalDetails,
            addressDetails: addressDetails,
            professional: professional,
            student: student,
            professionalDetailToggle: professionalDetailToggle,
        })
        dispatch(app_onChange('userList', userList));
        dispatch(app_onChange('personalDetails', restoreInitialState.personalDetails));
        dispatch(app_onChange('addressDetails', restoreInitialState.addressDetails));
        dispatch(app_onChange('professional', restoreInitialState.professional));
        dispatch(app_onChange('student', restoreInitialState.student));
        dispatch(app_onChange('professionalDetailToggle', restoreInitialState.professionalDetailToggle));
        dispatch(app_onChange('personalDetailError', { usernameError: false, mailIdError: false, usernameHelperText: "", mailIdHelperText: "" }));
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