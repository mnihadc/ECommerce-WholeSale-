import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pb-7 pt-5 bg-black">
        <Routes>
          <Route></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
