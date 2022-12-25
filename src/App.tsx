import { Game, Welcome } from "pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
