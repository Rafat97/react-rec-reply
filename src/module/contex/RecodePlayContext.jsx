import { useContext } from "react";
import { createContext } from "react";
import { ulid } from "ulid";
import localForage from "localforage";
import { useRef } from "react";
import { useEffect } from "react";
import { rrwebReStore } from "./utils";
import { useRecodePlayId } from "./RecodePlayIdContext";
import * as rrweb from "rrweb";

const RecodePlayContext = createContext({
  currentRecodeRef: null,
  getKeys: () => {},
});

export function RecodePlayContextProvider({ children }) {
  const { currentRecodeRef } = useRecodePlayId();
  const eventsRef = useRef([]);

  const saveDataInStore = async () => {
    // const copyWithoutFirstElement = eventsRef.current.slice(0, 30);
    const previousSecondElementOfTheArray = eventsRef.current.splice(0, 100);

    // console.log(
    //   "saveDataInStore",
    //   currentRecodeRef,
    //   eventsRef.current.length,
    //   previousSecondElementOfTheArray
    // );

    if (previousSecondElementOfTheArray.length <= 0) {
      return;
    }
    const key = `${currentRecodeRef}`;

    const data = (await rrwebReStore.getItem(key)) ?? [];

    const newData = [...data, previousSecondElementOfTheArray];

    await rrwebReStore.setItem(key, newData);
  };

  useEffect(() => {
    if (currentRecodeRef === null) {
      return;
    }

    const uns = rrweb.record({
      emit(event) {
        // events.push(event);
        eventsRef.current.push(event);

        // if (events.length > 10) {
        //   saveReplayEvents(events);
        // }
      },
    });

    const interval = setInterval(() => {
      saveDataInStore();
    }, 5000);

    // console.log("RecodePlayContextProvider", currentRecodeRef);
    return () => {
      uns();
      clearInterval(interval);
    };
  }, [currentRecodeRef]);

  return (
    <>
      <RecodePlayContext.Provider value={{}}>
        {children}
      </RecodePlayContext.Provider>
    </>
  );
}

export const useRecodePlay = () => {
  const context = useContext(RecodePlayContext);

  if (context === null) {
    throw new Error("useRecodePlay context is not defined");
  }

  return context;
};
