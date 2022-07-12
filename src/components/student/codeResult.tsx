import React from "react";

const OutputWindow = ({ outputDetails }:any ) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-green text-xs " style={{color:'green'}}>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-red text-xs " style={{color:'red'}}>
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-red text-xs " style={{color:'red'}}>
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
     
      <div className="w-100 rounded-md text-white font-normal text-md py-2 px-2" style={{backgroundColor:'black' , height:'77vh', overflowY:'auto'}}>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
