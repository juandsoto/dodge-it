import { AnimatePresence, motion } from "framer-motion";
import { FADE_VARIANTS } from "utils/motion";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];
}

const ScreenWrapper = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <div {...props} className="layout h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="LAYOUT"
          className={["relative h-screen w-screen", className].join(" ")}
          variants={FADE_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScreenWrapper;
