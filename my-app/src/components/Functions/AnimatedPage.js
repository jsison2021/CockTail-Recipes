import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 60,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1], // ease-out-expo
  duration: 0.5
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
