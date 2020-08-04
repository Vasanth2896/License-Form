import React from 'react';
import FormLayout from './components/Formlayout/FormLayout';
import TableLayout from './components/TableLayout/TableLayout';
import { Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Route exact path={'/'} component={TableLayout} />
      <Route path={'/layout'} component={FormLayout} />
    </div>
  );
}

export default App;
