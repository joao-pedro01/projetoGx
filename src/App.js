import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from './thema/theme.js'; //import dos Themas
import RouterComponent from './Router';
import './thema/themeInput.css';
import Axios from "axios";
import {AuthContextProvider} from './AuthContext.js';
import { AuthContext } from './AuthContext.js';
import PrivateRoute from './PrivateRoute.js';

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

const StyledApp = styled.div``;

const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  const setValueLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueLocalStorage];
};

const App = () => {
  const [data, setData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Axios.get('http://172.22.2.22:3030/api/especificacoes')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [theme, setTheme] = useLocalState('theme', 'light');

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <div>
          <RouterComponent isAuthenticated={isAuthenticated} />
      </div>
      <div className='ee'> {/*Checkbox para trocar o Thema*/}
        <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}/>
        <label className="react-switch-label" htmlFor={`react-switch-new`}>
          <span className={`react-switch-button`} />
        </label>
      </div>
    </ThemeProvider>
    </AuthContextProvider>
  );
  }
  
  export default App;
