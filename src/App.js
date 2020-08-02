import React, { useEffect } from 'react';
import FormLayout from './components/formlayout/FormLayout';
import TableLayout from './components/TableLayout/TableLayout';
import { Route } from 'react-router-dom'
import Navbar from './components/common/Navbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { app_onChange } from "./store/appActions";

function App(props) {
  // const { onChange } = props;

  // useEffect(() => {
  //   onChange('addressDetails', {
  //     communicationAddress: 'dummy3',
  //     district: 'Salem',
  //     state: 'Tamil Nadu',
  //     country: 'India',
  //     pincode: '123123',
  //   })
  // })
  return (
    <div className="App">
      <Navbar />
      <Route exact path={'/'} component={TableLayout} />
      <Route path={'/layout'} component={FormLayout} />
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onChange: app_onChange
  }, dispatch)
}



export default connect(null, mapDispatchToProps)(App);
