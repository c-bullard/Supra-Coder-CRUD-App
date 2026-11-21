import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Inventory from './components/Inventory';
import './App.css';

function App() {
  return (
    <div className="main">
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
