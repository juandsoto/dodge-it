import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useStore from "store";
import { CRASH_SCREEN_CONTAINER_VARIANTS } from "utils/motion";
const CrashScreen = () => {
  const { crashes } = useStore();
  const [showScreen, setShowScreen] = useState<boolean>(false);

  useEffect(() => {
    if (crashes.crack === 0 && crashes.object === 0) return;
    setShowScreen(true);
    const timeout = setTimeout(() => {
      setShowScreen(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [crashes]);

  return (
    <AnimatePresence mode="wait">
      {showScreen && (
        <motion.div
          key="crash_screen_container"
          variants={CRASH_SCREEN_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute z-50 top-0 left-0 h-screen w-screen bg-red-500/50 flex items-center justify-center"
        >
          <motion.div
            key="crash_screen_title"
            transition={{ type: "spring" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-light w-full bg-red-700/80 px-4 py-8 text-center"
          >
            <span className="text-3xl">Be Careful!</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CrashScreen;
