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
    setEnigma(new Enigma(walze1, start1 - 1, walze2, start2 - 1, walze3, start3 - 1, reflektor, plugboardMap));
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
      const newMap = enigma.getSignalPath();
      setKoordinatenMap(newMap);
    }
  };

  return (
    <div className="app">
      {!showSettings && <Header />}

      <main className="container">
  {/* SETTINGS BUTTON FALL 1: Noch keine Config => Zeige Button oben */}
  {!config && (
    <button onClick={() => setShowSettings(true)} className="settings-btn">
      Einstellungen öffnen
    </button>
  )}

  {/* SETTINGS UI */}
  {showSettings && (
    <Settings
      onSave={initializeEnigma}
      onClose={() => setShowSettings(false)}
    />
  )}

  {/* WARNUNG WENN KEINE CONFIG */}
  {!config && (
    <div className="warning" style={{ marginTop: '2rem', color: 'darkred' }}>
      ⚠️ Bitte zuerst die Enigma-Einstellungen festlegen.
    </div>
  )}

  {/* SETTINGS BUTTON FALL 2: Config vorhanden => Zeige Button über Canvas */}
  {config && (
    <>
      <div className="settings-button-wrapper">
        <button onClick={() => setShowSettings(true)} className="settings-btn">
          Einstellungen
        </button>
      </div>

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
          </>
        )}
      </main>

      {!showSettings && <Footer />}
    </div>
  );
};

export default InputOutput;
