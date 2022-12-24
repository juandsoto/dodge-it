import { Grid, Logo, Movements, ScreenWrapper } from "components";

const Game = (): JSX.Element => {
  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
  );
};

export default Game;
