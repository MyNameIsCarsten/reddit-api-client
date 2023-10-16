// General imports
import React from 'react'

// Component imports
import Card from '../Card/Card';

// Hook imports
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Action import
import { updatePost } from '../Cards/cardsSlice';


const CardDetails = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm); // Get the search term from Redux store
  
  const isLoading = useSelector((state) => state.content.isLoading);

  // Grab Id from url
  let { id } = useParams();
  const posts = useSelector((state) => state.content.content); // Get the search term from Redux store
  const item = posts.filter(i => i.data.id === id)[0]
  console.log('Item:', item)


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
        cardType={'detail'}
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
      post_hint={item.data.post_hint}
        preview={item.data.preview ? item.data.preview : ''}
    />)

  };
}

export default CardDetails

