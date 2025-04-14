const Scrambler = require('./Scrambler.js');


// Steckerbrett-Klasse, die die Logik des Steckerbretts implementiert
// Diese Klasse erbt von der Scrambler-Klasse und implementiert die scramble-Methode
class Plugboard extends Scrambler {

    // Konstruktor der Plugboard-Klasse
    // Initialisiert das Steckerbrett mit einem Mapping von Buchstaben
    constructor(plugboardMap) {
        super();
        this.plugboardMap = new Map();
        for (let [key, value] of plugboardMap) {
            this.plugboardMap.set(key, value);
            this.plugboardMap.set(value, key);
        }
    }


    // Verschlüsselt ein Zeichen durch das Steckerbrett
    // Es wird die Value mit dem Key der Map getauscht
    // und der Buchstabe wird entsprechend transformiert
    scramble(letter, phase = "hin") {
        const mappedLetter = this.plugboardMap.get(letter) || letter;
        if (phase === "hin") {
           
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(mappedLetter)]);
            Scrambler.num++;
            Scrambler.counter += 90;
        } else if (phase === "zurück") {
            Scrambler.pathMap.set(Scrambler.num, [Scrambler.counter, Scrambler.getCharPositionForCanvas(mappedLetter)]);
            Scrambler.num++;
        }
        return mappedLetter;
    }
     
}

module.exports = Plugboard;
