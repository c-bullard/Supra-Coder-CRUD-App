import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Inventory from './components/Inventory';
import ItemDetails from './components/ItemDetails';
import CreateItem from './components/CreateItem';
import './App.css';

function App() {
  return (
    <div className="main">
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/inventory" element={<Inventory />}></Route>
          <Route path="/inventory/new" element={<CreateItem />}></Route>
          <Route path="/inventory/:id" element={<ItemDetails />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
