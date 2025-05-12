import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/layout/PrivateRoute';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;