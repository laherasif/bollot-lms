import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import { FiCheck } from 'react-icons/fi'
import { RootStateOrAny, useSelector } from "react-redux";
const CoursesModal = ({ course, permition, Toggle }: any) => {
    const [show, setShow] = useState(permition);
    const [value, setValue] = useState('');
    const [selectCourse, setSelectCourse] = useState({});
    const { Courses } = useSelector((state: RootStateOrAny) => state?.InsDash)

    const handleClose = () => {
        Toggle(false)

    }

    const Selected = () => {
        course(selectCourse)
    }







    return (
        < div >
            <Modal show={show} size="lg" onHide={handleClose}>

                <Modal.Header closeButton onClick={() => handleClose()}>
                    <Modal.Title>Select a Course</Modal.Title>
                </Modal.Header>
                <Modal.Body className="course_modal">

                    <div className='model_wrapper' >
                        {Courses && Courses.map((item, index) => (
                            <div className="course_card"
                            style={{backgroundImage:`url(${item?.cover_image})`}}
                             onClick={() => setSelectCourse(item)}>
                                <div className='course_card_blur-color'>
                                    <div className='course_card_title' >
                                        <h3>{item?.title}</h3>
                                    </div>
                                </div>
                                {selectCourse.id === item.id ?
                                    <div className='course_card_footer'>
                                        <div className='course_card_footer_content'>
                                            <h4>Selected</h4>
                                            <p> <FiCheck /></p>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        ))}

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="bottom_btn">
                        <button className="select" onClick={() => Selected()}>Select</button>
                        <button className="cancel" onClick={() => Toggle(false)}>Cancel</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};
export default CoursesModal

