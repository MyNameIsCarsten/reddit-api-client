import React from 'react'

// css imports
import './comments.css'

// hook imports
import { useSelector } from 'react-redux';

// import functions
import { getTimeElapsedString } from '../../../utils/utilities';

// Component imports
import Typography from '@mui/material/Typography';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const Comments = () => {
  const commentArray = useSelector((state) => state.post.content.comments)
  const commentsLoaded = useSelector((state) => state.post.isLoading)
  console.log('commentArray:', commentArray)
  
    const convertToHtml = (str) => {
      console.log(str)
      try{
        return str
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;#39;/g, "'")
          .replace(/&amp;/g, '&');
      }
      catch (error) {
        console.log(error)
      }
    };
  
    function renderHTML(htmlString) {
      return { __html: htmlString };
    }
  return (
    <div className="comments">
      {commentsLoaded ? (
        <p>Loading comments...</p>
      ) : (
        commentArray.map((comment, index) => (
          <div className="comment" key={index}>
            <h4>{comment.data.author} · {getTimeElapsedString(comment.data.created)}</h4>
            <div dangerouslySetInnerHTML={renderHTML(convertToHtml(comment.data.body_html))} />
            <div style={{ minWidth: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1B', justifyContent: 'flex-start', margin: 30 }}>
              <Typography style={{ display: "flex" }}>
                <ArrowCircleUpIcon />
              </Typography>
              {comment.data.ups}
              <Typography style={{ display: "flex" }}>
                <ArrowCircleDownIcon />
              </Typography>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Comments
