import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/menu';

// local
import AppRouter from './appRouter'
import './assets/css/App.css';

/**
 * Корневой компонент приложения.
 * @returns 
 */
function App() {
    return (
        <Router>
            <Menu></Menu>
            <AppRouter></AppRouter>
        </Router>
    );
}

export default App;
