
    const Scrambler = require('./Scrambler.js');

    const WalzeRotateMap = new Map();
    WalzeRotateMap.set("I", "Q");
    WalzeRotateMap.set("II", "E");
    WalzeRotateMap.set("III", "V");
    WalzeRotateMap.set("IV", "J");
    WalzeRotateMap.set("V", "Z");

    const WalzeKeyMap = new Map();
    WalzeKeyMap.set("I",   "EKMFLGDQVZNTOWYHXUSPAIBRCJ");
    WalzeKeyMap.set("II",  "AJDKSIRUXBLHWTMCQGZNPYFVOE");
    WalzeKeyMap.set("III", "BDFHJLCPRTXVZNYEIWGAKMUSQO");
    WalzeKeyMap.set("IV",  "ESOVPZJAYQUIRHXLNFTGKDCMWB");
    WalzeKeyMap.set("V",   "VZBRGITYUPSDNHLXAWMJQOFECK");

class Walze extends Scrambler{
    constructor(type, position, nextScrambler){
        super();

        this.KeyAlphabet = WalzeKeyMap.get(type);
        this.nextRotate = WalzeRotateMap.get(type);
        this.position = position;
        this.nextScrambler = nextScrambler;
    }
    getPosition(character){
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let p = this.getCharPosition(character);
         p = (p - this.position + 26) % 26; 
        return Alphabet.charAt(p);
    }
    getPositionKeyAlphabet(character){
       return this.KeyAlphabet.indexOf(character); 
    }

    scramble(character){
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
       
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter += 90;
        console.log("Walze" + this.nextScrambler + " " + character);
        character = this.getPosition(character)
        let p = this.getCharPosition(character);
        character = this.nextScrambler.scramble(this.KeyAlphabet.charAt(p))
        character = this.getPosition(character)
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter -= 90;
        console.log("Walze" + this.nextScrambler + " " + character);
        p = this.getPositionKeyAlphabet(character);
        console.log(Alphabet.charAt(p));
        return Alphabet.charAt(p);
    }
    rotateWalze(){
        if(this.position === this.getCharPosition(this.nextRotate)){
            console.log("Rotating Walze " + this.nextScrambler);
            this.nextScrambler.rotateWalze();
            this.position= (this.position + 1) % 26;
        }else{
            this.position= (this.position + 1) % 26;
           }    
    }


}


module.exports = Walze;