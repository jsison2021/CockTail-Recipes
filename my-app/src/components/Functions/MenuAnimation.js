import { motion } from "framer-motion";
import GooglePic from './Google.png';
import { auth, provider } from './Firebase.js'
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const overlayVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

const MenuAnimation = ({ onClose }) => {
  let navigate = useNavigate();

  // Get current user from Firebase auth or localStorage fallback
  const storedUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const currentUser = auth?.currentUser || storedUser;

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("currentUser", JSON.stringify(auth.currentUser));
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
      className="modal-overlay"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="modal-close"
          onClick={onClose}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </motion.button>

        {currentUser?.photoURL && (
          <motion.img
            className="modal-avatar"
            src={currentUser.photoURL}
            alt="Profile"
            variants={itemVariants}
          />
        )}

        <motion.p className="modal-status" variants={itemVariants}>
          {currentUser ? `Welcome, ${currentUser.displayName}` : 'Sign in to save favorites'}
        </motion.p>

        <motion.button
          className="loginButton"
          onClick={currentUser ? logout : signInWithGoogle}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentUser ? (
            'Log Out'
          ) : (
            <>
              <img src={GooglePic} className="googlePic" alt="google" />
              Sign in with Google
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MenuAnimation;
