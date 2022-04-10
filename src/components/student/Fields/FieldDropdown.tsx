import React from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default ({ title }: { title: string }) => {
  return (
   <div className="kns-sanweso02e">
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <p>
        {title}
        </p>
        <Icons name="i23"/>

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   </div>
  );
};
