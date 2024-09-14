import { useContext } from "react";
import { createContext } from "react";
import { ulid } from "ulid";
import localForage from "localforage";
import { useRef } from "react";
import { useEffect } from "react";
import { rrwebReStore } from "./utils";
import { useState } from "react";
import { useRecodePlayId } from "./RecodePlayIdContext";

const RecodeReplyContext = createContext({
  getAllRecording: [],
  currentRecodeRef: null,
  refreshKeys: () => {},
});

export function RecodeReplyContextProvider({ children }) {
  const { currentRecodeRef } = useRecodePlayId();
  const [getAllRecording, setGetAllRecording] = useState([]);
  const refreshKeys = async () => {
    const data = await rrwebReStore.keys();
    setGetAllRecording(data);
  };

  useEffect(() => {
    refreshKeys();
  }, []);

  return (
    <>
      <RecodeReplyContext.Provider
        value={{
          getAllRecording,
          currentRecodeRef,
          refreshKeys: refreshKeys,
        }}
      >
        {children}
      </RecodeReplyContext.Provider>
    </>
  );
}

export const useRecodeReply = () => {
  const context = useContext(RecodeReplyContext);

  if (context === null) {
    throw new Error("useRecodeReply context is not defined");
  }

  return context;
};
