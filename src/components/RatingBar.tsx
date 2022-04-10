import React from "react";
 import Icons from "../icons";

export default ({rates,stars}:{rates:String,stars:Number}) => {
  
  return (
    <div className="djasfids-san3eries">
    <div className="dsjfksaefids-fdaf">
    { Array.from({length:5},(x,i)=>{
      if(i<stars)
      {
        return <Icons name="ipc4"/>
      }
      else
      {
        return <Icons name="ipc3"/>
      }
    })
    }
    </div>
    <div className="w-100">
    <div className="jiadsf0w-eaew">
     
     </div>
     <div className="jiadsf0w-eaew-1" style={{width:rates}}>
     
    </div>
    </div>
     <div>
      <h5>{rates}</h5>
    </div>
    </div>
  );
};
