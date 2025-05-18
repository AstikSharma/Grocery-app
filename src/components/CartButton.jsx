import { Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartButton = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Button
      component={Link}
      to="/checkout"
      variant="outlined"
      startIcon={
        <Badge badgeContent={itemCount} color="primary">
          <ShoppingCartIcon />
        </Badge>
      }
      sx={{
        ml: 2,
        textTransform: 'none',
        minWidth: '120px'
      }}
    >
      Cart
    </Button>
  );
};