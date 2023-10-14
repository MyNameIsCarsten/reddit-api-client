import { createSlice } from '@reduxjs/toolkit';


export const searchBarSlice = createSlice({
    name: 'searchBarTerm',
    initialState: {
        searchTerm: '',
    },
    reducers: {
        //Reducer for "addTodo" action
        addSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
    },
});

export default searchBarSlice.reducer;
export const selectSearchTerm = (state) => state.searchTerm.searchTerm;
export const { addSearchTerm } = searchBarSlice.actions;
