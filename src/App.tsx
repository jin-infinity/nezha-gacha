import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import GiftBox from "@/pages/GiftBox";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giftbox" element={<GiftBox />} />
      </Routes>
    </Router>
  );
}
