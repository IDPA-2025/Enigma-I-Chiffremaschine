const Scrambler = require('./Scrambler.js');

class Plugboard extends Scrambler {
    constructor(plugboardMap) {
        super();
        this.plugboardMap = new Map();

        // Bidirektionale Zuordnung (A <-> B bedeutet auch B <-> A)
        for (let [key, value] of plugboardMap) {
            this.plugboardMap.set(key, value);
            this.plugboardMap.set(value, key);
        }
    }

    scramble(letter) {
        return this.plugboardMap.get(letter) || letter; 
    }
}

const plugboard1 = new Plugboard(new Map([
    ["O", "Z"],
    ["A", "T"]
]));


module.exports = Plugboard;
