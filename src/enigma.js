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
        let transformedChar = this.plugboard.scramble(character, "hin"); // Hinweg Plugboard
        transformedChar = this.Walze1.scramble(transformedChar);         // Walzen
        transformedChar = this.plugboard.scramble(transformedChar, "zurück"); // Rückweg Plugboard ✔
        
        return transformedChar;
    }
    rotateWalzen() {
        const notch1 = this.Walze1.getNotchPosition();
        const notch2 = this.Walze2.getNotchPosition();
    
        // Double-Stepping: Wenn Walze1 an ihrer Notch ist, rotiert Walze2.
        // Wenn Walze2 AN IHRER NOTCH ist, rotiert Walze3 – unabhängig von Walze1.
        const walze1AtNotch = this.Walze1.position === notch1;
        const walze2AtNotch = this.Walze2.position === notch2;
    
        if (walze2AtNotch) {
            this.Walze3.rotateWalze(); // Linke Walze
        }
    
        if (walze1AtNotch || walze2AtNotch) {
            this.Walze2.rotateWalze(); // Mittlere Walze rotiert auch bei Double-Stepping
        }
        console.log(`Rotation: W1=${this.Walze1.position}, W2=${this.Walze2.position}, W3=${this.Walze3.position}`);
        this.Walze1.rotateWalze(); // Rechte Walze immer
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
