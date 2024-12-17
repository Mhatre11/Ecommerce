import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Admin/Dashboard";

// Private Route
import PrivateRoute from "./components/PrivateRoute";
import MyAccount from "./pages/User/MyAccount";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import Wishlist from "./pages/User/Wishlist";
import Address from "./pages/User/Address";
import Password from "./pages/User/Password";

function App() {
  return (
    <>
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/my-account" element={<PrivateRoute />}>
          <Route path="/my-account" element={<MyAccount />}>
            <Route index element={<Navigate to="/my-account/profile" replace />} />
            <Route path="/my-account/profile" element={<Profile />} />
            <Route path="/my-account/orders" element={<Orders />} />
            <Route path="/my-account/wishlist" element={<Wishlist />} />
            <Route path="/my-account/address" element={<Address />} />
            <Route path="/my-account/password" element={<Password />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
