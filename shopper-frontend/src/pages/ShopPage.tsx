import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Input } from '@mui/material';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import api from "../config/api"
import ActionCard from "../components/ActionCard"
import Sidebar from '../components/Sidebar';
import Hamburger from "../assets/hamburger.svg"


const CreateShopModal = ({ isOpen, onClose, onCreate }) => {
  const [shopInfo, setShopInfo] = useState({ name: '', bio: '', address: '', latitude:200, longitude:200 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopInfo({ ...shopInfo, [name]: value });
  };

  const handleCreateShop = () => {
    // Validate shopInfo if needed
    onCreate(shopInfo);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create a New Shop</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for your new shop.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Shop Name"
          fullWidth
          value={shopInfo.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="bio"
          label="Shop Bio"
          fullWidth
          multiline
          rows={4}
          value={shopInfo.bio}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Shop Address"
          fullWidth
          value={shopInfo.address}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateShop} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ShopPage = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCreateShop = async(payload)=>{
    try{
      let {data} = await api.post('/shops',payload)
      alert("shop created")
      await fetchShops()
    }
    catch(e){
      console.log("error",e)
    }
  }
  const fetchShops = async()=>{
    try{
      let {data} = await api.get('/shops')
      console.log("data receieved", data)
      setShops(data)
    }
    catch(e){
      console.log("error",e)
    }
  }
  useEffect(()=>{
    fetchShops()
  },[])
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/login'); // Redirect to the login page
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={toggleSidebar}><img src={Hamburger} alt="menu"/></Button>
          {/* <Input style={{visibility:"hidden"}}/> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop-Inventory
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar}/>

      {/* Shop List */}
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          {shops?.map((shop,index) => (
            <Grid item xs={12} sm={6} md={4} key={shop._id}>
              <ActionCard shop={shop} key={index}/>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg" style={{ marginTop: '2rem', height:"50vh",display:"flex", justifyContent:'center', alignItems:"center" }}>
        <Grid container>
          <Button onClick={()=>setShowModal(true)}>
            Add Shop
          </Button>
        </Grid>
      </Container>
      {showModal && 
      <CreateShopModal isOpen={showModal} onClose={()=>setShowModal(false)} onCreate={handleCreateShop}/>
      }
    </div>
  );
};

export default ShopPage;
