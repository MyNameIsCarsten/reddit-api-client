import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadPost = createAsyncThunk(
    'post/loadPost',
    async (arg, thunkApi) => {
        let data = await fetch('https://www.reddit.com/r/popular.json');
        const json = await data.json();
        return json.data.children;
    }
);

export const cardDetailSlice = createSlice({
    name: 'cardDetail',
    initialState: {
        content: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [loadPost.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.content = action.payload
        },
    }
});

export default cardDetailSlice.reducer;
export const selectPost = (state) => state.post.content;
export const selectIsLoading = (state) => state.post.isLoading;