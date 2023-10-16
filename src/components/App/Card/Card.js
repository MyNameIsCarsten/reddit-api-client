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
import MarkdownTest from '../Cards/MarkdownTest';

// hook imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import actions
import { loadPostData } from '../CardDetails/cardSlice';

export default function MediaCard({ title, text, thumbnail, author, created, ups, down, id, subreddit, comments, media, preview, cardType, post_hint }) {
  const dispatch = useDispatch();
  let url = '';
  let post_snippet = null;
  let videoUrl = null;

  const post = useSelector((state) => state.post)
  console.log('Post:', post.content.post)
  console.log('Post Length:', Object.keys(post.content.post).length)

  if (cardType !== 'list' && Object.keys(post.content.post).length > 0) {
    url = post.content.post[0].data.url
    console.log('Url:', url)
    if (url.includes('reddit') && 'media_metadata' in post.content.post[0].data) {
      const firstKey = Object.keys(post.content.post[0].data.media_metadata)[3];
      url = post.content.post[0].data.media_metadata[firstKey].s.u.replace(/amp;/g, '')
      console.log('Url:', url)
      // const decodedURL = decodeURIComponent(url);
      // Extract the desired part from the decoded URL
      // const regex = /https:\/\/preview\.redd\.it\/[a-zA-Z0-9]+\.jpg\?width=\d+&crop=smart&auto=webp&s=[a-zA-Z0-9]+/;
      // const match = decodedURL.match(regex);
      // url = decodedURL
      post_hint = 'image'
    }
  }

  if (cardType !== 'list' && post_hint === 'hosted:video'  && Object.keys(post.content.post).length > 0) {
    videoUrl = post.content.post[0].data.secure_media.reddit_video.fallback_url
  }

  function getTimeElapsedString(timestamp) {
    // Convert the timestamp to a Date object
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
  
    // Get the current date and time
    const now = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = now - date;
  
    // Calculate various time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Roughly 30 days per month
    const years = Math.floor(months / 12);
  
    // Create a human-readable string
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
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
        sx={{ width: 700 }}
        style={{ display: "flex", alignItems: "center", backgroundColor: '#1A1A1B', color: '#C0C3C5' }}
      >
          
      <div style={{ minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1A1A1B' }}>
        <Typography style={{ display: "flex" }}>
          <ArrowCircleUpIcon />
   
        </Typography>
        {ups}
        <Typography style={{ display: "flex" }}>
          <ArrowCircleDownIcon />
  
        </Typography>
          </div>
          
          
  
          <div id='content' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', backgroundColor: '#1A1A1B' }}>
          <div style={{ display:'flex', justifyContent: 'space-around', marginTop: 10, backgroundColor: '#1A1A1B' }}>
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
            <Button size="small">Post</Button>
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
        sx={{ width: 700 }}
        style={{ display: "flex", alignItems: "center", backgroundColor: '#1A1A1B', color: '#C0C3C5' }}
      >
          
      <div style={{ minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1A1A1B' }}>
        <Typography style={{ display: "flex" }}>
          <ArrowCircleUpIcon />
   
        </Typography>
        {ups}
        <Typography style={{ display: "flex" }}>
          <ArrowCircleDownIcon />
  
        </Typography>
          </div>
          
          
  
          <div id='content' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', backgroundColor: '#1A1A1B' }}>
          <div style={{ display:'flex', justifyContent: 'space-around', marginTop: 10, backgroundColor: '#1A1A1B' }}>
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
          <Typography style={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
            {post_hint}
              </Typography>
              
          {post_snippet ? post_snippet : null}
            
  
            {id && text ?
              (<Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: `${cleanedText}` }} style={{ lineBreak: 'anywhere' }} />)
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
            <Button size="small">Post</Button>
          </Link>
        </CardActions> 
        </div>
      </Card>
    </div>
    );
  }
  
}
