import "./App.css";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import Player from "./components/Player/Player";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Player />
      <Footer />
    </div>
  );
}

export default App;
