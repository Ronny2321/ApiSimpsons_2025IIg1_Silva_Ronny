import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";

import CharactersPage from "./Pages/Characters/CharactersPage";
import LocationsPage from "./Pages/Locations/LocationsPage";
import EpisodesPage from "./Pages/Episodes/EpisodesPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Router>
      <div className="app-shell">
        <Header onMenuClick={() => setNavOpen(true)} />

        <div
          className={`app-overlay ${navOpen ? "show" : ""}`}
          onClick={() => setNavOpen(false)}
        />

        <div id="container-body">
          <NavBar isOpen={navOpen} onClose={() => setNavOpen(false)} />
          <main className="app-main" role="main">
            <Routes>
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/episodes" element={<EpisodesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
