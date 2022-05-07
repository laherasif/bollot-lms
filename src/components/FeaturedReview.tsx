import React from "react";
import Icons from "../icons";
import Rating from "./ratingStar";
export default ({instructor  ,reviews , allCourses}:any) => {
  return (
    <div className="f-reviews-sie">
      <h5>Featured review</h5>
      <div className="mdsafis-ejamd">
        <div>
          <img src={instructor?.image} />
        </div>
        <div>
          <h6>{instructor?.fullname}</h6>
          <p>{allCourses} courses</p>
          <p>{reviews} reviews</p>
        </div>
      </div>
      <div className="kjadsf-senr">
        {/* <Icons name="cp7" />
        <Icons name="cp7" />
        <Icons name="cp7" />
        <Icons name="cp7" />
        <Icons name="cp7" />
        <p>a year ago</p> */}
        <Rating value={3.5}/>
        <p style={{paddingLeft:'10px'}}>a year ago</p>
      </div>
            <div className="kdjsafkosderddc">
            <p >
        From 2 weeks I'm searching for the material on python kafka and my
        search end here... The course is full of practical aspects and demo.The
        course cover kafka from scratch. And the trainer is so prompt within a
        hour i had replies for my queries. Thanks Bogdan!
      </p>
      <p>Was this review helpful?</p>
            </div>
      {/* <div className="kajfnds-ejrise">
        <button>
          <Icons name="lk1" />
        </button>
        <button>
          <Icons name="lk2" />
        </button>

        <p>Report</p>
      </div> */}
    </div>
  );
};
