import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import AddUserForm from './pages/addUserForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser/:userId?" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
