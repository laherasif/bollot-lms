import React from "react";
 import Icons from "../icons";
import Rating from "./ratingStar";

export default ({rates,stars}:{rates:number,stars:Number}) => {

  
  return (
    <div className="djasfids-san3eries">
    <div className="dsjfksaefids-fdaf">
       <Rating value={stars}/>
    {/* { Array.from({length:5},(x,i)=>{
      if(i<stars)
      {
      }
      else
      {
        return <Rating value={3}/>
      }
    })
    } */}
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
