import React from 'react';
import Login from './pages/login/indexLogin'
import MainPage from './pages/listaPecas/indexMP'
import Header from './pages/header/indexHeader'
import Menus from './pages/menus/indexMenus'
import Test from './test/test'
//     <Router> {/* Sistema de rotas da pagina */}
// <Routes>
// <Route exact path="/" element={<Login />} />   
// <Route exact path="/pecas" element={<MainPage />} />
// </Routes>
// </Router>
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";


const App = () => {
  return ( 
    <div className="app">
        <Router> {/* Sistema de rotas da pagina */}
          <Routes>
            <Route exact path="/" element={<Login />} />   
            <Route exact path="/pecas" element={<MainPage />} />
            <Route exact path="/testeHeader" element={<Header/>}/>
            <Route exact path="/menu" element={<Menus/>}/>
            <Route exact path="/teste" element={<Test/>}/>
          </Routes>
        </Router>
    </div>
  );
  }
  
  export default App;
