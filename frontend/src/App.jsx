import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import CreateDeliveryAddress from "./Pages/CreateDeliveryAddress";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-15 pb-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/create-delivery-address"
              element={<CreateDeliveryAddress />}
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
