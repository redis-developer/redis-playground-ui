"use client";

import "./Playground.css";

import React from "react";

import PgHeader from "./PgHeader";
import PgCardPanel from "./PgCardPanel";

function Playground() {
  return (
    <div className="pg-container">
      <PgHeader />
      <PgCardPanel />
    </div>
  );
}

export default Playground;