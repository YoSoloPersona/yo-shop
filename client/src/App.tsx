import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './appRouter'

// local
import './assets/css/App.css';

function App() {
    return (
        <Router>
            <AppRouter></AppRouter>
        </Router>
    );
}

export default App;
