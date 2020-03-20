import React from "react";
import India from "../MapComponents/India";
import "./Maprender.css";
import PathComponent from "./PathComponent";
const url = `/map`;

const Maprender = props => {
  const { userSelectFun, visitedStates, mapData, ...rest } = props;

  const demo = { fill: "red" };
  function setColorForStates(pathOfMap) {
    //console.log(visitedStates);
    let colorState = [];
    colorState = visitedStates.filter(state => state.code === pathOfMap.code);
    console.log(`color= ${colorState[0]}`);
    return colorState.length > 0 ? { fill: colorState[0].color } : null;
  }

  return (
    <div className="map">
      <div className="maprender-div">
        <svg viewBox="-10 75 700 700" {...rest}>
          <defs></defs>
          {mapData.map(pathOfMap => (
            <PathComponent
              key={pathOfMap.code}
              data={pathOfMap}
              userSelectFun={userSelectFun}
              colorOfState={setColorForStates(pathOfMap)}
              //colorMap={() => {pathOfMaps.code}}
            />
          ))}
          ;
        </svg>
      </div>
    </div>
  );
};

export default Maprender;
