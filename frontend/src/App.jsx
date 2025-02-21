import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
