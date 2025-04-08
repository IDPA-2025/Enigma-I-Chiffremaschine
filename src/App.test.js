const Enigma = require('./enigma');
const { describe, test, expect } = require('@jest/globals');

describe("Enigma Machine Tests", () => {
    test("Einzelne Buchstabenverschlüsselung", () => {
        const enigma = new Enigma("I", 0, "II", 0, "III", 0, "B");
        const input = "A";
        const output = enigma.scramble(input);
        expect(typeof output).toBe("string");
        expect(output.length).toBe(1);
    });

    test("Rotation der ersten Walze", () => {
        const enigma = new Enigma("I", 0, "II", 0, "III", 0, "B");
        
        for (let i = 0; i < 26; i++) {
            enigma.scramble("A");
            enigma.rotateWalze();
        }
        expect(enigma.Walze1.position).toBe(0);
    });

    test("Rotation der zweiten Walze", () => {
        const enigma = new Enigma("I", 16, "II", 0, "III", 0, "B");
        
        for (let i = 0; i < 10; i++) {
            enigma.scramble("A");
            enigma.rotateWalze();
        }
        expect(enigma.Walze1.position).toBe(26 % 26);
        expect(enigma.Walze2.position).toBe(1);
    });
});
