import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Form from './Form'; // Assuming this is your form component
import EnhancedTable from './EnhancedTable';
import './App.css';

function App() {
  React.useEffect(() => {
    window.localStorage.setItem('employeeId', 'sakshi.bele@pratititech.com');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="create-invoice" element={<Form />} />
          <Route path="my-invoice" element={<EnhancedTable />} />
          <Route path="edit-invoice/:invoiceId" element={<Form/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
