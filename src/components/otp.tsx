import Link from "next/link";
import React, { useState } from "react";
import Icons from "../icons";
import { Modal, Button } from 'react-bootstrap'
const Role = ({ Toggle, permition }: any) => {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState(0);

    const handleClose = () => {
        Toggle(false)
    }

    const handleSubmit = () => {
        permition(value)
        Toggle(false)
    }
    const handleShow = () => setShow(true);
    return (

        <div className="hasiw0eskdwd">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Please Select Login As</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="wrapper">
                        <input type="radio" onChange={() => setValue(0)} name="select" id="option-1" checked={value === 0} />
                        <input type="radio" name="select" onChange={() => setValue(1)} id="option-2" checked={value === 1} />
                        <label htmlFor="option-1" className="option option-1">
                            <div className="dot"></div>
                            <span>Student</span>
                        </label>
                        <label htmlFor="option-2" className="option option-2">
                            <div className="dot"></div>
                            <span>Teacher</span>
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Role

