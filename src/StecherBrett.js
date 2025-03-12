const Scrambler = require('./Scrambler.js');

class plugboard extends Scrambler{
    constructor(plugboardMap){
        super();
        this.plugboardMap = plugboardMap;
    }
    scramble(){
        return this.plugboardMap.get(this.plugboardMap.keys().next().value);    
    }
}

const plugboard1 = new plugboard(new Map([["O","Z"]]));

console.log(plugboard1.scramble());

module.exports = plugboard;