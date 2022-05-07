import Link from "next/link";
import React from "react";
import Icons from "../icons";
export default ({
  allCourses,
  instructor,
  enrolled,
  reviews }: any) => {
  return (
    <div className="hasiw0eskdwd">
      <div className="f-reviews-sie">
        <Link href="/en/iprofile">
          <h3>{instructor?.fullname}</h3>
        </Link>
        <h3>
          <span>Just keep learning - stashchuk.com</span>
        </h3>
        <div className="mdsafis-ejamd">
          <div>
            <img src={instructor?.image} />
          </div>
          <div>
            <h6>4.6 Instructor Rating</h6>
            <h6>{reviews} Reviews</h6>
            <h6>{enrolled} Students</h6>
            <h6>{allCourses} Courses</h6>
          </div>
        </div>

        <div className="kdjsafkosderddc">
          <p>
            Do you really want to understand and practice instead of sitting and
            watching long presentations or trying to code along without any clue
            what is happening behind the scenes? Join me in any of my courses
            and you will get real knowledge based on the deep understanding of
            every single topic. But who am I? My name is Bogdan Stashchuk and I
            teach students more than 20 years. I am working as Software Engineer
            and love to teach and learn myself. I have a huge experience in
            explaining difficult things in an easy to understand format backed
            up with practice activities. That is the perfect combination that
            enables you to really learn and retain gained knowledge for a long
            period of time. Let's connect in the Social Networks! All links you
            could find under the profile picture. See you on my courses!
          </p>
        </div>
        <div className="kajfnds-ejrise aksdfjds-asdase">

        </div>
      </div>
    </div>
  );
};
