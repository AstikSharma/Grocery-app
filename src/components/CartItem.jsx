import {
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity, deleteFromCart } = useCart();

  const isLowStock = item.available < 10 && item.available > 0;
  const stockLabel = item.available === 0
    ? 'Out of stock'
    : isLowStock
      ? `Only ${item.available} left`
      : null;

  // Handle quantity updates
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  // Price calculation
  const price = typeof item.price === 'string'
    ? parseFloat(item.price.replace(/[^0-9.-]/g, ''))
    : Number(item.price);
  const totalPrice = (price * item.quantity).toFixed(2);

  return (
    <Paper elevation={3} sx={{
      display: 'flex',
      alignItems: 'center',
      p: 2,
      borderRadius: 6,
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 2, sm: 0 }
    }}>
      {/* Image */}
      <Box
        component="img"
        src={item.img}
        alt={item.name}
        sx={{ width: 60, height: 60, borderRadius: 2, mr: 2 }}
      />

      {/* Product Info */}
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Product code: {item.code}
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mr: { xs: 0, md: 17.5 },
        mb: { xs: 2, sm: 0 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: stockLabel ? 0 : 3 }}>
          {/* Decrement Button (-) */}
          <IconButton
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            sx={{
              backgroundColor: 'error.main',
              opacity: 0.6,
              color: 'white',
              width: 20,
              height: 20,
              borderRadius: '7.5px',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
              '&.Mui-disabled': {
                backgroundColor: 'error.main',
                opacity: 0.6,
                color: 'white',
                cursor: 'not-allowed',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1rem',
              },
            }}
          >
            <RemoveIcon />
          </IconButton>

          <Typography mx={1.5} sx={{ minWidth: 24, textAlign: 'center' }}>
            {item.quantity}
          </Typography>

          {/* Increment Button (+) */}
          <IconButton
            onClick={handleIncrement}
            disabled={item.quantity >= item.available}
            sx={{
              backgroundColor: 'success.main',
              opacity: 0.6,
              color: 'white',
              width: 20,
              height: 20,
              borderRadius: '7.5px',
              '&:hover': {
                backgroundColor: 'success.dark',
              },
              '&.Mui-disabled': {
                backgroundColor: 'success.main',
                opacity: 1,
                color: 'white',
                cursor: 'not-allowed',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1rem',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {stockLabel && (
          <Chip
            label={stockLabel}
            color={item.available === 0 ? 'error' : 'warning'}
            sx={{
              mt: 1,
              width: 100,
              height: 25,
              borderRadius: '10px'
            }}
          />
        )}
      </Box>

      {/* Price */}
      <Typography sx={{ minWidth: 70, mr: 2.5, mb: 3 }}>£{totalPrice}</Typography>

      {/* Remove Button */}
      <IconButton onClick={() => deleteFromCart(item.id)} sx={{
        backgroundColor: 'success.main',
        opacity: 0.6,
        color: 'white',
        width: 20,
        height: 20,
        mb: 3,
        mr: 0.5,
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: 'success.dark',
          opacity: 1
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      }}>
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};