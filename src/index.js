import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {SubsContextProvider} from "./context/subsContext"
import {ShowContextProvider} from "./context/showModalContext"
import {ListBookContextProvider} from "./context/myListBookContex"
import {UserContextProvider} from "./context/userContex"
import {BrowserRouter} from "react-router-dom"


ReactDOM.render(
  <React.StrictMode>
 
  <UserContextProvider>  
        <ShowContextProvider>
          <BrowserRouter>
          <App />
          </BrowserRouter>
        </ShowContextProvider>
  </UserContextProvider>
    
    

  </React.StrictMode>,
  document.getElementById('root')
);


