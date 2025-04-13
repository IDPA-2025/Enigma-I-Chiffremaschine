    
    //Hauptklasse für die gesamte Enigma logik
    class Scrambler{
        static pathMap  = new Map();
        static counter = 60;
        static num = 0;
        rotateWalze(){}

        //gibt die Position des Buchstabens im Alphabet zurück
        static getCharPosition(character){
            return character.toUpperCase().charCodeAt(0) - 65;
        }

        //gibt die Position des Buchstabens für den Canvas zurück
        static getCharPositionForCanvas(character){
            return (character.charCodeAt(0) - 65)*20 + 40;  
        }

        //erneuert die Map mit den Positionen der Buchstaben
        static deletePathmap(){
            this.pathMap  = new Map();
        }

    }
    module.exports = Scrambler; 

