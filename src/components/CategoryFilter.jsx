import { Button } from '@mui/material';

export const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All items' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'fruit', name: 'Fruit' },
    { id: 'bakery', name: 'Bakery' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    }}>
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          variant={activeCategory === category.id ? 'contained' : 'text'}
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
            fontSize: '1rem',
            padding: '6px 16px',
            minWidth: 'auto',
            borderRadius: '25px',
            border: '1px solid', // Default border for all states
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow for all buttons
            // Active state (black background, white text)
            ...(activeCategory === category.id && {
              backgroundColor: 'black',
              color: 'white',
              borderColor: 'black', // Match border to background
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)', // Stronger shadow for active
              '&:hover': {
                backgroundColor: 'black',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)' // Even stronger on hover
              }
            }),
            // Inactive state (grey text)
            ...(activeCategory !== category.id && {
              color: 'grey.600',
              borderColor: 'grey.300', // Light grey border
              '&:hover': {
                color: 'black',
                backgroundColor: 'grey.100',
                borderColor: 'grey.400', // Slightly darker border on hover
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)' // Enhanced shadow on hover
              }
            })
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};