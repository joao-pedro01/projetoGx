import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from './theme.js';
import Login from './pages/login/indexLogin'
import MainPage from './pages/listaPecas/indexLista'
import Header from './pages/header/indexHeader'
import Menus from './pages/menus/indexMenus'
import CadastroP from './pages/cadastroPecas/indexCadastroP'

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

const StyledApp = styled.div``;

const App = () => {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme('dark') : setTheme('light')
  };
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
            <Route exact path="/cadastro/pecas" element={<CadastroP/>}/>
          </Routes>
        </Router>
        <button on onClick={() => themeToggler()}>Trocar tema</button>
    </div>
    </ThemeProvider>
  );
  }
  
  export default App;
