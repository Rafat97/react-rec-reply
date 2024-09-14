import localForage from "localforage";

export const rrwebReStore = localForage.createInstance({
  name: "rrweb-re",
  driver: localForage.INDEXEDDB,
});
