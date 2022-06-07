import React from "react";
import { Accordion } from "react-bootstrap";
import { add3Dots } from "../function/hooks";
const CourseItem = ({ lecture, key }: any) => {
  return <div className="lasjdsad-dsdsadwe" key={key}>
    <p style={{ alignItems: 'center' }}>
      {lecture?.file_type === "Video" ?
        <i className="fa fa-play-circle"  ></i>
        : 
        <i className="fa fa-file"  ></i>

}
      <span style={{ marginLeft: '10px' }}>
        { add3Dots(lecture?.title , 50)}
      </span>
    </p>
    <h5>

      {lecture?.duration}
    </h5>
  </div>
}
const CourseHeading = ({ title , lec}: any) => {
  return <div className="skajds-saje3id">
    <h5>{title}</h5>
    <p>{lec} lectures</p>
  </div>
}
export default ({ section }: any) => {

  return (
    <Accordion defaultActiveKey={section[0]} alwaysOpen>
      {section?.map((sec: any) => (
        <Accordion.Item eventKey={sec.id} key={sec.id}>
          <Accordion.Header>

            <CourseHeading title={sec.title} lec={sec.lectures_count} />
          </Accordion.Header>
          <Accordion.Body>
            {sec.lectures.map((lec: any) => (
              <CourseItem lecture={lec} kye={lec.id} />
            ))}

          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
