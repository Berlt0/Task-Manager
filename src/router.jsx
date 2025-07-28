// App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {Login} from './login.jsx';
import {App} from './app.jsx';

export function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/task" element={<App />} />
      </Routes>
    </Router>
  );
}


