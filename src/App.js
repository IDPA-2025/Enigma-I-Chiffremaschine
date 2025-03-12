import { useState } from "react";
import { UmkehrWalze } from "./UmkehrWalze.js"
import {encrypt} from "./Walzen.js"
import "./App.css";


let output = "";
function App() {
  const [selectedLetters, setSelectedLetters] = useState("");
  const [output, setOutput] = useState("")
  const [walze1, setWalze1] = useState()
 
  
  const handleClick = (letter) => {
    const Walze1Letter = encrypt(letter, walze1);
    const ReflektorLetter = UmkehrWalze(Walze1Letter);
  
    setSelectedLetters((prev) => prev + letter);
    setOutput((prev) => prev + ReflektorLetter);
  
   
    setWalze1((prev) => (prev + 1) % 27); 
  };
  

  function increment(){
    if(walze1<26){
      setWalze1(walze1 +1)
    }
  }

  function decrement() {
    if(walze1 > 1){
      setWalze1(walze1 - 1);
    }
  }

  return (
  
    <div>


    <label>
         <input name="myInput" />
      </label>
      <label>
     <input name="myInput" />
      </label>
      <label>
   <input name="myInput" />
      </label>
      <label>
      <input name="myInput" />
      </label>
















      
      <button onClick={() => handleClick("a")}>a</button>
      <button onClick={() => handleClick("b")}>b</button>
      <button onClick={() => handleClick("c")}>c</button>
      <button onClick={() => handleClick("d")}>d</button>
      <button onClick={() => handleClick("e")}>e</button>
      <button onClick={() => handleClick("f")}>f</button>
      <button onClick={() => handleClick("g")}>g</button>
      <button onClick={() => handleClick("h")}>h</button>
      <button onClick={() => handleClick("i")}>i</button>
      <button onClick={() => handleClick("j")}>j</button>
      <button onClick={() => handleClick("k")}>k</button>
      <button onClick={() => handleClick("l")}>l</button>
      <button onClick={() => handleClick("m")}>m</button>
      <button onClick={() => handleClick("n")}>n</button>
      <button onClick={() => handleClick("o")}>o</button>
      <button onClick={() => handleClick("p")}>p</button>
      <button onClick={() => handleClick("q")}>q</button>
      <button onClick={() => handleClick("r")}>r</button>
      <button onClick={() => handleClick("s")}>s</button>
      <button onClick={() => handleClick("t")}>t</button>
      <button onClick={() => handleClick("u")}>u</button>
      <button onClick={() => handleClick("v")}>v</button>
      <button onClick={() => handleClick("w")}>w</button>
      <button onClick={() => handleClick("x")}>x</button>
      <button onClick={() => handleClick("y")}>y</button>
      <button onClick={() => handleClick("z")}>z</button>

     
      <p>{output}</p>

    </div>
  );
}

export default App;