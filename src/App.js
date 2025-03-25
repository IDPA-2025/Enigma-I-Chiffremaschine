import { useState } from "react";
import Settings from "./settings.js";
import Enigma from "./enigma.js";
import EnigmaVisualizer from "./draw.js"; // Import des Visualizers
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
  const [connections, setConnections] = useState([]); // Neu: Speichert Verbindungen für Visualisierung

  const initializeEnigma = (newConfig) => {
    const { walze1, start1, walze2, start2, walze3, start3, reflektor, steckerbrett } = newConfig;
    const plugboardMap = new Map(
      steckerbrett.flatMap((pair) => [[pair[0], pair[1]], [pair[1], pair[0]]])
    );
    setEnigma(new Enigma(walze1, start1, walze2, start2, walze3, start3, reflektor, plugboardMap));
    setConfig(newConfig);
  };

  const handleKeyPress = (letter) => {
    if (enigma) {
      setActiveKey(letter);
      const path = enigma.getSignalPath(letter); // Methode zum Verbindungsweg holen
      const encodedLetter = enigma.encrypt(letter);
      setOutputKey(encodedLetter);

      // Neu: Signalverbindungen speichern
      const formattedConnections = path.map((step, index) => ({
        from: step.from,
        to: step.to,
        row: index,
      }));
      setConnections(formattedConnections);
    }
  };

  return (
    <div className="container">
      <button onClick={() => setShowSettings(true)} className="settings-btn">
        Einstellungen
      </button>
      {showSettings && <Settings onSave={initializeEnigma} onClose={() => setShowSettings(false)} />}
      <br />

      {/* Neu: Visualisierung */}
      <EnigmaVisualizer connections={connections} />

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
    </div>
  );
};

export default InputOutput;
