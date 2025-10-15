import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import CharactersPage from "./Pages/Characters/CharactersPage";
import LocationsPage from "./Pages/Locations/LocationsPage";
import EpisodesPage from "./Pages/Episodes/EpisodesPage";
import Home from "./Pages/Home/Home";
import CloudReveal from "./Components/Animation/CloudReveal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CloudRevealLite from "./Components/Animation/CloudRevealLite";
import Footer from "./Components/Footer/Footer";

const CloudOnRouteChange = () => {
  const location = useLocation();
  return <CloudRevealLite key={location.key} durationMs={1400} />;
};

function App() {
  const [setNavOpen] = useState(false);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
        <CloudReveal />
        {<CloudOnRouteChange />}
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
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
