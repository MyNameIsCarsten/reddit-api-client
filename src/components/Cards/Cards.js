import React from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { selectContent } from './cardsSlice';


const Cards = () => {
    const content = useSelector(selectContent);
    console.log(content)
  
    // Check if content is defined and it has the 'children' array
    if (!content) {
      return <div>No data available.</div>;
    }
  
    return (
      <div>
            {content.map((item) => (
                <Card
                    title={item.data.title}

                    thumbnail={item.data.thumbnail}
                    author={item.data.author}
                    created={item.data.created}
                    ups={item.data.ups}
                    down={item.data.downs}
                    id={item.data.id}
                    key={item.data.id}
                />))}
      </div>
    );
  };

export default Cards

