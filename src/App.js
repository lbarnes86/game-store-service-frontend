import Invoice from "./Invoice.js";
import Games from "./Games.js";
import Consoles from "./Consoles.js";
import Tshirts from "./Tshirts.js";
import Navbar from "./Navbar.js";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="container">
      
      {/* <Navbar /> */}

      {/* <Invoice /> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Invoice />} />
          
          <Route path="/consoles" element={<Consoles />} />
         
          <Route path="/games" element={<Games />}
          />
      
          <Route path="/tshirts" element={<Tshirts />} />

          {/* <Route path="/invoices" element={<Invoice />} /> */}
          
        </Routes>
      </Router>
    </main>
  );
}

export default App;
