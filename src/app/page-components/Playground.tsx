"use client";

import "./Playground.scss";

import React, { useEffect, useState } from "react";

import PgMainHeader from "./PgMainHeader";
import PgCardPanel from "./PgCardPanel";
import PgSidebar from "./PgSidebar";
import PgWalkthrough from "./PgWalkthrough";
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
          <div className="pg-container pg-walkthrough-container" id="main-app">
            {/* <PgWalkthrough /> */}
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