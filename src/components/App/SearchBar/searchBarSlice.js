import { createSlice } from '@reduxjs/toolkit';


export const searchBarSlice = createSlice({
    name: 'searchBarTerm',
    initialState: {
        searchTerm: '',
        searched: false
    },
    reducers: {
        //Reducer for "addTodo" action
        addSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.searched = true;
        },
    },
});

export default searchBarSlice.reducer;
export const selectSearchTerm = (state) => state.searchTerm.searchTerm;
export const selectSearchStatus = (state) => state.searchTerm.searched;
export const { addSearchTerm } = searchBarSlice.actions;
