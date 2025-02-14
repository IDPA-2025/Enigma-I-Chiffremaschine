const Alphapet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const Walze1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"


export function encrypt(character, startAt){
    let rotatedWalze1 = Walze1;
    let position;
    for(let i = 0; i < startAt; i++){
        rotatedWalze1 =  rotateWalze(rotatedWalze1);
     }
    for(let i = 0; i < Alphapet.length;i++){
        if(character.toUpperCase() == Alphapet.charAt(i)){
            position = i;
        }
    }
    let result = rotatedWalze1.charAt(position);
    rotatedWalze1 = rotateWalze(rotatedWalze1);
    return result;
}

function rotateWalze(walze){
    return walze.slice(1) + walze[0];
}

