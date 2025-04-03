    const Scrambler = require('./Scrambler.js');

    const ReflektorKeyMap = new Map();
    ReflektorKeyMap.set("A", "EJMZALYXVBWFCRQUONTSPIKHGD");
    ReflektorKeyMap.set("B", "YRUHQSLDPXNGOKMIEBFZCWVJAT");
    ReflektorKeyMap.set("C", "FVPJIAOYEDRZXWGCTKUQSBNMHL");

    class Reflektor extends Scrambler{
        constructor(type){
            super();
            this.KeyAlphabet = ReflektorKeyMap.get(type);   
        }
        scramble(character){
            let position = this.getCharPosition(character);
            let reflectedChar = this.KeyAlphabet.charAt(position);
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(character)]);
            Scrambler.num++;
            console.log(`Reflektor: ${character} → ${reflectedChar}`);
        
            return reflectedChar;
        }
        
    }


    module.exports = Reflektor;