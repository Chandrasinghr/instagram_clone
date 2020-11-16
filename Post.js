import React,{useState} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
function Post({postId, username, caption, imageurl}) {
  const{comments ,setComments} =useState([])
    return (
        <div className="post">
            <div className="post__header">
            <Avatar
                className="post__avatar"
                alt={username}
                src={imageurl}
            />
            <h3>{username}</h3>
            
          {/*header*/}
          </div>
            <img className="post__image" src={imageurl}/>
          {/*image*/}
            <h4 className="post__text"><strong>{username}</strong>  {caption}</h4>
          {/*username+ coption*/}
        </div>
    )
}

export default Post
