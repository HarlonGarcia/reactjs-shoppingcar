import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Details from "./pages/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
