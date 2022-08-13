import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../icons";
export default () => {
  return (
    <Link href="/en/details">
      <div className="cm-web">
        <div className="dhafusd9we0sd-p">
          <div>
            <img src="/assets/images/purple.svg" className="osaidjs-dsadjd" alt="" />
          </div>
          <div className="dhafusd9we0sd">
            <div className="dhafusd9we0sd1">
              <Icons name="i11" />
              <p>4.8(151)</p>
            </div>
          </div>
          <div className="assahdwe0-ass">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              {/* <img src="/assets/images/black..svg" alt="" /> */}
            <i className="fa fa-ellipsis-h" style={{fontSize:'20px' , color:'black'}}></i>

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
          <div className="d-flex">
          <h3 className="m-0sadsa">Complete Web &amp; Mobile Designer in 2022...</h3>
          <h3>$141.00</h3>
          </div>
          <p className="mt-2 aifjdas-asdawie">
            <Icons name="i12"/>
            12234 Students enrolled this month</p>
        </div>
      </div>
    </Link>
  );
};
