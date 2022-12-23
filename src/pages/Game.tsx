import { Grid, Logo, ScreenWrapper } from "components";

const Game = (): JSX.Element => {
  return (
    <ScreenWrapper>
      <div className="game">
        <div className="absolute bottom-2 right-2">
          <Logo />
        </div>
        <Grid />
      </div>
    </ScreenWrapper>
  );
};

export default Game;
