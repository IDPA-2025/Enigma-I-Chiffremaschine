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

    scramble(letter) {
        Scrambler.counter = 60;
        const mappedLetter = this.plugboardMap.get(letter) || letter;
    
        console.log(`Plugboard: ${letter} → ${mappedLetter}`);
    
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(letter)]);
        Scrambler.num++;
        Scrambler.counter += 90;
    
        return mappedLetter;
    }   
}

module.exports = Plugboard;
