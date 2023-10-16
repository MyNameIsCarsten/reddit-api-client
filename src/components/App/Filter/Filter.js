// General imports
import React from 'react';

// Hook imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// Component imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Action imports
import { changeSorting, authorFilter } from './filterSlice';

const Filter = () => {
    const [selectedSort, setSelectedSort] = useState('Ascending');
    let sort = '';
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState([]);
    const content = useSelector((state) => state.content.content)
    
    useEffect(() => {
        if (content.length > 0) {
          const authors = content.map((item) => item.data.author);
          const uniqueAuthors = [...new Set(authors)]; // Remove duplicates
          setAuthors(uniqueAuthors);
        }
      }, [content]);
    
    const dispatch = useDispatch();

    const handleChangeSort = (event) => {
        dispatch(changeSorting(event.target.value));
        setSelectedSort(event.target.value);
    };

    const handleChangeAuthor = (event) => {
        dispatch(authorFilter(event.target.value));
        setSelectedAuthor(event.target.value);
    };
    
    return (
        <>
            <h2 style={{ textAlign: 'center', marginTop: 10 }}>Filters:</h2>
            <div style={{ display: 'flex' }}>
        <Box sx={{ minWidth: 120, maxWidth: 200, display: 'flex', margin: '20px auto', backgroundColor: '#1A1A1B', borderRadius: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{color:'#C0C3C5'}}>Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="sort-simple-select"
              value={selectedSort}
              label="Sort"
            onChange={handleChangeSort}
            defaultValue={'Ascending'}
               style={{color:'#C0C3C5'}}
            >
              <MenuItem value={'Ascending'}>Ascending</MenuItem>
              <MenuItem value={'Descending'}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120, maxWidth: 200, display: 'flex', margin: '20px auto', backgroundColor: '#1A1A1B', borderRadius: 1 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{color:'#C0C3C5'}}>Author</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="author-simple-select"
                value={selectedAuthor}
                label="Author"
                onChange={handleChangeAuthor}
                defaultValue={''}
                style={{color:'#C0C3C5'}}
                    >
                <MenuItem value=''>All Authors</MenuItem>
                {authors.map(a =><MenuItem value={a}>{a}</MenuItem>)}
            </Select>
            </FormControl>
                </Box>
                </div>
        </>
      );
    }

export default Filter
