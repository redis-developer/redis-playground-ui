"use client";

import "./Playground.css";

import React, { useEffect, useState } from "react";

import PgMainHeader from "./PgMainHeader";
import PgCardPanel from "./PgCardPanel";
import PgSidebar from "./PgSidebar";

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
          <div className="pg-container theme-custom-component font-regular" id="main-app">
            <PgMainHeader />
            <div className="pg-container-body">
              <PgSidebar />
              <PgCardPanel />
            </div>
          </div>
        </PlaygroundProvider>
      }
    </>
  );
}

export default Playground;