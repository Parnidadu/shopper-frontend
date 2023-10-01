import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        <ListItem button component={RouterLink} to="/shop" onClick={onClose}>
          <ListItemText primary="Shops" />
        </ListItem>
        {/* Add more sidebar links as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
