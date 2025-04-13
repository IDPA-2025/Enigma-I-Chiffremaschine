const Scrambler = require('./Scrambler.js');

class Plugboard extends Scrambler {
    constructor(plugboardMap) {
        super();
        this.plugboardMap = new Map();

        
        for (let [key, value] of plugboardMap) {
            this.plugboardMap.set(key, value);
            this.plugboardMap.set(value, key);
        }
    }

    scramble(letter, phase = "hin") {
        const mappedLetter = this.plugboardMap.get(letter) || letter;
    
        if (phase === "hin") {
            Scrambler.counter = 60;
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(letter)]);
            Scrambler.num++;
            Scrambler.counter += 90;
        } else if (phase === "zurück") {
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(mappedLetter)]);
            Scrambler.num++;
        }
    
        return mappedLetter;
    }
     
}

module.exports = Plugboard;
