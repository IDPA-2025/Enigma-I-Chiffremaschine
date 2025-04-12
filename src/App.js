import { useState, useEffect } from "react";
import Settings from "./settings.js";
import Enigma from "./enigma.js";
import EnigmaVisualizer from "./draw.js"; 
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"],
  ["A", "S", "D", "F", "G", "H", "J", "K"],
  ["P", "Y", "X", "C", "V", "B", "N", "M", "L"],
];

const InputOutput = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState(null);
  const [enigma, setEnigma] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [outputKey, setOutputKey] = useState(null);
  const [koordinatenMap, setKoordinatenMap] = useState(new Map());

  const initializeEnigma = (newConfig) => {
    const { walze1, start1, walze2, start2, walze3, start3, reflektor, steckerbrett } = newConfig;
    const plugboardMap = new Map(
      steckerbrett.flatMap((pair) => [[pair[0], pair[1]], [pair[1], pair[0]]])
      );
    setEnigma(new Enigma(walze1, start1-1, walze2, start2-1, walze3, start3-1, reflektor, plugboardMap));
    setConfig(newConfig);
  };

  useEffect(() => {
    document.title = 'Enigma Visualizer';
  }, []);
  
  const handleKeyPress = (letter) => {
    if (enigma) {
      setActiveKey(letter);
      const encodedLetter = enigma.encrypt(letter);
      setOutputKey(encodedLetter);

      // Stelle sicher, dass du koordinatenMap über setKoordinatenMap aktualisierst
      const newMap = enigma.getSignalPath(); // Du erhältst die neue Map hier
      setKoordinatenMap(newMap); // Aktualisiere den Zustand mit der neuen Map
    }
  };

  if (!config) {
    return (
      <div className="container">
        {/* Header und Footer nur anzeigen, wenn showSettings false ist */}
        {!showSettings && <Header />}
        
        <button onClick={() => setShowSettings(true)} className="settings-btn">
          Einstellungen öffnen
        </button>
        
        {showSettings && (
          <Settings
            onSave={initializeEnigma}
            onClose={() => setShowSettings(false)}
          />
        )}
        
        <div className="warning" style={{ marginTop: '2rem', color: 'darkred' }}>
          ⚠️ Bitte zuerst die Enigma-Einstellungen festlegen.
        </div>
        
        {!showSettings && <Footer />}
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header und Footer nur anzeigen, wenn showSettings false ist */}
      {!showSettings && <Header />}
      
      <button onClick={() => setShowSettings(true)} className="settings-btn">
        Einstellungen
      </button>
      
      {showSettings && <Settings onSave={initializeEnigma} onClose={() => setShowSettings(false)} />}
      
      <br />

      {/* Neu: Visualisierung */}
      <EnigmaVisualizer koordinatenMap={koordinatenMap} enigma={enigma} />

      <h2>Output</h2>
      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((letter) => (
              <button key={letter} className={`key ${outputKey === letter ? "output" : ""}`}>
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>

      <h2>Input</h2>
      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((letter) => (
              <button
                key={letter}
                className={`key ${activeKey === letter ? "active" : ""}`}
                onClick={() => handleKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer nur anzeigen, wenn showSettings false ist */}
      {!showSettings && <Footer />}
    </div>
  );
};

export default InputOutput;
