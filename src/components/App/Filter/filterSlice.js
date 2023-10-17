import { createSlice } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filters: {
            sorting: 'ascending',
            authors: '',
            types:'',
        },
    },
    reducers: {
        changeSorting: (state, action) => {
            state.filters.sorting = action.payload
        }, 
        authorFilter: (state, action) => {
            state.filters.authors = action.payload
        }, 
        typeFilter: (state, action) => {
            state.filters.types = action.payload
        }, 
    },
    extraReducers: {}
});

export default filterSlice.reducer;
export const selectContent = (state) => state.filter.filters;
export const {changeSorting, authorFilter, typeFilter} = filterSlice.actions