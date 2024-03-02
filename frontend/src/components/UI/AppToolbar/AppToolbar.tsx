import { NavLink } from 'react-router-dom';
import {AppBar, CardMedia, Grid, styled, Toolbar, Typography} from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import UserMenu from './UserMenu';
import Menu from './Menu';
import { selectUser } from '../../../features/users/usersSlice';
import image from '../../../assets/images/shop.png';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link to="/" sx={{ display: 'flex', alignItems: 'center' }}>
            {image && (
              <CardMedia sx={{height: '60px', width: '60px', borderRadius: '50%', margin: '10px'}} image={image} />
            )}
            <Typography component="h1" variant="h5">Online Shop</Typography>
          </Link>
         <Grid sx={{ display: 'flex', alignItems: 'center' }}>
           {user ? (
             <UserMenu  user={user}/>
           ) : (
             <Menu/>
           )}
         </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
};
export default AppToolbar;