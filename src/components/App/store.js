import { configureStore } from "@reduxjs/toolkit";
// import reducers
import contentReducer from './Cards/cardsSlice';
import searchTermReducer from '../App/SearchBar/searchBarSlice';
import filterReducer from '../App/Filter/filterSlice';
import cardReducer from '../App/CardDetails/cardSlice';

export default configureStore({
  reducer: {
      content: contentReducer,
      searchTerm: searchTermReducer,
      filter: filterReducer,
      post: cardReducer
    },
});
