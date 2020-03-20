import React from "react";
import indiaData from "../services/india.json";

export default function QuestionTitle({ state }) {
  const queDiv = {
    fontSize: "-webkit-xxx-large"
  };

  return (
    <div style={queDiv}>
      Can you identify the <b>{state.name}</b> State
    </div>
  );
}
