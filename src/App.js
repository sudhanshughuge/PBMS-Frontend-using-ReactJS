
import './App.css';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Privateroute from './components/Privateroute';
import Dashboard from './components/Dashboard';



function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
        <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/" element={<Privateroute />} exact >
            <Route path="dashboard/*" element={<Dashboard />} exact />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
