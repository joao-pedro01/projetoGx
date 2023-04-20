import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from './thema/theme.js'; //import dos Themas
import Login from './pages/login/indexLogin';
import LoginErro from './pages/login/indexLoginErro'
import MainPage from './pages/listaPecas/indexLista';
import Header from './pages/header/indexHeader';
import Menus from './pages/menus/indexMenus';
import MenusCad from './pages/menus/menuCadastro';
import CadastroP from './pages/cadastroPecas/indexCadastroP';
import CadastroA from './pages/cadastroAtributos/indexCadastroA';
import CadastroC from './pages/cadastroCategorias/indexCadastroC';
import CadastroE from './pages/cadastroEquipamentos/indexCadastroE';
import Relatorio from './pages/relatorio/indexRelatorio.jsx';
import Retirada from './pages/retirada/indexRetirada.jsx';
import CadastroTeste from './pages/cadastroTeste/indexCadastroTeste'
import DetalhesPecas from './pages/listaPecas/detalhesPecas/detalhesPecas.jsx'
import './thema/themeInput.css';
import Axios from "axios";

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

const StyledApp = styled.div``;

/*Sistema para salvar a troca do thema*/
const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {const storedValue = localStorage.getItem(key); return storedValue === null ? defaultValue : JSON.parse(storedValue);})
  
  useEffect(() => {const listener = (e) => {if (e.storageArea === localStorage && e.key === key) {setValue(JSON.parse(e.newValue));}}; window.addEventListener("storage", listener); return () => {window.removeEventListener("storage", listener);}} , [key])

  const setValueLocalStorage = (newValue) => {
    setValue((currentValue) => {const result = typeof newValue === "function" ? newValue(currentValue) : newValue; localStorage.setItem(key, JSON.stringify(result)); return result;})
  }
 
  return[value, setValueLocalStorage];
};

const App = () => {
  const [data, setData] = useState();


  useEffect(() => {
    Axios.get('http://172.22.2.22:3030/api/especificacoes')
    .then(res => {
      setData(res.data)
    }).catch(err => console.log(err))
  }, []);
  
  const [theme, setTheme] = useLocalState("theme", "light"); /*Var da troca do thema*/
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
      <div className="app">
          <Router> {/* Sistema de rotas da pagina */}
            <Routes>
              <Route exact path="/" element={<Login />} />   
              <Route exact path="/erro" element ={<LoginErro />}/>
              <Route exact path="/pecas" element={<MainPage />} />
              <Route exact path="/testeHeader" element={<Header/>}/>
              <Route exact path="/menu" element={<Menus/>}/>
              <Route exact path="/menu/cadastros" element={<MenusCad/>}/>
              <Route exact path="/cadastro/pecas" element={<CadastroP/>}/>
              <Route exact path="/cadastro/atributos" element={<CadastroA/>}/>
              <Route exact path="/cadastro/categoria" element={<CadastroC/>}/>
              <Route exact path="/cadastro/equipamentos" element={<CadastroE/>}/>
              <Route exact path="/Relatorio" element={<Relatorio/>}/>
              <Route exact path="/Retirada" element={<Retirada/>}/>
              <Route exact path="/teste" element={<CadastroTeste/>}/>
              <Route exact path="/pecas/:id" element={<DetalhesPecas/>}/>
            </Routes>
          </Router>
      </div>
      <div className='ee'> {/*Checkbox para trocar o Thema*/}
        <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}/>
        <label className="react-switch-label" htmlFor={`react-switch-new`}>
          <span className={`react-switch-button`} />
        </label>
      </div>
    </ThemeProvider>
  );
  }
  
  export default App;
