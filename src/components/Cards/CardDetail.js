import React from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectPost } from './cardDetailsSlice';
import { loadPost } from './cardDetailsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



const CardDetail = () => {
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch the action to load content when the component mounts
        dispatch(loadPost());
    }, [dispatch]);


    const item = useSelector(selectPost).filter(i => i.data.id === id)[0]

    
  
    const isLoading = useSelector(selectIsLoading);
    console.log('isLoading:', isLoading)
    
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

