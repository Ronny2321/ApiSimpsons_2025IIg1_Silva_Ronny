import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import CharactersPage from "./Pages/Characters/CharactersPage";
import LocationsPage from "./Pages/Locations/LocationsPage";
import EpisodesPage from "./Pages/Episodes/EpisodesPage";
import Home from "./Pages/Home/Home";
import CloudReveal from "./Components/Animation/CloudReveal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [setNavOpen] = useState(false);

  return (
    <Router>
      <div className="app-shell">
        <CloudReveal />
        <Header onMenuClick={() => setNavOpen(true)} />


        <div id="container-body">
          <main className="app-main" role="main">
            <Routes>
              <Route path="/" element={<Home />} />
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
