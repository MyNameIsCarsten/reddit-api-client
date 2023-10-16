import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filters: {
            sorting: 'ascending',  
        },
    },
    reducers: {
        changeFilter: (state, action) => {
            state.filters.sorting = action.payload
        } 
    },
    extraReducers: {}
});

export default filterSlice.reducer;
export const selectContent = (state) => state.filter.filters;
export const {changeFilter} = filterSlice.actions