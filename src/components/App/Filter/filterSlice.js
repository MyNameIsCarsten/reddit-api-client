import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filters: {
            sorting: 'ascending',
            authors: ''
        },
    },
    reducers: {
        changeSorting: (state, action) => {
            state.filters.sorting = action.payload
        }, 
        authorFilter: (state, action) => {
            state.filters.authors = action.payload
        }, 
    },
    extraReducers: {}
});

export default filterSlice.reducer;
export const selectContent = (state) => state.filter.filters;
export const {changeSorting, authorFilter} = filterSlice.actions