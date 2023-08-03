import { motion } from "framer-motion";
import GooglePic from './Google.png';
import {auth, provider} from './Firebase.js'
import{signInWithPopup, signOut} from 'firebase/auth';
import{useNavigate} from 'react-router-dom';


const animations = {
  initial: { opacity: 0, },
  animate: { opacity: 1},
  transition: {duration: 1},
  exit: { opacity: 0},
};

const MenuAnimation = () => {
  let navigate = useNavigate();


  const signInWithGoogle = () => {
    signInWithPopup(auth,provider).then(() =>{
        localStorage.setItem("currentUser",JSON.stringify(auth.currentUser));
        console.log("Login Successful");
      navigate('/Favorites')
      window.location.reload(); 
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        
        navigate('/')
        window.location.reload(); 
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <motion.div
      variants={animations}
      
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .8 }}
    >
      {  <div className = "dropDownMenu">
            {auth.currentUser ? <p className='loginStatus'>Welcome,  {auth.currentUser.displayName}</p> : <p className='loginStatus'>Not Logged in</p>}
            
            {auth.currentUser ?  <button className='loginButton' onClick={logout}>Log Out</button> : <button className='loginButton' onClick={signInWithGoogle}><img src={GooglePic} className= "googlePic" alt = "google"></img>Sign in with Google</button>}
        </div>}
    </motion.div>
  );
};

export default MenuAnimation;