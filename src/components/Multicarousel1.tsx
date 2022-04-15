import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1270 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1270, min: 1038 },
    items: 3
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
import React from 'react';
import CourseCard from "./card/CourseCard";
import CourseCard1 from "./card/CourseCard1";
import { useSelector, RootStateOrAny } from 'react-redux'
export default () => {
  const { LiveCouse } = useSelector((state: RootStateOrAny) => state.course)
  return (
    <>
      <Carousel responsive={responsive}>
        {LiveCouse ? LiveCouse.map((li, i) => (
          <CourseCard1 live={li} key={i} />
        ))
        :<div>Record not found </div>
      }

      </Carousel>
    </>
  )
}
