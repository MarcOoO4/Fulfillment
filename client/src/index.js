import React, {createContext} from 'react';
import App from './App';
import UserStore from './store/UserStore';
import OrderStore from './store/OrderStore';
import { createRoot } from 'react-dom/client';

export const Context = createContext(null)

const rootElement = document.getElementById('root');

createRoot(rootElement).render( // Using createRoot from 'react-dom/client'
    <Context.Provider value={{ user: new UserStore(), order: new OrderStore() }}>
        <App />
    </Context.Provider>
);

