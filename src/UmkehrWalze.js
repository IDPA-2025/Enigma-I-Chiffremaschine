
const Alphapet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const KeyAlphapet = "EJMZALYXVBWFCRQUONTSPIKHGD";

export function UmkehrWalze(character) {
    let position= 0;
    for(let i = 1; i < Alphapet.length; i++){
        if(character.toUpperCase() == Alphapet.charAt(i)){
            position=i;
        }
    }
    return KeyAlphapet.charAt(position);
}
