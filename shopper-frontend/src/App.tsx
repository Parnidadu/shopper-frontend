import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
// import ShopPage from './pages/ShopPage'; // Example protected page component
// import ProductPage from './pages/ProductPage'; // Example protected page component
// import ProtectedRoute from './Routes/protectedRoute'; 
import HomePage from './pages/Homepage';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        {/* Protected Routes */}
        {/* <ProtectedRoute path="/shop" element={ShopPage} />
        <ProtectedRoute path="/product" element={ProductPage} /> */}
        {/* Redirect to login for other routes */}
        <Route element={<LoginForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
