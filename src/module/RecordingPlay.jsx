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
import rrwebPlayer from "rrweb-player";
import { unpack } from "@rrweb/packer";
import "rrweb-player/dist/style.css";

const Play = () => {
  const [event, setEvent] = useState([]);
  const { getAllRecording, currentRecodeRef, refreshKeys } = useRecodeReply();
  const playElement = useRef(null);

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
      return;
    }
    // const replayer = new Replayer(newArr);
    // console.log(replayer);
    // replayer.play();

    const player = new rrwebPlayer({
      target: playElement.current, // customizable root element
      props: {
        events: newArr,
        unpackFn: unpack,
        autoPlay: false,
        controls: true,
        width: 1024,
        height: 576,
        skipInactive: true,
        inactiveColor: "#f70202",
        //   //   onReady: () => console.log("ready"),
        //   //   onLoading: () => console.log("loading"),
        //   //   onFinish: () => console.log("finish"),
        //   //   onCapturing: () => console.log("capturing"),
        //   //   onStoppedCapturing: () => console.log("stoppedCapturing"),
        //   //   onPlay: () => console.log("play"),
        //   //   onPause: () => console.log("pause"),
        //   //   onSeek: (e) => console.log("seek", e),
      },
    });

    player.getReplayer().on("start", () => {
      console.log("start");
    });
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
        <div ref={playElement}></div>
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
