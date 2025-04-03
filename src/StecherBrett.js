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
        if(!this.plugboardMap.has(letter)) {
            Scrambler.counter = 60;
            console.log("Plugboard: " + letter + " not in map, returning original letter.");
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(letter)]);
            Scrambler.num++;
            Scrambler.counter += 90;    
            return letter; 
        }
        return this.plugboardMap.get(letter) || letter; 
    }
}




module.exports = Plugboard;
