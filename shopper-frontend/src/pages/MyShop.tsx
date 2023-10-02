import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import api from "../config/api"
import ActionCardProduct from "../components/ActionCardProduct"
import { useParams } from 'react-router-dom';
import Hamburger from "../assets/hamburger.svg"
import Sidebar from '../components/Sidebar';

const AddProduct = ({ isOpen, onClose, onCreate, product=[],fetch }) => {
	const { id } = useParams();
	const [productInfo, setProductInfo] = useState({ name: product?.[0]?.name||'', description: product?.[0]?.description||'', price: product?.[0]?.price||10, availableStock: product?.[0]?.availableStock||200, tags: ["grocery"], shopId: id });
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProductInfo({ ...productInfo, [name]: value });
	};
	const handleUpdate = async()=>{
		try{
			let {data} = await api.put(`products/${product?.[0]?._id}`,productInfo)
			console.log("updated successfully")
			onClose()
			fetch()
		}
		catch(e){
			console.log("error",e)
		}
	}
	const handleCreateProduct = async() => {
		try{
			await onCreate(productInfo);
			onClose();
		}
		catch(e){
			console.log("error",e)
		}
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>{product?.length>0?"Edit": "Create a new"} Product</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please enter the details for your the product.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					name="name"
					label="Product Name"
					fullWidth
					value={productInfo.name}
					onChange={handleInputChange}
				/>
				<TextField
					margin="dense"
					name="description"
					label="Product Description"
					fullWidth
					multiline
					rows={4}
					value={productInfo.description}
					onChange={handleInputChange}
				/>
				<TextField
					margin="dense"
					name="price"
					type='number'
					label="Product Price"
					fullWidth
					value={productInfo.price}
					onChange={handleInputChange}
				/>
				<TextField
					margin="dense"
					name="availableStock"
					type='number'
					label="Available stocks"
					fullWidth
					value={productInfo.availableStock}
					onChange={handleInputChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={product?.length>0? handleUpdate:handleCreateProduct} color="primary">
				{product?.length>0?"Update": "Create"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};


const MyShop = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [shops, setShops] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [product, setProduct] = useState([])
	const addProduct = async (payload) => {
		try {
			let { data } = await api.post('/products', payload)
			alert("product added successfully")
			await fetchProducts()
		}
		catch (e) {
			console.log("error", e)
		}
	}
	const handleEdit = async(id) =>{
		try {
			let { data } = await api.get(`/product/${id}`)
			setProduct(data)
			setShowModal(true)
		}
		catch (e) {
			console.log("error", e)
		}
	}
	const handleDelete = async(id) =>{
		try {
			let { data } = await api.delete(`/products/${id}`)
			console.log("deleted", data)
			fetchProducts()
		}
		catch (e) {
			console.log("error", e)
		}
	}
	
	const fetchProducts = async () => {
		try {
			let { data } = await api.get(`/products/${id}`)
			console.log("data receieved", data)
			setShops(data)
		}
		catch (e) {
			console.log("error", e)
		}
	}
	useEffect(() => {
		fetchProducts()
	}, [])
	const handleLogout = () => {
		localStorage.removeItem('token');
		toast.success('Logged out successfully!');
		navigate('/login');
	};
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
				<Button color="inherit" onClick={toggleSidebar}><img src={Hamburger} alt="menu"/></Button>
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
			{shops?.length<=0 && 
			<div style={{display:'flex', justifyContent:'center', marginTop:10}}>
				<ActionCardProduct shop={{name:"No product Added", description:"please add some product", show:false}}  />
			</div>
			}
			<Container maxWidth="lg" style={{ marginTop: '2rem' }}>
				<Grid container spacing={2}>
					{shops?.map((shop) => (
						<Grid item xs={12} sm={6} md={4} key={shop.id}>
							{/* <Card>
                <CardContent style={{display:"flex", justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                  <Typography variant="h5" component="div">
                    {shop.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {shop.bio}
                  </Typography>
                </CardContent>
              </Card> */}
							<ActionCardProduct shop={shop} handleEdit={handleEdit} handleDelete={handleDelete} />
						</Grid>
					))}
				</Grid>
			</Container>
			<Container maxWidth="lg" style={{ marginTop: '2rem', height: "50vh", display: "flex", justifyContent: 'center', alignItems: "center" }}>
				<Grid container>
					<Button onClick={() => setShowModal(true)}>
						Add Product
					</Button>
				</Grid>
			</Container>
			{showModal &&
				<AddProduct isOpen={showModal} onClose={() => setShowModal(false)} onCreate={addProduct} product={product} fetch={fetchProducts}/>
			}
		</div>
	);
};

export default MyShop;
