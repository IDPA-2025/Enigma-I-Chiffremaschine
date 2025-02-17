const Scrambler = require('./Scrambler.js');
const Reflektor = require("./Reflektor.js");
const Walze = require("./Walze.js");

class Enigma{
    constructor(W1, startW1, W2, startW2, W3, startW3, Reflector){
        this.r = new Reflektor(Reflector);
        this.Walze3 = new Walze(W3, startW3, this.r); 
        this.Walze2 = new Walze(W2, startW2, this.Walze3); 
        this.Walze1 = new Walze(W1, startW1, this.Walze2); 
    }

    scramble(character){
        return this.Walze1.scramble(character);
    }
    rotateWalze(){
        this.Walze1.rotateWalze();
    }
    
}

    module.exports = Enigma;