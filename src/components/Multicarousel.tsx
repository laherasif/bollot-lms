import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import instance from "../confiq/axios/instance";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1270 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1270, min: 1038 },
    items: 4
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
export default ({ cata }: any) => {
  const { Feature, Latest } = useSelector((state: RootStateOrAny) => state.course)

  return (<div>
    <Carousel responsive={responsive}>
      {cata === "feature" ? (
        Feature ? Feature.map((fet: any) => (
          <CourseCard f={fet} key={fet.id} />
        ))
          : <div>Course not avalible</div>
      )
        : (
          Latest  ? Latest.map((fet: any) => (
            <CourseCard f={fet} key={fet.id} />

          ))
            : <div>Course not avalible</div>

        )
      }


    </Carousel>
  </div>
  )
}


