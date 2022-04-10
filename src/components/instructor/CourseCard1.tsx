import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default () => {
  return (
    <Link href="/en/instructor/details">
      <div className="cm-web">
        <div className="dhafusd9we0sd-p">
          <div>
            <img
              src="/assets/images/purple.svg"
              className="osaidjs-dsadjd"
              alt=""
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
          <h3>Complete Web &amp; Mobile Designer in 2022...</h3>
          <p className="mt-2">By Andrei Neagoie</p>
        </div>
      </div>
    </Link>
  );
};
