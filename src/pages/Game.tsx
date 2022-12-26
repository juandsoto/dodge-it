import { CrashScreen, Grid, IsOverScreen, Loader, Logo, Movements, ScreenWrapper } from "components";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Game = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ScreenWrapper>
      <>
        {isLoading && (
          <div className="layout absolute z-50 w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
        <CrashScreen />
        <IsOverScreen />
        <div className="game">
          <Grid />
          <Movements />
          {/* Absolute position */}
          <div className="absolute bottom-2 right-2">
            <Logo />
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="relative info">
              <img src="info.svg" alt="info" />
              <div className="tooltip w-64 leading-none">
                <div className="flex flex-col gap-1">
                  <span className="text-primary">How to play?</span>
                  <span>You can move the car with the arrow keys</span>
                  <span>Your goal is to reach home</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary">You will lose when</span>
                  <span>1. Crashing with people</span>
                  <span>2. Going into road cracks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ScreenWrapper>
  );
};

export default Game;
