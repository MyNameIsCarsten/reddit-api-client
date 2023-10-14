// General imports
import React from 'react'

// Component imports
import Card from './Card';

// Hook imports
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Action import
import { updatePost } from './cardsSlice';


const CardDetail = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm); // Get the search term from Redux store
  const posts = useSelector((state) => state.content.content); // Get the search term from Redux store
  const isLoading = useSelector((state) => state.content.isLoading);
  const item = posts.filter(i => i.data.id === id)[0]

  // Grab Id from url
  let { id } = useParams();
  
  // Fetch data based on the search term
  useEffect(() => {
    if (searchTerm) {
      dispatch(updatePost(searchTerm));
    }
  }, [dispatch, searchTerm]);

  if (isLoading ) {
      return <p>Loading</p>
  } else if (!item) {
      return <p>Loading</p>
  } else {
  return (
    <Card
        title={item.data.title}
        text={item.data.selftext}
        thumbnail={item.data.thumbnail}
        author={item.data.author}
        created={item.data.created}
        ups={item.data.ups}
        down={item.data.downs}
        id={item.data.id}
        key={item.data.id}
        subreddit={item.data.subreddit}
        comments={item.data.num_comments}
        media={item.data.media}
    />)

  };
}

export default CardDetail

