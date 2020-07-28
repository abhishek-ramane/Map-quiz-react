import React, { useState, useEffect } from "react";
import Quiz from "./components/QuizComponents/Quiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <Quiz/>
      </div>    
  );
};

export default App;
