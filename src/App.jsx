import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
