import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"

import App from './App'
import { getUsers } from "./actions/users";
import { getPosts } from "./actions/post";
import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })

store.dispatch(getUsers());
store.dispatch(getPosts());

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>  
        </BrowserRouter>
  </React.StrictMode>,
);
