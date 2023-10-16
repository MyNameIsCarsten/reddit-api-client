// General imports
import React from 'react';

// Hook imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Component imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Action imports
import { changeFilter } from './filterSlice';

const Filter = () => {
    const [selectedSort, setSelectedSort] = useState('Ascending');
    let sort = '';

    
    console.log('Sort:', sort)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(changeFilter(event.target.value));
        setSelectedSort(event.target.value);
    };
    
    return (
        <Box sx={{ minWidth: 120, maxWidth: 200, display: 'flex', margin: '20px auto' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSort}
              label="Sort"
                    onChange={handleChange}
                    defaultValue={'Ascending'}
            >
              <MenuItem value={'Ascending'}>Ascending</MenuItem>
              <MenuItem value={'Descending'}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      );
    }

export default Filter
