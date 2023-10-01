import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from "../config/api"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let {data} = await api.post('/register',formData)
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 2000, 
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            navigate('/login')
        }
        catch (e) {
            console.log("error", e)
            toast.error('Please Try again!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
    }
    // Handle registration logic here (send data to the backend)
  };

return (
    <Container maxWidth="sm">
        <Box mt={5}>
            <Typography variant="h4" align="center" gutterBottom>
                Registration
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
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
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
                    Register
                </Button>
            </form>
        </Box>
    </Container>
);
};

export default RegistrationForm;
