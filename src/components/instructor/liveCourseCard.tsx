import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default ({ course, key }: any) => {
  return (
    <div className="cm-web" key={key}>
      <Link href={`/en/instructor/details/?liveCourse=${course?.slug}`}>
        <div style={{cursor:'pointer' , height:'250px'}}>
          <div className="dhafusd9we0sd-p">
            <div>
              <img
                src={course?.cover_image}
                className="osaidjs-dsadjd"
                alt="course_image"
              />
            </div>
            <div className="dhafusd9we0sd">
              <div className="dhafusd9we0sd1">
                <p style={course?.status === "pending" ? {color:'yellow'} : {color:'green'}}>{course?.status}</p>
              </div>
            </div>

          </div>
          <div className="sdhafadsie-sd">
            <h3>{course?.title}</h3>
          </div>
        </div>
      </Link>
      <div className="assahdwe0-ass">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          <i className="fa fa-ellipsis-h" style={{fontSize:'20px' , color:'black'}}></i>

            {/* <img src="../../assets/images/black..svg" alt="" style={{ width: '20px' }} /> */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} href={`/en/instructor/managePreview/liveCourse?=${course?.id}`}>Manage Preview </Dropdown.Item>
            <Dropdown.Item as={Link} href={`/en/instructor/manageLiveClasses/${course?.id}`}>Manage Schedule  </Dropdown.Item>
            <Dropdown.Item as={Link} href={`/en/instructor/manageEnrolledStudent/${course?.id}`}>Enrolled Student</Dropdown.Item>
            <Dropdown.Item as={Link} href={ course?.quiz?.length === 0  ? `/en/instructor/quiz` : `/en/instructor/manageQuiz/${course?.id}`}>Manage Quiz</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
