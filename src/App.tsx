import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Details from "./pages/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <div className="layout-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:offerId" element={<Details />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
