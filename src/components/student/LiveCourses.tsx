import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
import blackIcon from '../../assets/images/apple.svg'
export default ({ course, key, unapprove }: any) => {
  return (
    <div className="cm-web" key={key}>
      <Link href={`/en/student/details/${course?.slug}`}>
        <div style={{ cursor: 'pointer', height: '250px' }}>
          <div className="dhafusd9we0sd-p">
            <div>
              <img
                src={course?.cover_image}
                className="osaidjs-dsadjd"
                alt="course_img"
                height="150px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="dhafusd9we0sd">
              <div className="dhafusd9we0sd1" style={{ border: '1pt solid ' }}>
                <Icons name="c42" />
                <p style={unapprove ? { color: 'orange' } : { color: 'green' }} >{unapprove ? "pendding" : course?.status}</p>

              </div>
            </div>
          </div>
          <div className="sdhafadsie-sd">
            <h3>{course?.title}</h3>
            <p className="mt-2">By {course?.instructor?.fullname}</p>
          </div>
        </div>
      </Link>
      <div className="assahdwe0-ass" style={unapprove ? { display : "none" } : { display:'flex'}}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <i className="fa fa-ellipsis-h" style={{ fontSize: '20px', color: 'black' }}></i>

            {/* <img src='../../assets/images/black..svg' alt="" style={{ width: '20px' }} /> */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <>
              <Dropdown.Item as={Link} href={`/en/student/liveClasses/${course?.id}`}>Live Classes </Dropdown.Item>
              <Dropdown.Item as={Link} href={`/en/student/quiz/${course?.id}`}>Quiz</Dropdown.Item>
            </>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
