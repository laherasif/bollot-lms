import React from 'react';
import Image from "next/image";
const CardImage=require('../../images/unsplash-2.jpeg');
export default ()=>{
    return <div className="card-course-1">
   <Image className="images-2" src={CardImage} alt=""   />

    <h4>Become A Social Media Expert</h4>
    <div className="making">
      <span>Digital Marketing</span>
      <h3>$19.9</h3>
    </div>
    <div className="start">
      <h2>Starting from:</h2>
      <span>MAR 01,2022</span>
    </div>
    <div className='card-course-rel align-items-center '>
    
 <div>
   <img src='/bosan.png'/>
 </div>
 <div>
 <h5>Bosun Jones</h5>
 <p>Digital Marketing Expert at Bolloot</p>
 </div>
    </div>
  </div>
  
  
}