import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import ShopPage from './pages/ShopPage';
import MyShop from './pages/MyShop';
// import ProductPage from './pages/ProductPage'; // Example protected page component
// import ProtectedRoute from './Routes/ProtectedRoute'; 
import HomePage from './pages/Homepage';
import Sidebar from './components/Sidebar';
const isAuthenticated = () => {
  // Check if the user is authenticated (for example, by verifying the presence of a token)
  
  const result = localStorage.getItem('token') !== null;
  console.log("result",result)
  return result
};

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        {/* Protected Routes */}
        <Route path="/shop" element={isAuthenticated() ? <ShopPage /> : <Navigate to="/login" />} />
        <Route path="/shop/:id" element={isAuthenticated() ? <MyShop /> : <Navigate to="/login" />} />

        {/* <ProtectedRoute path="/product" element={ProductPage} /> */}
        {/* Redirect to login for other routes */}
        <Route element={<LoginForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
