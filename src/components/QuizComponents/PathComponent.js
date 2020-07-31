import React, { useRef, useEffect } from "react";


const PathComponent = (props) => {
  let data = props.data;
  let userSelectFun = props.userSelectFun;
  const colorOfState = props.colorOfState;
  // console.log(
  //   `colorOfState= ${JSON.stringify(
  //     colorOfState
  //   )}  data= ${JSON.stringify(data.code)}`
  // );
  return (
    <path
      onClick={userSelectFun}
      id={data.code}
      title={data.title}
      className="land"
      d={data.d}
      style={colorOfState}
    />
  );
};

export default PathComponent;
