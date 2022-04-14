import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default ({ course, key }: any) => {
  return (
    <div className="cm-web" key={key}>
      <Link href="/en/instructor/details">
        <>
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
                <Icons name="c42" />
                <p>02/04 weeks completed</p>
              </div>
            </div>

          </div>
          <div className="sdhafadsie-sd">
            <h3>{course?.title}</h3>
            <p className="mt-2">By {course?.instructor} </p>
          </div>
        </>
      </Link>
      <div className="assahdwe0-ass">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img src="../../assets/images/black..svg" alt="" style={{ width:'20px'}}  />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item href={`/en/instructor/liveCourses`}>Live </Dropdown.Item> */}
            <Dropdown.Item href="#/action-3">Check Criculum</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
