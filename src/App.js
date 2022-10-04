import React from 'react';
import Login from './pages/login/indexLogin'
import MainPage from './pages/mainpage/indexMP'
import Header from './pages/header/indexHeader'
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
} from "react-router-dom";

const App = () => {
  return ( 
    <div className="app">
      <Router> {/* Sistema de rotas da pagina */}
        <Routes>
          <Route exact path="/" element={<Login />} />   
          <Route exact path="/pecas" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
  }
  
  export default App;
