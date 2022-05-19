import Link from "next/link";
import React from "react";
import Icons from "../icons";
export default ({
  allCourses,
  instructor,
  enrolled,
  tagline,
  about,
  reviews }: any) => {
  return (
    <div className="hasiw0eskdwd">
      <div className="f-reviews-sie">
        <Link href="/en/iprofile">
          <h3>{instructor?.fullname}</h3>
        </Link>
        <h3>
          <span>{tagline}</span>
        </h3>
        <div className="mdsafis-ejamd">
          <div>
            <img src={instructor?.image} />
          </div>
          <div>
            <h6>{reviews.avg || 0 } Rating </h6>
            <h6>{reviews.count} Reviews</h6>
            <h6>{enrolled} Students</h6>
            <h6>{allCourses} Courses</h6>
          </div>
        </div>

        <div className="kdjsafkosderddc">
          <p>
           {about}
          </p>
        </div>
        <div className="kajfnds-ejrise aksdfjds-asdase">

        </div>
      </div>
    </div>
  );
};
