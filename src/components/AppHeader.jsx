import { AppBar, Toolbar, Box, IconButton, Badge, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SearchBar } from './SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Avatar from '@mui/material/Avatar';

export const AppHeader = ({ searchTerm, setSearchTerm }) => {
    const { cart } = useCart();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'white' }}>
            <Toolbar sx={{
                marginTop: { xs: "0.5%", md: "1%" },
                marginLeft: { xs: "2%", sm: "5%", md: "10%" },
                display: 'flex',
                gap: { xs: '20px', sm: '50px', md: '100px' },
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
                    GROCERIES
                </Typography>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: '8px', sm: '16px' },
                    flexShrink: 0,
                    order: { xs: 3, sm: 0 }, // Move icons below on small screens
                    width: { xs: '100%', sm: 'auto' }, // Full width on small screens
                    justifyContent: { xs: 'center', sm: 'flex-end' }
                }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={3} sx={{ '& .MuiBadge-badge': { backgroundColor: '#f44336' } }}>
                            <FavoriteIcon color="error" />
                        </Badge>
                    </IconButton>

                    <IconButton>
                        <Avatar alt="Profile" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                    </IconButton>

                    <IconButton component={Link} to="/checkout" color="inherit">
                        <Badge badgeContent={cartItemCount} sx={{ '& .MuiBadge-badge': { backgroundColor: '#2196f3' } }}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};