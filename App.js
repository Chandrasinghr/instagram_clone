import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'



function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [openSignIn, setOpenSignIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged((authuser =>{
      if (authuser){
        //user login 
        console.log(authuser)
        setUser(authuser)
        
      }else {
        setUser(null)
        //logout
      }
    }))
    return() =>{
      //unsubscribe
      unsubscribe()
    }
  },[user,username])

    useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()})))
    })
    
  }, [])

  const signUp = (event) =>{
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email,password)
    .then((authuser) =>{
       return authuser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }
   /* tslint:disable:no-unused-variable */
  const signIn = (event) => {
    event.preventDefault()
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
  
    <div className="app">
      
     
        
      <Modal
      open={open}
      onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              
                />
            </center>
                <div className="inputid">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="buttonid0" onClick={signUp}>SignUp</button>
                </div>
          </form>
        </div>
      </Modal>
      <Modal
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              
                />
            </center>
                <div className="inputid">
                  
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="buttonid0" onClick={signIn}>SignIn</button>
                </div>
          </form>
        </div>
      </Modal>
      {/*header*/}
      <div className="app__header">
        <img className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
          {user ?(
          <button onClick={() => auth.signOut()}>Log out</button>
          ):(
            <div className="app__loginContainer">
            <button onClick={() => setOpenSignIn(true)}>SIGN IN</button>
            <button onClick={() => setOpen(true)}>SIGN UP</button>
            </div>
          )}

      </div>
      
      <div className="app__posts">
      <div className="app__postLeft">
      {
        posts.map(({id, post}) =>(
          <Post key={id} postId={id} username={post.username} caption={post.caption} imageurl={post.imageurl}/>
        ))
      }
      </div>
      <div className="app__postRight">
      <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      </div>
      
      

      </div>
      
            
      <div className="item">
      
      {/*{user?.displayName?(
          <ImageUpload username={user.displayName}/>
        ):(
          <h3>sorry you need to login</h3>
        )}*/}
      <ImageUpload username={user}/>
      </div>
     
      
    </div>
  );
}

export default App;
