const Enigma = require("./enigma.js");

// Beispiel für ein Steckerbrett: O <-> Z, A <-> T
const plugboardSettings = new Map([
    ["O", "Z"],
]);

const enigma = new Enigma("I", 0, "II", 0, "III", 0, "A", plugboardSettings);

console.log(enigma.scramble("A"));

