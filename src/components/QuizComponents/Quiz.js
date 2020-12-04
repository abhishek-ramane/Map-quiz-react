import React, { useState, useEffect } from "react";
import MapRender from "./Maprender";

import initialMapData from "../../services/india.json";
import QuestionTitle from "./QuestionTitle";
import Answer from "./Answer";

import "./Quiz.css";

const Quiz = () => {
  let [correctAnswer, setCorrectAnswer] = useState({});
  let [userSelection, setUserSelection] = useState();
  let [userCorrectCount, setUserCorrectCount] = useState(0);
  let [visitedStates, setVisitedStates] = useState([]); //{code, color}
  let MapData = initialMapData.data;
  useEffect(() => {
    randomSelect();
    if (userSelection != null) checkAnswer();
  }, [userSelection]);

  function checkAnswer() {
    if (userSelection) {
      const isCorrect = userSelection === correctAnswer.code;
      if (isCorrect) setUserCorrectCount(userCorrectCount + 1);
      if (correctAnswer != null) colorTheMap(isCorrect);
    }
  }

  function colorTheMap(isCorrect) {
    const answer = correctAnswer.code;
    const wrongAnswer = userSelection;
    if (isCorrect) {
      setVisitedStates([
        ...visitedStates,
        {
          code: answer,
          color: "green",
        },
      ]);
    } else if (userSelection != null && correctAnswer != null) {
      setVisitedStates([
        ...visitedStates,
        {
          code: userSelection,
          color: "red",
        },
        {
          code: answer,
          color: "yellow",
        },
      ]);
    }
  }

  function isVisited(id) {
    let isVisited = false;
    visitedStates.forEach((state) => {
      if (state.code === id) {
        isVisited = true;
      }
    });
    return isVisited;
  }

  function randomSelect() {
    let filteredNonVisitedRandomState = MapData;
    visitedStates.forEach((visitedMap) => {
      filteredNonVisitedRandomState = filteredNonVisitedRandomState.filter(
        (map) => visitedMap.code !== map.code
      );
    });
    const values = Object.values(filteredNonVisitedRandomState);
    const randomState =
      values[parseInt(Math.random() * filteredNonVisitedRandomState.length)];
    setCorrectAnswer(randomState);
  }

  const setUserSelectionFunc = (event) => {
    if (!isVisited(event.target.id)) {
      userSelection = event.target.id;
      setUserSelection(userSelection);
    } else {
      console.log("Visited");
    }
  };

  return (
    <div className="quiz">
      <div className="que-div">
        <QuestionTitle state={correctAnswer} />
        <div>
          <Answer visitedState={visitedStates} data={initialMapData.data} />
        </div>
      </div>

      {initialMapData.data ? (
        <div className="map-div">
          <MapRender
            userSelectFun={setUserSelectionFunc}
            visitedStates={visitedStates}
            mapData={initialMapData.data}
            viewBox={initialMapData.viewBox}
          />
        </div>
      ) : (
        <p>No data Available for this country</p>
      )}
    </div>
  );
};

export default Quiz;
