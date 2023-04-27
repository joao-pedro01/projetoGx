import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/indexLogin';
import LoginErro from './pages/login/indexLoginErro';
import Header from './pages/header/indexHeader';
import Menus from './pages/menus/indexMenus';
import MainPage from './pages/listaPecas/indexLista';
import MenusCad from './pages/menus/menuCadastro';
import Relatorio from './pages/relatorio/indexRelatorio';
import Retirada from './pages/retirada/indexRetirada';
import CadastroTeste from './pages/cadastroTeste/indexCadastroTeste';
import DetalhesPecas from './pages/listaPecas/detalhesPecas/detalhesPecas';
import CadastroCategorias from './pages/cadastroCategoria/indexCadastroCat';
import PrivateRoute from './PrivateRoute';

function RouterComponent({ isAuthenticated }) {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/erro" element={<LoginErro />} />
        {isAuthenticated && (
          <>
            <PrivateRoute exact path="/pecas" element={<MainPage />} />
            <PrivateRoute exact path="/testeHeader" element={<Header />} />
            <PrivateRoute exact path="/menu" element={<Menus />} />
            <PrivateRoute exact path="/menu/cadastros" element={<MenusCad />} />
            <PrivateRoute exact path="/Relatorio" element={<Relatorio />} />
            <PrivateRoute exact path="/Retirada" element={<Retirada />} />
            <PrivateRoute exact path="/teste" element={<CadastroTeste />} />
            <PrivateRoute exact path="/pecas/:id" element={<DetalhesPecas />} />
            <PrivateRoute exact path="/cadastro/categoria" element={<CadastroCategorias />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default RouterComponent;
