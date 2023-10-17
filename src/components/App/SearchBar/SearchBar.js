// General imports
import * as React from 'react';

// Component imports
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

// hook imports
import { useDispatch, useSelector } from 'react-redux';

// action imports
import { addSearchTerm } from '../SearchBar/searchBarSlice';
import { updatePost } from '../Cards/cardsSlice';

// css imports
import './searchBar.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm); // Retrieve search term from Redux store
  const dispatch = useDispatch(); // Get the dispatch function

  // Event handler to update the search term as the user types
  const handleSearchChange = (event) => {
    dispatch(addSearchTerm(event.target.value));
  };

  const handleSearchSubmit = () => {
    // Trigger the data fetching action based on the search term
    dispatch(updatePost(searchTerm));
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#0D1117' }}>
        <Toolbar>
 
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'block', minWidth: 150 }}
                  >
                      <Link to='/'>Reddit Client</Link> 
            
          </Typography>
                  
          <Search>
            <SearchIconWrapper>
              <IconButton
                color="primary"
                aria-label="search"
                
              >
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Term"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm} // Bind input value to the searchTerm state
              onChange={handleSearchChange} // Add onChange event handler
            />
            
          </Search>
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            style={{ margin: 10 }}
            component="div"
            onClick={handleSearchSubmit}
          >
              <span id='search'>Search</span>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
