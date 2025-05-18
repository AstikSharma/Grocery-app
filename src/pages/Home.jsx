import { useState } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { AppHeader } from '../components/AppHeader';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading, error } = useProducts(activeCategory);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ overflow: "hidden" }}>

      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container maxWidth={false} sx={{
        py: "2%",
        mx: { xs: "10px", sm: "30px", md: "150px" },
        width: { xs: "calc(100% - 20px)", sm: "calc(100% - 60px)", md: "1500px" },
        overflow: "hidden"
      }}>

        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <Typography variant="h5" component="h2" gutterBottom mt={4} mb={2}>
          {activeCategory === 'all' ? 'All Items' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ ml: 2 }}>
              No products found matching your search.
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};