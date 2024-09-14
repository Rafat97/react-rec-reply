import { useContext } from "react";
import { createContext } from "react";
import { ulid } from "ulid";
import localForage from "localforage";
import { useRef } from "react";
import { useEffect } from "react";
import { rrwebReStore } from "./utils";
import { useState } from "react";

const RecodePlayIdContext = createContext({
  currentRecodeRef: null,
  getKeys: () => {},
});

export function RecodePlayIdContextProvider({ children }) {
  const recodeReplyRef = useRef(null);
  const [currentRecodeId, setCurrentRecodeId] = useState(null);

  const getKeys = async () => {
    const data = await rrwebReStore.keys();
    return rrwebReStore.keys();
  };

  const setRecId = async () => {
    if (!recodeReplyRef.current) {
      recodeReplyRef.current = ulid();
      const key = `${recodeReplyRef.current}`;
      await rrwebReStore.setItem(key, []);
      setCurrentRecodeId(key);
    }
    
  };

  useEffect(() => {
    setRecId();
  }, []);

  return (
    <>
      <RecodePlayIdContext.Provider
        value={{
          currentRecodeRef: currentRecodeId,
          getKeys,
        }}
      >
        {children}
      </RecodePlayIdContext.Provider>
    </>
  );
}

export const useRecodePlayId = () => {
  const context = useContext(RecodePlayIdContext);

  if (context === null) {
    throw new Error("useRecodePlay context is not defined");
  }

  return context;
};
