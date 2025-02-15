const Scrambler = require('./Scrambler.js');

class Reflektor extends Scrambler{
    constructor(KeyAlphabet){
        super();
        this.KeyAlphabet = KeyAlphabet;
    }
    scramble(character){;
        let position = this.getCharPosition(character);
        return this.KeyAlphabet.charAt(position);
    }

}

const ReflektorA = new Reflektor("EJMZALYXVBWFCRQUONTSPIKHGD");
const ReflektorB = new Reflektor("YRUHQSLDPXNGOKMIEBFZCWVJAT")
const ReflektorC = new Reflektor("FVPJIAOYEDRZXWGCTKUQSBNMHL")

console.log(ReflektorA.scramble("j"));
console.log(ReflektorB.scramble("j"));
console.log(ReflektorC.scramble("j"));