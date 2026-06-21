import React from "react";
import { CONFIG } from "./config.js";
import Hero from "./components/Hero.jsx";
import Timeline from "./components/Timeline.jsx";
import ServiceRoadCard from "./components/ServiceRoadCard.jsx";
import Footer from "./components/Footer.jsx";
import InstagramAnalysis from "./components/InstagramAnalysis.jsx";

function App() {
  return (
    <div className="appShell">
      <Hero />
      <main className="mainContent">
        <section className="section">
          <Timeline memories={CONFIG.memories} />
          <ServiceRoadCard />
        </section>

        <section className="analysisSection">
          <InstagramAnalysis />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
