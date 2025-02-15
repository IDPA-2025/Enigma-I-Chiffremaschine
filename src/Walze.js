const Scrambler = require('./Scrambler.js');

class Walze extends Scrambler{
    constructor(KeyAlphabet, position, nextRotate){
        super();
        this.KeyAlphabet = KeyAlphabet;
        this.position = position;
        this.nextRotate = nextRotate;
    }
    getPosition(character){
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let p= 0;
        p = this.getCharPosition(character);
        if(this.position > p){
            p = Alphabet.length - this.position + p;
        }else{
            p = p - this.position;
        }
       return Alphabet.charAt(p); 
    }
    scramble(character){
        character = this.getPosition(character)
        let p = this.getCharPosition(character);
        return this.KeyAlphabet.charAt(p);
    }
}

const Walze1 = new Walze("EKMFLGDQVZNTOWYHXUSPAIBRCJ", 2, "Q")

module.exports = Walze;
