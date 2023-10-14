import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadContent = createAsyncThunk(
    'cards/loadContent',
    async (arg, thunkApi) => {
        let data = await fetch('https://www.reddit.com/r/popular.json');
        const json = await data.json();
        return json.data.children;
    }
);

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (arg, thunkApi) => {
        let data = await fetch(`https://www.reddit.com/search.json?q=${arg}`);
        console.log(`https://www.reddit.com/search.json?q=${arg}`)
        const json = await data.json();
        return json.data.children;
    }
);

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        content: [],
        isLoading: false,
        hasError: false,
        searched: false
    },
    reducers: {},
    extraReducers: {
        [loadContent.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadContent.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadContent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.content = action.payload
        },
        [updatePost.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [updatePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.content = action.payload
            state.searched = true
        },
    }
});

export default cardsSlice.reducer;
export const selectContent = (state) => state.content.content;