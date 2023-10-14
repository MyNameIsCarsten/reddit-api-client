import React from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { selectContent } from './cardsSlice';


const Cards = () => {
  const content = useSelector(selectContent);
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm);
  const searched = useSelector((state) => state.content.searched);
    console.log(content)
  
    // Check if content is defined and it has the 'children' array
    if (!content) {
      return <div>No data available.</div>;
    }
  
    return (
      <div>
        <h2 style={{textAlign: 'center', marginTop: 1cd}}>{searched ? `Your search for ${searchTerm}:` : 'Popular Posts:'}</h2>
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
                comments={item.data.num_comments}
                media={item.data.media}
                />))}
      </div>
    );
  };

export default Cards

