import { Logo, ScreenWrapper } from "components";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <ScreenWrapper className="flex items-center justify-center">
      <div className="flex flex-col items-stretch justify-center">
        <Link
          className="bg-background text-2xl font-bold text-center py-2 px-6 rounded-full capitalize hover:scale-125 hover:bg-light hover:text-background transition-all"
          to="/game"
        >
          play
        </Link>
      </div>
    </ScreenWrapper>
  );
};

export default Welcome;
