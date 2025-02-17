class Scrambler{
    constructor() {
    }
    scramble(character){}
    rotateWalze(){}
    getCharPosition(character){
        console.log("getcharPos"+ character);
        return character.toUpperCase().charCodeAt(0) - 65;
        
    
     }
}
module.exports = Scrambler; 


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
    scramble(character){
        console.log(character);
        character = this.getPosition(character)
        let p = this.getCharPosition(character);
       console.log(character);
        character = this.nextScrambler.scramble(this.KeyAlphabet.charAt(p))

        character = this.getPosition(character)
        p = this.getCharPosition(character);
        return this.KeyAlphabet.charAt(p);
    }
    rotateWalze(){
        if(this.position == this.getCharPosition(this.nextRotate)){
            this.nextScrambler.rotateWalze();
            this.position= (this.position + 1) % 26;
        }else{
            this.position= (this.position + 1) % 26;
           }    
    }



}

const Walze1 = new Walze("EKMFLGDQVZNTOWYHXUSPAIBRCJ", 2, "Q")

module.exports = Walze;