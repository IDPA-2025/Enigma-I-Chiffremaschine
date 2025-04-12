
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
        let p = Scrambler.getCharPosition(character);
         p = (p - this.position + 26) % 26; 
        return Alphabet.charAt(p);
    }
    getPositionKeyAlphabet(character){
       return this.KeyAlphabet.indexOf(character); 
    }
    getNotchPosition() {
        return Scrambler.getCharPosition(this.nextRotate);
    }
    

    
    
    scramble(character) {
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        // Vorwärts Richtung – VOR Weiterleitung an nächste Walze
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter += 90;
    
        console.log(`Walze (vorwärts): input=${character}, Position=${this.position}`);
    
        // Step 1: Input verschoben um Position, dann aus KeyAlphabet lesen
        let p = (Scrambler.getCharPosition(character) + this.position) % 26;
        character = this.KeyAlphabet.charAt(p);
    
        // Step 2: Weiter an nächste Walze (oder Reflektor)
        character = this.nextScrambler.scramble(character);
    
        // Rückwärts Richtung – NACH Rückgabe von nächster Walze/Reflektor
        console.log(`Walze (rückwärts): input=${character}, Position=${this.position}`);
    
        // Step 3: Finde Buchstaben im KeyAlphabet
        p = this.KeyAlphabet.indexOf(character);
        p = (p - this.position + 26) % 26;
        character = Alphabet.charAt(p);
    
        // Logging & Map-Update für Rückweg
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter -= 90;
    
        return character;
    }
    

    rotateWalze() {
        this.position = (this.position + 1) % 26;
    }
}

module.exports = Walze;