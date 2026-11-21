import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
// import './App.css';

function App() {
  return (
    <div className="main">
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
