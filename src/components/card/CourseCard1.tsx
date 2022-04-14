import React from 'react';
import Image from "next/image";
import moment from 'moment'
const CardImage=require('../../images/unsplash-2.jpeg');
export default ({live , i } : any )=>{
    return <div className="card-course-1">
   <img className="images-2" src={live?.cover_image} alt=""   />

    <h4>{live?.title}</h4>
    <div className="making">
      <span>{live?.category_tree[0]}</span>
      <h3>${live?.price}</h3>
    </div>
    <div className="start">
      <h2>Starting from:</h2>
      <span>{moment(live?.schedule[0].date).format('LL')}</span>
    </div>
    <div className='card-course-rel align-items-center '>
    
 <div>
   <img src={live?.instructor?.image}/>
 </div>
 <div>
 <h5>{live?.instructor?.fullname}</h5>
 <p>{live?.category_tree[0]} Expert at Bolloot</p>
 </div>
    </div>
  </div>
  
  
}