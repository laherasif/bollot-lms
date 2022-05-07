import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
// import Icons from "../../icons";
export default ({ course, key }: any) => {
  console.log("course" , course)
  return (
    <div className="cm-web" key={key}>
      <Link href={`/en/instructor/details/${course.slug}`}>
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
              <div className="dhafusd9we0sd1" >
                {/* <Icons name="c42" /> */}
                <p style={course?.status === "approved" ? {color:'green' , fontSize:'14px'} :{color:'yellow'  , fontSize:'14px'}} > {course?.status}</p>
              </div>
            </div>

          </div>
          <div className="sdhafadsie-sd">
            <h3>{course?.title}</h3>
            {/* <p className="mt-2">By {course?.instructor} </p> */}
          </div>
        </div>
      </Link>
      <div className="assahdwe0-ass ">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <i className="fa fa-ellipsis-h" style={{fontSize:'20px' , color:'black'}}></i>
          </Dropdown.Toggle>

          <Dropdown.Menu >
            <Dropdown.Item href={`/en/instructor/managePreview/${course?.id}`}>Manage Previews </Dropdown.Item>
            <Dropdown.Item as={Link} href={ `/en/instructor/manageCriculum/${course?.id}`}>Check Criculum</Dropdown.Item>
            <Dropdown.Item as={Link} href={ `/en/instructor/manageQuiz/${course?.id}`}>Manage Quiz</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
