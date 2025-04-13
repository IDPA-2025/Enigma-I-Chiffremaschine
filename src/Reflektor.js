    const Scrambler = require('./Scrambler.js');

    // Mapping der Reflektoren und ihrer Schlüsselalphabeten
    const ReflektorKeyMap = new Map();
    ReflektorKeyMap.set("A", "EJMZALYXVBWFCRQUONTSPIKHGD");
    ReflektorKeyMap.set("B", "YRUHQSLDPXNGOKMIEBFZCWVJAT");
    ReflektorKeyMap.set("C", "FVPJIAOYEDRZXWGCTKUQSBNMHL");


    // Reflektor-Klasse, die die Logik des Reflektors implementiert
    // Diese Klasse erbt von der Scrambler-Klasse und implementiert die scramble-Methode
    class Reflektor extends Scrambler{

        // Konstruktor der Reflektor-Klasse
        // Initialisiert den Reflektor mit dem Typ und dem Schlüsselalphabet
        constructor(type){
            super();
            this.KeyAlphabet = ReflektorKeyMap.get(type);   
        }

        // Verschlüsselt ein Zeichen durch den Reflektor
        // Diese Methode wird aufgerufen, wenn der Buchstabe den Reflektor erreicht
        // und gibt den reflektierten Buchstaben zurück
        scramble(character) {
            console.log("Start Reflektor");
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
            Scrambler.num++;
            const position = Scrambler.getCharPosition(character);
            const reflectedChar = this.KeyAlphabet.charAt(position);
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(reflectedChar)]);
            Scrambler.num++;
            Scrambler.counter -= 90;
            console.log(`Reflektor: ${character} → ${reflectedChar}`);
            return reflectedChar;
        }  
    }
module.exports = Reflektor;