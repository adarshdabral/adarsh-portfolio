import { motion } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children }) => {
  return (
    <motion.h1
      className="text-4xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h1>
  );
};

export default AnimatedText;