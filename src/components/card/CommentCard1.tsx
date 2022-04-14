import React from 'react';
import Image from "next/image";
const CardImage=require('../../images/blog1.png');
export default ()=>{
    return <div className="card-item">
    <Image className="images-2" src={CardImage} alt="" />
    <h3>The hate you give is the hate you’ll eventually get</h3>
    <h4>By <span>Tommy Land</span></h4>
    <div className="mon">
      <h5>19 August </h5>
      <h5 className='sfsdfsd-s'>6 comment</h5>
      <h5 className='sfsdfsd-s'>7 shares</h5>
    </div>
    <div className='dklsfjsdf-dsf'></div>
    <p>Luxury is something everyone deserves from time to time. Such an indulgence can make a vacation a truly rejuvenating  experience. One of the best ways to get the luxury of the rich  and famous to fit into your budget can be yours through yacht  charter companies. These companies specialize in creating custom selling vacations that redefine travel.</p>
  </div>
   
  
}