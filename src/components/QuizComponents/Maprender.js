import React, { useState } from "react";
import "./Maprender.css";
import PathComponent from "./PathComponent";
import {
  pan,
  zoom,
  getScale,
  setScale,
  resetScale,
} from "svg-pan-zoom-container";

const Maprender = (props) => {
  const { userSelectFun, visitedStates, mapData, viewBox, ...rest } = props;

  function setColorForStates(pathOfMap) {
    //console.log(visitedStates);
    let colorState = [];
    colorState = visitedStates.filter((state) => state.code === pathOfMap.code);
    return colorState.length > 0 ? { fill: colorState[0].color } : null;
  }

  return (
    <div className="map">
      <div className="maprender-div" data-zoom-on-wheel data-pan-on-drag>
        <svg viewBox={viewBox} {...rest}>
          <defs></defs>
          {mapData.map((pathOfMap) => (
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
