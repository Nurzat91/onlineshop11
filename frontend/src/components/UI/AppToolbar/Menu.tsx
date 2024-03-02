import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <Grid item>
      <Button component={NavLink} to="/register" color="inherit">Register</Button>
      <Button component={NavLink} to="/login" color="inherit">Login</Button>
    </Grid>
  );
};

export default Menu;