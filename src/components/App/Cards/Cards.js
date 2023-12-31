// General imports
import React from 'react'

// Component imports
import Card from '../Card/Card';
import Filter from '../Filter/Filter';

// Hook imports
import { useSelector } from 'react-redux';

// Action import
import { selectContent } from './cardsSlice';


const Cards = () => {
  let content = useSelector(selectContent);
  const searched = useSelector((state) => state.content.searched);
  const isLoading = useSelector((state) => state.content.isLoading);
  const sort = useSelector((state) => state.filter.filters.sorting);
  const author = useSelector((state) => state.filter.filters.authors);
  const type = useSelector((state) => state.filter.filters.types);
  

  switch (sort) {
    case 'Ascending':
      content = content
        .filter(item => item.data.created && !isNaN(item.data.created))
        .sort((a, b) => parseFloat(a.data.created) - parseFloat(b.data.created));
      break;
    case 'Descending':
      content = content
        .filter(item => item.data.created && !isNaN(item.data.created))
        .sort((a, b) => parseFloat(b.data.created) - parseFloat(a.data.created));
      break;
    default:
    break;
  }

  if (author !== '') {
    content = content.filter(item => item.data.author === author)
  }

  if (type !== '') {
    content = content.filter(item => item.data.post_hint === type)
  }
  
  // Check if content is defined and it has the 'children' array
  if (!content) {
    return <div>No data available.</div>;
  }

  return (
    <div>
       <Filter />
      <h2 style={{textAlign: 'center', marginTop: 10}}>{searched && !isLoading ? `Your search:` : 'Popular Posts:'}</h2>
        {content.map((item) => (
          <Card
              cardType={'list'}
              title={item.data.title}
              thumbnail={item.data.thumbnail}
              author={item.data.author}
              created={item.data.created}
              ups={item.data.ups}
              down={item.data.downs}
              id={item.data.id}
              key={item.data.id}
            comments={item.data.num_comments}
            subreddit={item.data.subreddit}
            media={item.data.media}
            post_hint={item.data.post_hint}
            preview={item.data.preview ? item.data.preview : ''}
          />
        ))}
    </div>
  );
};

export default Cards

