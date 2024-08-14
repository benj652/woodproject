import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { useUserContext } from './context/UserContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TreePage from './pages/TreePage';

const Router = () => {
  const { user } = useUserContext();
  return (
    <div className="max-w-screen overflow-clip">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignUpPage />} />
          <Route path="/tree/:id" element={<TreePage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
