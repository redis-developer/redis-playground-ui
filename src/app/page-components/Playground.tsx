"use client";

import "./Playground.css";

import React from "react";

import PgMainHeader from "./PgMainHeader";
import PgCardPanel from "./PgCardPanel";

function Playground() {
  return (
    <div className="pg-container theme-custom-component font-regular">
      <PgMainHeader />
      <PgCardPanel />
    </div>
  );
}

export default Playground;