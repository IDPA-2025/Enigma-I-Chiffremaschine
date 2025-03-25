const Scrambler = require('./Scrambler.js');
const Reflektor = require("./Reflektor.js");
const Walze = require("./Walze.js");
const Plugboard = require("./StecherBrett.js");

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
        transformedChar = this.plugboard.scramble(transformedChar);
        return transformedChar;
    }

    rotateWalze() {
        this.Walze1.rotateWalze();
    }

  
    encrypt(character) {
        const encryptedChar = this.scramble(character); 
        this.rotateWalze(); 
        return encryptedChar; 
    }


    getSignalPath(character) {
        let path = [];
        
          // 1. Steckerbrett
        let transformedChar = this.plugboard.scramble(character);
        path.push({ from: character, to: transformedChar, row: 0 });


        let tempchar = transformedChar;
    
        // 2. Walzen vorwärts
        transformedChar = this.Walze1.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 1 });

        tempchar = transformedChar;
    
        transformedChar = this.Walze2.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 2 });

        tempchar = transformedChar;
    
        transformedChar = this.Walze3.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 3 });
    
        // 3. Reflektor
        transformedChar = this.r.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 4 });
    

        tempchar = transformedChar;
    
        // 4. Walzen rückwärts
        transformedChar = this.Walze3.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 5 });

        tempchar = transformedChar;
    
        transformedChar = this.Walze2.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 6 });
    
        tempchar = transformedChar;

        transformedChar = this.Walze1.scramble(transformedChar);
        path.push({ from: tempchar, to: transformedChar, row: 7 });

        tempchar = transformedChar;

        // 5. Steckerbrett zurück
        const finalOutput = this.plugboard.scramble(transformedChar);
        path.push({ from: tempchar, to: finalOutput, row: 8 });
    
        return path;
    }
    
    
}

module.exports = Enigma;
