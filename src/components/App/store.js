import { configureStore } from "@reduxjs/toolkit";
// import reducers
import contentReducer from '../Cards/cardsSlice';
import searchTermReducer from '../App/SearchBar/searchBarSlice';

export default configureStore({
  reducer: {
      content: contentReducer,
      searchTerm: searchTermReducer,
    },
});
