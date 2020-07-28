import React, { useState, useEffect } from "react";
import "./Answer.css";

export default (props) => {
  //console.log(props.visitedState);
  let visitedState = props.visitedState;
  let data= props.data;
  let [correctAnswers, setCorrectAnswer] = useState([]);
  let [wrongAnswer, setWrongAnswer] = useState([]);
  let [correctedAnswer, setCorrectedAnswer] = useState([]);

  function setInitialState(mapColor) {
    return visitedState.filter((d) => d.color === mapColor);
  }

  useEffect(() => {
    setWrongAnswer(visitedState.filter((d) => d.color === "red"));
    setCorrectedAnswer(visitedState.filter((d) => d.color === "yellow"));
    setCorrectAnswer(visitedState.filter((d) => d.color === "green"));
  }, [visitedState]);

  function getStateName(state) {
    const stateData = data.filter((visitedState) => visitedState.code === state.code);
    //console.log(stateData);
    return stateData[0].name;
  }

  return (
    <div className="answer-div">
      <div className="correct-ans">
        <h2 style={{ color: "green" }}>Correct Answers</h2>
        <span>{correctAnswers.length}</span>
        {correctAnswers.map((state) => {
          //  console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
      <div className="corrected-ans">
        <h2 style={{ color: "yellow" }}>Corrected Answers</h2>
        <span>{correctedAnswer.length}</span>
        {correctedAnswer.map((state) => {
          //console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
      <div className="wrong-ans">
        <h2 style={{ color: "red" }}>Wrong Answers</h2>
        <span>{wrongAnswer.length}</span>
        {wrongAnswer.map((state) => {
          // console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
    </div>
  );
};
