import React, {Component} from 'react';
import './Post.scss';

class Post extends Component {
  render() {
    let {
      featured_image_url,
      recommends,
      sub_category_name,
      title,
      content,
      author_name,
      min_read,
      published_at,
      views,
      is_recommended,
      is_bookmarked,
      author_pic,
      url
    } = this.props.post;
    return (
      <div className="postsContainer">
        <div className="leftDiv">
          {/* display featured images */}
          <div className="postImage">
            <a href={`/${url}`} className="image" style={{background: `url("${featured_image_url}")`}}>
              {/* hover overlay effect for the image */}
              <div className="overlay"></div>
            </a>
          </div>
          {/* like button */}
          <div className="likes">
            <svg fill={is_recommended===1 ? "#00f" : "000"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
            <p>{recommends}</p>
          </div>
        </div>
        <div className="rightDiv">
          <div className="heading">{sub_category_name}
            <span>
              <svg fill={is_bookmarked===1 ? "#00f" : "000"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </span>
          </div>
          <div className="title">{title}</div>
          {/* Display only first 100 characters */}
          <div className="content">{content.slice(0,100).trim()}...</div>
          <div className="stats">
            <div className="statsDiv">
              <div className="author left">
                <img src={author_pic} alt=""/>
                By&nbsp;<a href={`/author/${author_name}`}>{author_name}</a>
              </div>
              <div className="read right">
                <img src="timer.svg" alt=""/>
                {min_read}
              </div>
            </div>
            <div  className="statsDiv">
              <div className="date left">
                <img src="calender.svg" alt=""/>
                {published_at}
              </div>
              <div className="views right">
                <img src="face.svg" alt=""/>
                {views}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
