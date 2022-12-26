import { motion } from "framer-motion";
import { toWords } from "number-to-words";
import useStore from "store";
import { CRASH_SCREEN_CONTAINER_VARIANTS } from "utils/motion";
const IsOverScreen = () => {
  const { isOver, crashes } = useStore();

  if (!isOver.hasWin) return null;

  const isClean = crashes.crack === 0 && crashes.object === 0;

  return (
    <motion.div
      variants={CRASH_SCREEN_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="absolute z-50 top-0 left-0 h-screen w-screen bg-background/50 flex items-center justify-center px-4"
    >
      <motion.div
        transition={{ type: "spring" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-light text-background px-2 sm:px-12 py-4 shadow-md shadow-black rounded-md min-h-[12rem] sm:min-w-[24rem] flex flex-col gap-4 justify-between"
      >
        <div className="flex flex-col gap-4 text-center	">
          <h1 className="text-lg sm:text-2xl text-primary">{isOver.message}</h1>
          {isClean && <p>Safely with no people hurt and the car in perfect conditions.</p>}
          {crashes.crack > 0 && crashes.object === 0 && (
            <p>
              But you fell into <span className="text-primary">{toWords(crashes.crack)}</span>{" "}
              {crashes.crack === 1 ? "crack" : "cracks"}
            </p>
          )}
          {crashes.crack === 0 && crashes.object > 0 && (
            <p>
              But you ran over <span className="text-primary">{toWords(crashes.object)}</span>{" "}
              {crashes.object === 1 ? "person" : "people"}
            </p>
          )}
          {crashes.crack > 0 && crashes.object > 0 && (
            <p>
              But you fell into <span className="text-primary">{toWords(crashes.crack)}</span>{" "}
              {crashes.crack === 1 ? "crack" : "cracks"} and ran over{" "}
              <span className="text-primary">{toWords(crashes.object)}</span>{" "}
              {crashes.object === 1 ? "person" : "people"}
            </p>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {crashes.crack > 0 && crashes.object > 0 && (
            <span className="text-md sm:text-xl text-primary">What a driver!</span>
          )}
          <a className="bg-dark text-light rounded-md px-4 py-2" href="/game">
            Drive Again!
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IsOverScreen;
