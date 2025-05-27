import type { IQueryHistory, IQueryHistoryDB } from "@/app/types";
import { openDB } from "idb";

const DB_NAME = "QueryHistoryDB";
const STORE_NAME = "query-history";
const DB_VERSION = 1;

const isIndexedDBSupported =
  typeof window !== "undefined" && "indexedDB" in window;

let dbPromise: any = null;

if (isIndexedDBSupported) {
  dbPromise = openDB<IQueryHistoryDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "hId" });
      }
    },
  });
}

const insertQueryHistory = async (data: IQueryHistory[]) => {
  if (dbPromise) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    for (const item of data) {
      await tx.store.put(item);
    }
    await tx.done;
  }
};

const getAllQueryHistory = async () => {
  let retObj: any = {
    data: null,
    error: null,
  };

  try {
    if (dbPromise) {
      const db = await dbPromise;
      const allData = await db.getAll(STORE_NAME);
      if (allData?.length) {
        retObj.data = [...allData].sort((a, b) => {
          const aCreated = a.createdOn ?? "";
          const bCreated = b.createdOn ?? "";
          if (aCreated > bCreated) return -1;
          if (aCreated < bCreated) return 1;
          return 0;
        });
      }
    }
  } catch (error) {
    retObj.error = error;
  }
  return retObj;
};

const getQueryHistoryById = async (hId: string) => {
  let retObj: any = {
    data: null,
    error: null,
  };

  try {
    if (dbPromise) {
      const db = await dbPromise;
      retObj.data = await db.get(STORE_NAME, hId);
    }
  } catch (error) {
    retObj.error = error;
  }
  return retObj;
};

const clearQueryHistory = async () => {
  if (dbPromise) {
    const db = await dbPromise;
    await db.clear(STORE_NAME);
  }
};

export {
  insertQueryHistory,
  getAllQueryHistory,
  getQueryHistoryById,
  clearQueryHistory,
};

export type { IQueryHistory };
