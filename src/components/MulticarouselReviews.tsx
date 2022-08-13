import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from 'react';
import CourseCard from "./card/CourseCard";
import CourseCard1 from "./card/CourseCard1";
import CommentCard from "./card/CommentCard";
export default ({type}:{type?:string})=>{
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1270 },
      items:type? 4:3
    },
    tablet: {
      breakpoint: { max: 1270, min: 1038 },
      items:type? 4:3
    },
    tablet1: {
      breakpoint: { max: 1270, min: 820 },
      items: 3
    },
    tablet2: {
      breakpoint: { max: 1270, min: 620 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
    return   <div>
       <Carousel responsive={responsive}>
       <CommentCard type={type}  />
       <CommentCard  type={type}/>
       <CommentCard  type={type}/>
       <CommentCard type={type}/>
       <CommentCard  type={type}/>
   </Carousel>
    </div>
}
