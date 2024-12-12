"use client";

import "./Playground.css";

import React, { useEffect, useState } from "react";

import PgMainHeader from "./PgMainHeader";
import PgCardPanel from "./PgCardPanel";
import { getConfigData, setConfigData } from "../config";


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

        <div className="pg-container theme-custom-component font-regular">
          <PgMainHeader />
          <PgCardPanel />
        </div>
      }
    </>
  );
}

export default Playground;