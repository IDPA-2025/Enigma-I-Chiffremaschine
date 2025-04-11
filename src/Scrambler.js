class Scrambler{

    
    static pathMap  = new Map();
    static counter = 60;
    static num = 0;
    rotateWalze(){}
    static getCharPosition(character){
        return character.toUpperCase().charCodeAt(0) - 65;
    }

    static getCharPositionForCanvas(character){
        return (character.charCodeAt(0) - 65)*20 + 40;  
    }

    static deletePathmap(){
        this.pathMap  = new Map();
    }

}
module.exports = Scrambler; 

