"use client";

import "./Playground.css";

import React, { useEffect, useState } from "react";

import PgMainHeader from "./PgMainHeader";
import PgCardPanel from "./PgCardPanel";
import { getConfigData, setConfigData } from "../config";
import { PlaygroundProvider } from "./PlaygroundContext";


function Playground() {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      await setConfigData();
      setIsConfigLoaded(true);
    }
    loadConfig();
  }, []);

  return (
    <>
      {isConfigLoaded &&
        <PlaygroundProvider>
          <div className="pg-container theme-custom-component font-regular">
            <PgMainHeader />
            <PgCardPanel />
          </div>
        </PlaygroundProvider>
      }
    </>
  );
}

export default Playground;