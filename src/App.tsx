import { type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/checkLayout/PrivateRoute';
import GuestRoute from './components/checkLayout/GuestRoute';

const App = (): JSX.Element => {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/login' element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;