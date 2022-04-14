import React from "react";
import Icons from "../../icons";
export default ({type}:{type?:string})=>{
    return  <div className={`auther ${type?"lhadfisd-an3ew":""}`}>
    <Icons name="c18"/>
    <p>
      {type?"Lorem Ipsum is simply dummy text of the printing and typesetting industry.":
      <>
            Bolloot is an online education platform that <br /> delivers
      video courses, programs and <br /> resources for Individual,
      Advertising &amp; Media <br /> Specialist, Online Marketing
      Professionals, <br /> Freelancers and anyone.
      </>
      }

    </p>
    <div className="client">
      <img src='/Mask.png' alt="" />
      <div className="name-1">
        <h5>Aurther Broklyn</h5>
        <p className="jdkslfsa-wmeds">Categories: 3d Modelling</p>
      </div>
    </div>
  </div>
}