import React from "react";

import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import * as rrweb from "rrweb";
import { useEffect } from "react";
import { useRef } from "react";
import localForage from "localforage";
import { RecodePlayContextProvider } from "./contex/RecodePlayContext";
import { Link } from "react-router-dom";

// localForage.config({
//   driver: [localForage.INDEXEDDB],
//   name: "rrweb-re",
// });

function Recording() {
  const [count, setCount] = useState(0);
  const eventsRef = useRef([]);

  return (
    <>
      <RecodePlayContextProvider>
        <div>
          <Link to={`/rec`}>Show Records</Link>
        </div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </RecodePlayContextProvider>
    </>
  );
}

export default Recording;
