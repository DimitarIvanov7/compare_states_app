import React from 'react';
import {motion} from 'framer-motion'

const loadingContainer = {
    width: '8rem',
    height: '8rem',
    display: 'flex',
    justifyContent: 'space-around'
}

const loadingCircle = {
    display: 'block',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: '#66FCF1',
    borderRadius: '1rem'

}

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.1
        }
    },
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const loadingCircleVariants = {
    start : {
        y: '0%'
    },
    end: {
        y: '100%'
    }
}

const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut"
}

function LoadingAnim() {
  return (
      <div className="loading">
          <h2>Collecting API Data</h2>
            <motion.div style={loadingContainer} variants={loadingContainerVariants} initial="start" animate="end">
                <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}></motion.span>
                <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}></motion.span>
                <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}></motion.span>
            </motion.div>
            

       </div>
  );
}

export default LoadingAnim;
