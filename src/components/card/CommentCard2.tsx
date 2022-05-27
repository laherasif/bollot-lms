import React from 'react';
import Image from "next/image";
import moment from 'moment';
const CardImage=require('../../images/blog1.png');
export default ({comment}:any)=>{
    return  <div className='blogcomment'>
      <img src={comment?.image}/>
      <div>
        <p>“ {comment?.message}”</p>
        <div className='d-flex'>
        <h5>{moment(comment?.createdAt).startOf('hour').fromNow()}, {moment(comment?.createdAt).format('ll')}  </h5>
        {/* <h4>Reply</h4> */}
      </div>
      </div>
     
      </div>
   
  
}