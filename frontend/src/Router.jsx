import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TreePage from './pages/TreePage';

const Router = () => {
  return (
    <div className="max-w-screen overflow-clip">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tree/:id" element={<TreePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
