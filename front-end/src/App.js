import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from './thema/theme.js';
import Login from './pages/login/indexLogin';
import MainPage from './pages/listaPecas/indexLista';
import Header from './pages/header/indexHeader';
import Menus from './pages/menus/indexMenus';
import MenusCad from './pages/menus/menuCadastro';
import CadastroP from './pages/cadastroPecas/indexCadastroP';
import CadastroA from './pages/cadastroAtributos/indexCadastroA';
import CadastroC from './pages/cadastroCategorias/indexCadastroC';
import CadastroE from './pages/cadastroEquipamentos/indexCadastroE';
import './thema/themeInput.css';


import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

const StyledApp = styled.div``;

const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {const storedValue = localStorage.getItem(key); return storedValue === null ? defaultValue : JSON.parse(storedValue);})
  
  useEffect(() => {const listener = (e) => {if (e.storageArea === localStorage && e.key === key) {setValue(JSON.parse(e.newValue));}}; window.addEventListener("storage", listener); return () => {window.removeEventListener("storage", listener);}} , [key])

  const setValueLocalStorage = (newValue) => {
    setValue((currentValue) => {const result = typeof newValue === "function" ? newValue(currentValue) : newValue; localStorage.setItem(key, JSON.stringify(result)); return result;})
  }
 
  return[value, setValueLocalStorage];
};

const App = () => {
  const [theme, setTheme] = useLocalState("theme", "light");
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
      <div className="app">
          <Router> {/* Sistema de rotas da pagina */}
            <Routes>
              <Route exact path="/" element={<Login />} />   
              <Route exact path="/pecas" element={<MainPage />} />
              <Route exact path="/testeHeader" element={<Header/>}/>
              <Route exact path="/menu" element={<Menus/>}/>
              <Route exact path="/menucadastro" element={<MenusCad/>}/>
              <Route exact path="/cadastro/pecas" element={<CadastroP/>}/>
              <Route exact path="/cadastro/atributos" element={<CadastroA/>}/>
              <Route exact path="/cadastro/categoria" element={<CadastroC/>}/>
              <Route exact path="/cadastro/equipamentos" element={<CadastroE/>}/>
            </Routes>
          </Router>
      </div>
      <div className='ee'>
        <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}/>
        <label className="react-switch-label" htmlFor={`react-switch-new`}>
          <span className={`react-switch-button`} />
        </label>
      </div>
    </ThemeProvider>
  );
  }
  
  export default App;
