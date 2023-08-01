import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, },
  animate: { opacity: 1},
  transition: {duration: 1},
  exit: { opacity: 0},
};

const MenuAnimation = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .8 }}
    >
      {children}
    </motion.div>
  );
};

export default MenuAnimation;