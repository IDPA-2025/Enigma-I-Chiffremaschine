
    const Scrambler = require('./Scrambler.js');


    // Mapping der Walzen und ihrer Rotationsbuchstaben
    // Diese Buchstaben bestimmen, wann die nächste Walze rotiert
    const WalzeRotateMap = new Map();
    WalzeRotateMap.set("I", "Q");
    WalzeRotateMap.set("II", "E");
    WalzeRotateMap.set("III", "V");
    WalzeRotateMap.set("IV", "J");
    WalzeRotateMap.set("V", "Z");


    // Mapping der Walzen und ihrer Schlüsselalphabeten
    const WalzeKeyMap = new Map();
    WalzeKeyMap.set("I",   "EKMFLGDQVZNTOWYHXUSPAIBRCJ");
    WalzeKeyMap.set("II",  "AJDKSIRUXBLHWTMCQGZNPYFVOE");
    WalzeKeyMap.set("III", "BDFHJLCPRTXVZNYEIWGAKMUSQO");
    WalzeKeyMap.set("IV",  "ESOVPZJAYQUIRHXLNFTGKDCMWB");
    WalzeKeyMap.set("V",   "VZBRGITYUPSDNHLXAWMJQOFECK");


    // Walze-Klasse, die die Logik der Walzen implementiert
    class Walze extends Scrambler{

        // Konstruktor der Walze-Klasse
        // Initialisiert die Walze mit Typ, Startposition und der nächsten Walze/Reflektor
        constructor(type, position, nextScrambler){
            super();

        this.KeyAlphabet = WalzeKeyMap.get(type);
        this.nextRotate = WalzeRotateMap.get(type);
        this.position = position;
        this.nextScrambler = nextScrambler;
    }
    // Gibt die Position des Buchstabens im Alphabet zurück
    getPosition(character){
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let p = Scrambler.getCharPosition(character);
         p = (p - this.position + 26) % 26; 
        return Alphabet.charAt(p);
    }

    // Gibt die Position des Buchstabens im KeyAlphabet zurück
    getPositionKeyAlphabet(character){
       return this.KeyAlphabet.indexOf(character); 
    }

    // Gibt die Position des Notches zurück
    getNotchPosition() {
        return Scrambler.getCharPosition(this.nextRotate);
    }
    
    // Methode zur Verschlüsselung eines einzelnen Zeichens
    // Diese Methode wird rekursiv aufgerufen, um den Buchstaben durch die Walze und die nächste Walze/Reflektor zu verschlüsseln
    // Dabei wird die Position der Walze berücksichtigt
    // und der Buchstabe wird entsprechend transformiert
    scramble(character) {
        const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        console.log(`Walze (vorwärts): input=${character}, Position=${this.position}`);
        let p = (Scrambler.getCharPosition(character) + this.position) % 26;
        character = this.KeyAlphabet.charAt(p);
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter += 90;
        character = this.nextScrambler.scramble(character);
        console.log(`Walze (rückwärts): input=${character}, Position=${this.position}`);
        p = this.KeyAlphabet.indexOf(character);
        p = (p - this.position + 26) % 26;
        character = Alphabet.charAt(p);
        Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
        Scrambler.num++;
        Scrambler.counter -= 90;
        return character;
    }
    
    // Methode zur Rotation der Walze
    // Diese Methode wird aufgerufen, wenn die Walze rotiert werden muss
    rotateWalze() {
        this.position = (this.position + 1) % 26;
    }
}

module.exports = Walze;