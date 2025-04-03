const Scrambler = require('./Scrambler.js');
const Reflektor = require("./Reflektor.js");
const Walze = require("./Walze.js");
const Plugboard = require("./StecherBrett.js");

const newMap = new Map();
class Enigma {

    constructor(W1, startW1, W2, startW2, W3, startW3, Reflector, plugboardMap) {
        this.plugboard = new Plugboard(plugboardMap); 
        this.r = new Reflektor(Reflector);
        this.Walze3 = new Walze(W3, startW3, this.r);
        this.Walze2 = new Walze(W2, startW2, this.Walze3);
        this.Walze1 = new Walze(W1, startW1, this.Walze2);
    }

    scramble(character) {
        let transformedChar = this.plugboard.scramble(character);
        transformedChar = this.Walze1.scramble(transformedChar);
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(transformedChar)]);
        Scrambler.num++;
        transformedChar = this.plugboard.scramble(transformedChar);
        return transformedChar;
    }

    rotateWalze() {
        this.Walze1.rotateWalze();
    }

  
    encrypt(character) {
        Scrambler.num = 0;
        Scrambler.deletePathmap();

        Scrambler.counter = 60;
        const encryptedChar = this.scramble(character); 
        this.rotateWalze();
        return encryptedChar;  
    } 

    
    getSignalPath() {
        return Scrambler.pathMap;   
    }
}

module.exports = Enigma;
