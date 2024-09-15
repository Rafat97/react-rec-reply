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
        <div className="flex flex-col gap-2 h-screen justify-center items-center bg-slate-900 text-white">
          <div>
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              to={`/rec`}
            >
              Show Records
            </Link>
          </div>
          <div className="flex flex-row gap-3 my-5">
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="h-24 w-24" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="text-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </RecodePlayContextProvider>
    </>
  );
}

export default Recording;
