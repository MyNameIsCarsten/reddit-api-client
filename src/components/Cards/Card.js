import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function MediaCard({ title, text, thumbnail, author, created, ups, down, id, subreddit }) {
    //let { id } = useParams();

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

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <Card sx={{ width: 345 }}>
                {thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== 'nsfw' && !thumbnail.includes('external') ? <CardMedia
                    sx={{ height: 140 }}
                    image={thumbnail}
                    title={title}
                /> : ''}
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {title}
                    </Typography>
                    {id ? <Typography variant="body2" color="text.secondary">
                    {text}
                    </Typography> : ''}
                    <Typography>
                        Posted by: {author}
                    </Typography>
                    <Typography>
                        Posted {elapsedString}
                    </Typography>
                    <Typography>
                        Thumbnail {thumbnail}
                    </Typography>
                    <Typography>
                        Upvotes: {ups}
                    </Typography>
                    <Typography>
                        Downvotes: {down}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={ `card/${id}` } >
                        <Button size="small">Learn More</Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
  );
}
