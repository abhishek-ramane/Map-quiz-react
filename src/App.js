import React, { useState, useEffect } from "react";
import MapRender from "./components/Maprender";
import indiaData from "./services/india.json";
import "./App.css";
import QuestionTitle from "./components/QuestionTitle";
import Answer from "./components/Answer";

const App = () => {
  let [correctAnswer, setCorrectAnswer] = useState({});
  let [userSelection, setUserSelection] = useState();
  let [userCorrectCount, setUserCorrectCount] = useState(0);
  let [visitedStates, setVisitedStates] = useState([]); //{code, color}
  let MapData = indiaData;
  useEffect(() => {
    randomSelect();
    if (userSelection != null) checkAnswer();
  }, [userSelection]);

  function checkAnswer() {
    if (userSelection) {
      const isCorrect = userSelection === correctAnswer.code;
      // console.log(
      //   `userSelection=${JSON.stringify(
      //     userSelection
      //   )}  correctAnswer=${JSON.stringify(
      //     correctAnswer
      //   )} isCorrect=${isCorrect}`
      // );
      if (isCorrect) setUserCorrectCount(userCorrectCount + 1);
      if (correctAnswer != null) colorTheMap(isCorrect);
      //  console.log(userCorrectCount);
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
          color: "green"
        }
      ]);
    } else if (userSelection != null && correctAnswer != null) {
      setVisitedStates([
        ...visitedStates,
        {
          code: userSelection,
          color: "red"
        },
        {
          code: answer,
          color: "yellow"
        }
      ]);
    }
    // console.log(
    //   `${JSON.stringify(visitedStates)} correctAnswer=${JSON.stringify(
    //     correctAnswer.code
    //   )}, wrongAnswer= ${JSON.stringify(userSelection)}`
    // );
  }

  function isVisited(id) {
    let isVisited = false;
    visitedStates.forEach(state => {
      if (state.code === id) {
        isVisited = true;
      }
    });
    return isVisited;
  }

  function randomSelect() {
    let filteredNonVisitedRandomState = MapData;
    visitedStates.forEach(visitedMap => {
      filteredNonVisitedRandomState = filteredNonVisitedRandomState.filter(
        map => visitedMap.code !== map.code
      );
    });
    const values = Object.values(filteredNonVisitedRandomState);
    const randomState =
      values[parseInt(Math.random() * filteredNonVisitedRandomState.length)];
    setCorrectAnswer(randomState);
  }

  const setUserSelectionFunc = event => {
    console.log(`visitedState= ${JSON.stringify(visitedStates)}`);
    console.log(event.target.id);
    if (!isVisited(event.target.id)) {
      userSelection = event.target.id;
      setUserSelection(userSelection);
    } else {
      console.log("Visited");
    }
  };

  return (
    <div className="App">
      <div className="map-div">
        <MapRender
          userSelectFun={setUserSelectionFunc}
          visitedStates={visitedStates}
          mapData={indiaData}
        />
      </div>
      <div className="que-div">
        <QuestionTitle state={correctAnswer} />
        <div>
          <Answer data={visitedStates} />
        </div>
      </div>
    </div>
  );
};

export default App;
