import React from "react";

import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import * as rrweb from "rrweb";
import { useEffect } from "react";
import { useRef } from "react";
import localForage from "localforage";
import {
  RecodeReplyContextProvider,
  useRecodeReply,
} from "./contex/RecodeReplyContext";
import { rrwebReStore } from "./contex/utils";
import { Replayer } from "rrweb";
import { Link } from "react-router-dom";

const Play = () => {
  const [event, setEvent] = useState([]);
  const { getAllRecording, currentRecodeRef, refreshKeys } = useRecodeReply();

  const recEventSelect = async (id) => {
    const key = `${id}`;
    const data = (await rrwebReStore.getItem(key)) ?? [];

    let newArr = [];

    for (var i = 0; i < data.length; i++) {
      newArr = newArr.concat(data[i]);
    }

    console.log(newArr);
    if (newArr.length <= 0) {
      alert("No records found");
    }
    const replayer = new Replayer(newArr);
    console.log(replayer);
    replayer.play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshKeys();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const deleteRec = async (id) => {
    const key = `${id}`;
    await rrwebReStore.removeItem(key);
    refreshKeys();
  };

  return (
    <>
      <div>
        {/* <div>
          <Link to={`/`}>Play</Link>
        </div> */}
        <button onClick={() => refreshKeys()}>Refresh</button>
        {getAllRecording.map((recording) => (
          <div
            style={{
              display: "flex",
              gap: "5px",
              flexDirection: "row",
            }}
            key={recording}
          >
            {currentRecodeRef === recording && <div>c</div>}
            <div onClick={() => recEventSelect(recording)}>{recording}</div>
            <div onClick={() => deleteRec(recording)}>delete</div>
          </div>
        ))}
      </div>
    </>
  );
};

function RecordingPlay() {
  return (
    <>
      <RecodeReplyContextProvider>
        <Play />
      </RecodeReplyContextProvider>
    </>
  );
}

export default RecordingPlay;
