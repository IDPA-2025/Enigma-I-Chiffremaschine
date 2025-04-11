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
        Scrambler.counter -= 90;
        transformedChar = this.plugboard.scramble(transformedChar);
        return transformedChar;
    }
    rotateWalzen() {
        const notch1 = this.Walze1.getNotchPosition();
        const notch2 = this.Walze2.getNotchPosition();
    
        // Double-Stepping: Wenn Walze2 an ihrer Kerbe ist, dreht sich Walze3
        if (this.Walze2.position === notch2) {
            this.Walze3.rotateWalze();
        }
    
        // Wenn Walze1 an ihrer Kerbe ist, dreht sich Walze2
        if (this.Walze1.position === notch1) {
            this.Walze2.rotateWalze();
        }
    
        // Walze1 rotiert immer
        this.Walze1.rotateWalze();
    }
    
    

  
    encrypt(character) {
        Scrambler.num = 0;
        Scrambler.deletePathmap();
        Scrambler.counter = 60;
        this.rotateWalzen(); // ✅ Rotiere zuerst – wie in echter Enigma!
        const encryptedChar = this.scramble(character);
        if (character === encryptedChar) {
            throw new Error("Error: Character cannot be the same after encryption.");
        }
        return encryptedChar;
    }
    

    
    getSignalPath() {
        console.log(Scrambler.pathMap);
        return Scrambler.pathMap;   
    }
}

module.exports = Enigma;
