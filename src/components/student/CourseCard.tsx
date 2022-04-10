import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default ({ course , key } : any ) => {
  return (
    <Link href="/en/student/details">
      <div className="cm-web">
        <div className="dhafusd9we0sd-p">
          <div>
            <img
              src={course?.cover_image}
              className="osaidjs-dsadjd"
              alt="course_img"
            />
          </div>
          <div className="dhafusd9we0sd">
            <div className="dhafusd9we0sd1">
              <Icons name="c42" />
              <p>02/04 weeks completed</p>
            </div>
          </div>
          <div className="assahdwe0-ass">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <img src="/assets/images/black..svg" alt="" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="sdhafadsie-sd">
          <h3>{course?.short_desc}</h3>
          <p className="mt-2">By Andrei Neagoie</p>
        </div>
      </div>
    </Link>
  );
};
