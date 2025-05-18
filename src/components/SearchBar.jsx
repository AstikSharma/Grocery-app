import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useEffect } from 'react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalSearchTerm(localSearchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <Box sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: 500, md: 700 },
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        size="small"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" sx={{ color: 'text.secondary', paddingRight: "20px" }}>
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            paddingRight: '8px',
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
            '&.Mui-focused': {
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
              }
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.08)',
          },
          maxWidth: 700,
        }}
      />
    </Box>
  );
};