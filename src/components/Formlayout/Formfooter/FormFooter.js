import React from 'react';
import './FormFooter.scss'
import { Route, withRouter } from 'react-router-dom';
import PersonalDetailFooter from './PersonalDetailFooter';
import ProfessionalDetailFooter from './ProfessionalDetailFooter';
import AddressDetailFooter from './AddressDetailFooter';

const FormFooter = (props) => {
    return (
        <footer className='formFooter'>
            <Route path='/layout/PersonalDetails' render={() => <PersonalDetailFooter {...props} />} />
            <Route path='/layout/AddressDetails' render={() => <AddressDetailFooter {...props} />} />
            <Route path='/layout/ProfessionalDetails' render={() => <ProfessionalDetailFooter {...props} />} />
        </footer>
    )
}

export default withRouter(FormFooter);