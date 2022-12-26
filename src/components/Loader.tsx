import { motion } from "framer-motion";
import { LOADER_VARIANTS } from "utils/motion";
const Loader = () => {
  return (
    <motion.div
      key="LOADER"
      variants={LOADER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "spring",
        duration: 1.5,
        repeat: Infinity,
      }}
      className="loader w-24 aspect-square"
    />
  );
};

export default Loader;
