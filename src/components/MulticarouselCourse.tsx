import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2.5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1270 },
    items: 2.5
  },
  tablet: {
    breakpoint: { max: 1270, min: 1038 },
    items: 2.5
  },
  tablet1: {
    breakpoint: { max: 1270, min: 820 },
    items: 2.5
  },
  tablet2: {
    breakpoint: { max: 1270, min: 620 },
    items: 2.5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
import React from 'react';
import CourseCard from "./card/CourseCard";
export default ()=>{
    return   <div>
       <Carousel responsive={responsive}>
      <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
  </Carousel>
    </div>
}
