import React, { useState, useEffect } from "react";
import indiaData from "../services/india.json";
import "./Answer.css";

export default props => {
  //console.log(props.data);
  let data = props.data;
  let [correctAnswers, setCorrectAnswer] = useState([]);
  let [wrongAnswer, setWrongAnswer] = useState([]);
  let [correctedAnswer, setCorrectedAnswer] = useState([]);

  function setInitialState(mapColor) {
    return data.filter(d => d.color === mapColor);
  }

  useEffect(() => {
    setWrongAnswer(data.filter(d => d.color === "red"));
    setCorrectedAnswer(data.filter(d => d.color === "yellow"));
    setCorrectAnswer(data.filter(d => d.color === "green"));
  }, [data]);

  function getStateName(state) {
    const stateData = indiaData.filter(data => data.code === state.code);
    //console.log(stateData);
    return stateData[0].name;
  }

  return (
    <div className="answer-div">
      <div className="correct-ans">
        <h2>Correct Answers</h2>
        <span>{correctAnswers.length}</span>
        {correctAnswers.map(state => {
          //  console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
      <div className="corrected-ans">
        <h2>Corrected Answers</h2>
        <span>{correctedAnswer.length}</span>
        {correctedAnswer.map(state => {
          //console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
      <div className="wrong-ans">
        <h2>Wrong Answers</h2>
        <span>{wrongAnswer.length}</span>
        {wrongAnswer.map(state => {
          // console.log(state);
          return <div key={state.code}>{getStateName(state)}</div>;
        })}
      </div>
    </div>
  );
};
