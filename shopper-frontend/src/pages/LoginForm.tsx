import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import api from "../config/api"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isAuthenticated = () => {  
    const result = localStorage.getItem('token') !== null;
    return result
  };
  useEffect(() => {
    ;(async () => {
      if (isAuthenticated()) {
        await navigate('/shop');
      }
    })()
  }, [])
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let {data} = await api.post('/login',formData)
        const token = data.token; 
        localStorage.setItem('token', token)
        console.log("data and token", data, token)
        await navigate('/shop')
        toast.success(data.message, {
            position: 'top-right',
            autoClose: 2000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
    catch(e){
        console.log("error",e)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
