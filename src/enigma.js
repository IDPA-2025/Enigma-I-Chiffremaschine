const Scrambler = require('./Scrambler.js');
const Reflektor = require("./Reflektor.js");
const Walze = require("./Walze.js");
const Plugboard = require("./SteckerBrett.js");


// Enigma-Klasse, die die gesamte Logik der Enigma zusammenfügt
class Enigma {

    // Konstruktor der Enigma-Klasse
    // Initialisiert die Walzen, den Reflektor und das Steckerbrett
    constructor(W1, startW1, W2, startW2, W3, startW3, Reflector, plugboardMap) {
        this.plugboard = new Plugboard(plugboardMap); 
        this.r = new Reflektor(Reflector);
        this.Walze3 = new Walze(W3, startW3, this.r);
        this.Walze2 = new Walze(W2, startW2, this.Walze3);
        this.Walze1 = new Walze(W1, startW1, this.Walze2);
    }

    //Verschlüsselt ein Buchstaben durch die Walzen und das Steckerbrett
    scramble(character) {
        let transformedChar = this.plugboard.scramble(character, "hin"); 
        transformedChar = this.Walze1.scramble(transformedChar);         
        transformedChar = this.plugboard.scramble(transformedChar, "zurück"); 
        
        return transformedChar;
    }

    //Rotiert die Walzen
    // Wenn Walze 1 oder Walze 2 den Notch erreicht haben, rotiert sich die nächste Walze
    rotateWalzen() {
        const notch1 = this.Walze1.getNotchPosition();
        const notch2 = this.Walze2.getNotchPosition();
        const walze1AtNotch = this.Walze1.position === notch1;
        const walze2AtNotch = this.Walze2.position === notch2;
        if (walze2AtNotch) {
            this.Walze3.rotateWalze(); 
        }
        if (walze1AtNotch || walze2AtNotch) {
            this.Walze2.rotateWalze(); 
        }
        console.log(`Rotation: W1=${this.Walze1.position}, W2=${this.Walze2.position}, W3=${this.Walze3.position}`);
        this.Walze1.rotateWalze();
    }
    
    

    // Methode zur Verschlüsselung eines einzelnen Zeichens
    //fügt scramble() und rotateWalzen() zusammen
    encrypt(character) {
        Scrambler.num = 0;
        Scrambler.deletePathmap();
        Scrambler.counter = 60;
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter += 90;
        this.rotateWalzen(); 
        const encryptedChar = this.scramble(character);
        if (character === encryptedChar) {
            throw new Error("Error: Character cannot be the same after encryption.");
        }
        Scrambler.counter -= 90;
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(encryptedChar)]);
        return encryptedChar;
    }
    

    //übergiebt die Positionen der Buchstaben durch die Walzen und das Steckerbrett in Form einer Map
    getSignalPath() {
        console.log(Scrambler.pathMap);
        return Scrambler.pathMap;   
    }
}

module.exports = Enigma;
