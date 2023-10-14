import { configureStore } from "@reduxjs/toolkit";
// import reducers
import contentReducer from '../Cards/cardsSlice';
import postReducer from '../Cards/cardDetailsSlice';
import searchTermReducer from '../App/SearchBar/searchBarSlice';

export default configureStore({
  reducer: {
      content: contentReducer,
      post: postReducer,
      searchTerm: searchTermReducer,
    },
});
