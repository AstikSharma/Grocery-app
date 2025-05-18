import { useState } from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isLowStock = product.available < 10;
  const stockStatus = product.available <= 0
    ? 'Out of stock'
    : isLowStock
      ? `Only ${product.available} left`
      : 'Available';

  const stockColor = product.available <= 0
    ? 'error'
    : isLowStock
      ? 'warning'
      : 'success';

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const isLongDescription = product.description.length > 100;
  const displayedDescription = showFullDescription
    ? product.description
    : product.description.slice(0, 50) + (isLongDescription ? '...' : '');

  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 3,
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
        width: { xs: '100%', sm: 580 },
        height: { xs: 'auto', sm: 300 },
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'hidden',
      }}
    >
      {/* Left Half: Image */}
      <Box sx={{
        width: { xs: '100%', sm: '50%' },
        height: { xs: 200, sm: '100%' },
      }}>
        <CardMedia
          component="img"
          image={product.img}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Right Half: Content */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {displayedDescription}
            {isLongDescription && (
              <Button
                variant="text"
                size="small"
                onClick={toggleDescription}
                sx={{ textTransform: 'none', ml: 1, p: 0, minWidth: 'auto' }}
              >
                {showFullDescription ? 'See less' : 'See more'}
              </Button>
            )}
          </Typography>

          <Chip
            label={stockStatus}
            color={stockColor}
            size="small"
            sx={{ mt: "120px" }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={500}>
            {product.price}
          </Typography>
          <Box>
            <IconButton
              onClick={() => addToCart(product)}
              disabled={product.available <= 0}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
