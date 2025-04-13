import { useState } from "react";
import './Settings.css';

const Settings = ({ onSave, onClose }) => {
  const [walze1, setWalze1] = useState("I");
  const [start1, setStart1] = useState(0);
  const [walze2, setWalze2] = useState("II");
  const [start2, setStart2] = useState(0);
  const [walze3, setWalze3] = useState("III");
  const [start3, setStart3] = useState(0);
  const [reflektor, setReflektor] = useState("A");
  const [steckerbrett, setSteckerbrett] = useState([]);
  const [newPair, setNewPair] = useState("");

  const walzenOptions = ["I", "II", "III", "IV", "V"];

  const getAvailableOptions = (selectedWalzen, currentValue) => {
    return walzenOptions.filter((w) => !selectedWalzen.includes(w) || w === currentValue);
  };

  const handleWalzeChange = (index, value) => {
    if (index === 0) setWalze1(value);
    if (index === 1) setWalze2(value);
    if (index === 2) setWalze3(value);
  };

  const handleSave = () => {
    onSave({ walze1, start1, walze2, start2: start2 + 1, walze3, start3: start3 + 1, reflektor, steckerbrett });
    onClose();
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <h2>Einstellungen</h2>
        <div className="walzen-grid">
          {[walze1, walze2, walze3].map((walze, index) => {
            const selectedWalzen = [walze1, walze2, walze3];

            return (
              <div key={index} className="walzen-row">
                <div className="walze">
                  <label>Walze {index + 1}:</label>
                  <select
                    value={walze}
                    onChange={(e) => handleWalzeChange(index, e.target.value)}
                  >
                    {getAvailableOptions(selectedWalzen, walze).map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="position">
                  <label>Startposition:</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={index === 0 ? start1 : index === 1 ? start2 : start3}
                    onChange={(e) =>
                      index === 0
                        ? setStart1(Number(e.target.value))
                        : index === 1
                        ? setStart2(Number(e.target.value))
                        : setStart3(Number(e.target.value))
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
       <label>Umkehrwalze:</label>
        <select value={reflektor} onChange={(e) => setReflektor(e.target.value)}>
          {["A", "B", "C"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <h3>Steckerbrett</h3>
        <input type="text" maxLength="2" value={newPair} onChange={(e) => setNewPair(e.target.value.toUpperCase())} />
        <button onClick={() => {
          if (newPair.length === 2 && newPair[0] !== newPair[1]) {
            const pairArray = newPair.split("");
            if (!steckerbrett.some(pair => pair.includes(pairArray[0]) || pair.includes(pairArray[1]))) {
              setSteckerbrett([...steckerbrett, pairArray]);
              setNewPair("");
            }
          }
        }}>
          Paar hinzufügen
        </button>
        <ul>
          {steckerbrett.map((pair, index) => (
            <li key={index}>
              {pair[0]} ↔ {pair[1]}
            </li>
          ))}
        </ul>

        <button onClick={handleSave}>Speichern</button>
        <button onClick={onClose} className="close-btn">Schließen</button>
      </div>
    </div>
  );
};

export default Settings;
