const Walze = require("./Walze.js");


const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Walze1 = new Walze("EKMFLGDQVZNTOWYHXUSPAIBRCJ", 2, "Q")
let ABC = new Set();

for(let i = 0; i < Alphabet.length; i++){
    ABC.add(Alphabet.charAt(i));
}

for(let i = 0; i < Alphabet.length; i++){
    let result = Walze1.scramble(Alphabet.charAt(i));
    if(ABC.delete(result) == false){
       throw new Error("Error");
    }
}
console.log("Test passed");
