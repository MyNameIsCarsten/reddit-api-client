import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadPostData = createAsyncThunk(
    'card/loadPost',
    async (arg, thunkApi) => {
        let data = await fetch(arg);
        const json = await data.json();
        return json;
    }
);

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        content: {
            post: {},
            comments: {}
        },
    },
    reducers: {},
    extraReducers: {
        [loadPostData.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadPostData.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadPostData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.content.post = action.payload[0].data.children
            state.content.comments = action.payload[1].data.children
        }
    }
});

export default cardSlice.reducer;
export const selectContent = (state) => state.post.content;
