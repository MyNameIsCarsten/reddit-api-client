// General imports
import * as React from 'react';
import { Link } from 'react-router-dom';

// Component imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comments from '../Comments/Comments';

// hook imports
import { useDispatch, useSelector } from 'react-redux';

// import actions
import { loadPostData } from '../CardDetails/cardSlice';

// import functions
import { getTimeElapsedString } from '../../../utils/utilities';

// import css
import './card.css';

export default function MediaCard({ title, text, thumbnail, author, created, ups, down, id, subreddit, comments, media, preview, cardType, post_hint }) {
  const dispatch = useDispatch();
  let url = '';
  let post_snippet = null;
  let videoUrl = null;
  try {
    if ('&amp;' in title) {
      while ('&amp;' in title) {
      title = title.replace('&amp;', '&')
      }
    }
  }
  catch (error) {
    // console.log(error)
  }
  const post = useSelector((state) => state.post)
   
  if (cardType !== 'list' && Object.keys(post.content.post).length > 0) {
    url = post.content.post[0].data.url
    if (url.includes('reddit') && 'media_metadata' in post.content.post[0].data) {
      const firstKey = Object.keys(post.content.post[0].data.media_metadata)[3];
      url = post.content.post[0].data.media_metadata[firstKey].s.u.replace(/amp;/g, '')
      post_hint = 'image'
    }
  }

  if (Object.keys(post.content.post).length > 0 && 'is_video' in post.content.post[0].data && post.content.post[0].data.is_video) {
    if ('media' in post.content.post[0].data) {
      videoUrl = post.content.post[0].data.media.reddit_video.fallback_url
    }
  }

  if (cardType !== 'list' && post_hint === 'hosted:video'  && Object.keys(post.content.post).length > 0 && 'reddit_video' in post.content.post[0].data) {
    videoUrl = post.content.post[0].data.secure_media.reddit_video.fallback_url
  }
   
  const elapsedString = getTimeElapsedString(created);
  const decodedText = new DOMParser().parseFromString(text, 'text/html').body.textContent;
  const cleanedText = decodedText.replace(/<!-- SC_OFF -->|<!-- SC_ON -->/g, '');

  const handleLoadPostData = () => {
    // Define the API endpoint based on the post ID or any other criteria
    const apiEndpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}.json`;

    // Dispatch the async action when the button is clicked
    dispatch(loadPostData(apiEndpoint))
  };

  switch (post_hint) {
    case 'link':
      post_snippet = <Link to={url}>{url}</Link>
      break;
    case 'hosted:video':
      post_snippet = <CardMedia
        component="video"
        alt={title}
        height="auto"
        autoPlay  
        controls  // Add this to enable video controls (play, pause, etc.)
        src={videoUrl}
      />
      break;
    case 'image':
      post_snippet = <CardMedia
        component="img"
        alt={title}
        height="140"
        image={url}
        title={title}
        sx={{height: '100%'}}
      />
      break;
    default:
      break;
  }


  if (cardType === 'list') {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          lineBreak: 'auto'
        }}
      >
  
      <Card
        sx={{ width: '80%', maxWidth: 700 }}
        style={{ display: "flex", alignItems: "center", backgroundColor: '#1A1A1B', color: '#C0C3C5' }}
      >
          
      <div style={{ minWidth: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1A1A1B' }}>
        <Typography style={{ display: "flex" }}>
          <ArrowCircleUpIcon />
   
        </Typography>
        {ups}
        <Typography style={{ display: "flex" }}>
          <ArrowCircleDownIcon />
        </Typography>
      </div>
          
          
  
          <div id='content' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', backgroundColor: '#1A1A1B' }}>
          <div  class='cardsTop'  style={{ display:'flex', justifyContent: 'space-around', marginTop: 10, backgroundColor: '#1A1A1B' }}>
            <Typography style={{ fontSize: 10 }}>
                Posted by:
                <Link to={`https://www.reddit.com/user/${author}`}>
                  <strong style={{color: '#C0C3C5', marginRight: 10}}>u/{author}</strong>
                </Link>
            </Typography>
            <Typography style={{ fontSize: 10, marginRight: 10 }}>
              Posted <strong>{elapsedString}</strong>
              </Typography>
            <Typography style={{ display:'flex', fontSize: 10 }}>
              <ChatBubbleOutlineIcon /><strong>{comments}</strong>
            </Typography>
          </div>
        <CardContent>
          
        <Typography style={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
            
        {thumbnail !== "self" &&
        thumbnail !== "default" &&
        thumbnail !== "nsfw" &&
          !thumbnail.includes("external") ?
          (<CardMedia sx={{ height: 140 }} image={thumbnail} title={title} />) : (
          ""
          )}
  
        {id && text ?
          (<Typography id='findMe' variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: `${cleanedText}` }} />)
          :
          ("")
        }
  
        
  
        </CardContent>
            
        <CardActions>
          <Link to={`card/${id}`}>
            <Button size="small" onClick={handleLoadPostData}>Detail View</Button>
          </Link>
        </CardActions>
  
        <CardActions>
          <Link to={`https://www.reddit.com/r/${subreddit}/comments/${id}`}>
            <Button size="small">View Post on Reddit</Button>
          </Link>
        </CardActions> 
        </div>
      </Card>
    </div>
    );
  } else {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          lineBreak: 'auto'
        }}
      >
  
      <Card
        sx={{ width: '80%', maxWidth: 700 }}
        style={{ display: "flex", alignItems: "center", backgroundColor: '#1A1A1B', color: '#C0C3C5' }}
      >
          
      <div style={{ minWidth: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1A1A1B' }}>
        <Typography style={{ display: "flex" }}>
          <ArrowCircleUpIcon />
        </Typography>
        {ups}
        <Typography style={{ display: "flex" }}>
          <ArrowCircleDownIcon />
        </Typography>
          </div>
          
          
  
          <div id='content' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', backgroundColor: '#1A1A1B' }}>
          <div  class='cardsTop'   style={{ display:'flex', justifyContent: 'space-around', marginTop: 10, backgroundColor: '#1A1A1B', alignItems: 'center' }}>
            <Typography style={{ fontSize: 10 }}>
                Posted by:
                <Link to={`https://www.reddit.com/user/${author}`}>
                  <strong style={{color: '#C0C3C5', marginRight: 10}}>u/{author}</strong>
                </Link>
            </Typography>
            <Typography style={{ fontSize: 10, marginRight: 10 }}>
              Posted <strong>{elapsedString}</strong>
              </Typography>
            <Typography style={{ display:'flex', fontSize: 10, alignItems: 'center' }}>
              <ChatBubbleOutlineIcon /><strong>{comments}</strong>
            </Typography>
          </div>
        <CardContent>
          <Typography style={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
              
          {post_snippet ? post_snippet : null}
            
  
            {id && text ?
              (<Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: `${cleanedText}` }} style={{ lineBreak: 'anywhere', marginTop: 10 }} />)
              :
                ("")}
  
        
  
        </CardContent>
            
        <CardActions>
          <Link to={`card/${id}`}>
            <Button size="small" onClick={handleLoadPostData}>Detail View</Button>
          </Link>
        </CardActions>
  
        <CardActions>
          <Link to={`https://www.reddit.com/r/${subreddit}/comments/${id}`}>
            <Button size="small">View Post on Reddit</Button>
          </Link>
        </CardActions> 
        </div>
        </Card>
        <div>
          <h3 style={{ textAlign: 'center', margin: 15 }}>Comments</h3>
          <Comments />
        </div>
    </div>
    );
  }
  
}
