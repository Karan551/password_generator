import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*(){}[]+_-/";

    for (let index = 1; index <= length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  function copyPassword() {
    pwdRef.current?.select();
    pwdRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, setBtnText, passwordGenerator]);

  // ref hook
  const pwdRef = useRef(null);
  return (
    <>
      <div className="border mx-auto max-w-[700px]  sm:w-[700px] rounded-xl space-y-3 bg-gray-500 py-6 px-4 my-2 ">
        <h1 className=" text-4xl sm:text-5xl text-center text-white">
          Password Generator
        </h1>
        <div className="flex items-center space-x-3 sm:justify-center justify-end">
          <input
            className="border py-4 px-6 rounded-2xl text-2xl text-orange-500"
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            ref={pwdRef}
          />
          <button
            type="button"
            className="text-2xl border bg-gradient-to-br from-purple-600 to-blue-500  inline-block py-4 px-6 rounded-xl  text-white shadow-lg hover:text-[#f5f5f5] hover:bg-gradient-to-bl focus:outline-none"
            onClick={() => {
              copyPassword(),
                setBtnText('copied');
            }}
            id="btn"
          >
            {btnText}
          </button>
        </div>
        <div className="flex justify-center items-center w-[100%] mx-auto text-2xl text-white px-1 sm:px-4 py-2">
          <div className="flex text-sm sm:text-lg w-1/2 justify-items-end sm:justify-center mx-2">
            <input
              type="range"
              name="range"
              id="range"
              className="cursor-pointer"
              value={length}
              min={6}
              max={100}
              onChange={(event) => {setLength(event.target.value),setBtnText("copy")}}
            />
            <label htmlFor="range" className="pl-1 sm:px-3 whitespace-nowrap">
              Length : {length}
            </label>
          </div>
          <div className="w-1/2 flex">
            <div className=" mx-2 flex gap-x-2  text-sm sm:text-lg">
              <input
                type="checkbox"
                name="number"
                id="check"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev),setBtnText("copy");
                }}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="number" className=" text-white">
                Number
              </label>
            </div>
            <div className=" mx-2 flex gap-x-2  text-sm sm:text-lg">
              <input
                type="checkbox"
                name="character"
                id="character"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev),setBtnText("copy");
                }}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="character" className=" text-white">
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
