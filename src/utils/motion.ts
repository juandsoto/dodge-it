import { Variants } from "framer-motion";

export const FADE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

export const CRASH_SCREEN_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const LOADER_VARIANTS: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: [1, 1.5, 1],
  },
  exit: { scale: 0, opacity: 0 },
};
