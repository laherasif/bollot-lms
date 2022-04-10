import React from "react";
import { Accordion } from "react-bootstrap";
const CourseItem = ({lecture}:any) => {
  return <div className="lasjdsad-dsdsadwe">
    <p>{lecture?.title}</p>
    <h5>
      <span>Preview</span>
      01:05
    </h5>
  </div>
}
const CourseHeading = ({title}:any) => {
  return <div className="skajds-saje3id">
    <h5>{title}</h5>
    <p>4 Lectures 20 min</p>
  </div>
}
export default ({ section }: any) => {

  return (
    <Accordion defaultActiveKey={section[0]} alwaysOpen>
      {section?.map((sec:any) => (
        <Accordion.Item eventKey={sec.id} key={sec.id}>
          <Accordion.Header>
            
            <CourseHeading title={sec.title} />
          </Accordion.Header>
          <Accordion.Body>
            {sec.lectures.map((lec:any)=>(
              <CourseItem lecture={lec} kye={lec.id} />
            ))}
           
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
