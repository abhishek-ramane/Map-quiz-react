import React from "react";

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
