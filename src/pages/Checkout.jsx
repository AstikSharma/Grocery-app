import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { applyOffers, calculateTotals } from '../utils/offers';
import { Link } from 'react-router-dom';
import { CartButton } from '../components/CartButton';
import { AppHeader } from '../components/AppHeader';

export const Checkout = () => {
  const { cart, clearCart } = useCart();
  const cartWithOffers = applyOffers(cart);
  const { subtotal, discount, total } = calculateTotals(cartWithOffers);

  return (
    <>
      <AppHeader />
      <Container maxWidth={false} sx={{
        py: "2%",
        mx: { xs: "10px", sm: "30px", md: "155px" },
        width: { xs: "calc(100% - 20px)", sm: "calc(100% - 60px)", md: "68%" }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 15 }}>
          <Typography variant="h5" fontWeight="bold">
            Checkout
          </Typography>
        </Box>
        <Box sx={{ ml: { xs: 0, md: 20 } }}>
          {cartWithOffers.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" gutterBottom>
                Your cart is empty
              </Typography>
              <Button variant="contained" component={Link} to="/">
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartWithOffers.map((item) => (
                  <CartItem key={`${item.id}-${item.quantity}`} item={item} />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Subtotal - Responsive version that maintains desktop layout */}
              <Box sx={{
                display: 'flex',
                mb: 3,
                ml: { xs: 0, md: 42.5 },
                flexDirection: { xs: 'row', md: 'row' }, // Always row
                justifyContent: { xs: 'space-between', md: 'flex-start' } // Space between on mobile only
              }}>
                <Box sx={{
                  width: { xs: 'auto', md: 100 },
                  textAlign: { xs: 'left', md: 'right' },
                  mr: { xs: 2, md: '150px' } // Reduced gap on mobile
                }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Subtotal</Typography>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>£{subtotal}</Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Discount - Responsive version that maintains desktop layout */}
              <Box sx={{
                display: 'flex',
                mb: 3,
                ml: { xs: 0, md: 42.5 },
                flexDirection: { xs: 'row', md: 'row' },
                justifyContent: { xs: 'space-between', md: 'flex-start' }
              }}>
                <Box sx={{
                  width: { xs: 'auto', md: 100 },
                  textAlign: { xs: 'left', md: 'right' },
                  mr: { xs: 2, md: '150px' }
                }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Discount</Typography>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>£{discount}</Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                ml: { xs: 0, md: 42 },
                pr: 2,
                flexDirection: { xs: 'column', md: 'row' }, // Column on mobile
                gap: { xs: 2, md: 1 } 
              }}>
                <Box sx={{
                  display: 'flex',
                  width: { xs: '100%', md: 'auto' },
                  justifyContent: { xs: 'space-between', md: 'flex-start' }
                }}>
                  <Box sx={{
                    width: { xs: 'auto', md: 100 },
                    textAlign: { xs: 'left', md: 'right' },
                    mr: { xs: 2, md: '155px' }
                  }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 500, mr: { xs: 0, md: 7 } }}>£{total}</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={clearCart}
                  component={Link}
                  to="/"
                  sx={{
                    backgroundColor: 'success.main',
                    opacity: 0.75,
                    mr: { xs: 0, md: 2 },
                    '&:hover': {
                      backgroundColor: 'success.dark',
                    },
                    px: { xs: 4, md: 8 },
                    py: 1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    width: { xs: '100%', md: 'auto' },
                    mt: { xs: 1, md: 0 }
                  }}
                >
                  Checkout
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />


            </>
          )}
        </Box>
      </Container>
    </>
  );
};
