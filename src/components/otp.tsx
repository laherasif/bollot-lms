import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import Image from 'next/image'
import insImg from '../../src/assets/images/instructor.png'
import stuImg from '../../src/assets/images/student.png'
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
                <Modal.Body style={{ padding: '40px' }}>
                    <div className="wrapper mb-3 w-100" style={{ marginTop: '20px' }}>
                        <div className="row w-100">
                            <div className="col-12 col-md-6 mt-10 col-md-offset-1  " >
                                <div
                                    data-cy="button-box"
                                    id="up-button-box"
                                    className={`up-button-box ${value === 0 ? 'up-button-box  up-button-box-radio active' : ''} `}
                                    style={{ height: '100%' }}
                                    onClick={() => setValue((0))}
                                >
                                    <div className="up-radio">
                                        <label className="up-checkbox-label" htmlFor="up-button-box">
                                            <input
                                                type="radio"
                                                checked={value === 0}
                                                name="student"
                                                onChange={(e) => setValue(0)}
                                            />
                                            <span className="up-checkbox-replacement-helper">
                                                {/**/} {/**/}{" "}
                                            </span>{" "}
                                        </label>
                                    </div>{" "}
                                    <div className="up-illustration">
                                        <Image src={insImg} width={40} height={40} />

                                    </div>{" "}
                                    <div id="button-box-1" className="up-button-box-labels">
                                        <div className="up-button-box-label">
                                            <h4>I want to learn</h4>
                                        </div>{" "}
                                        {/**/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-10">
                                <div data-cy="button-box w-100"
                                    className={`up-button-box ${value === 1 ? 'up-button-box  up-button-box-radio active' : ''} `}
                                    onClick={() => setValue((1))}

                                >
                                    <div className="up-radio">
                                        <label className="up-checkbox-label">
                                            <input
                                                type="radio"
                                                value={value}
                                                checked={value === 1}
                                                name="instructor"
                                                onChange={(e) => setValue(1)}
                                            />{" "}
                                            <span className="up-checkbox-replacement-helper">
                                                {/**/} {/**/}{" "}
                                            </span>{" "}
                                        </label>
                                    </div>{" "}
                                    <div className="up-illustration">
                                        <Image src={stuImg} width={40} height={40} />
                                    </div>{" "}
                                    <div id="button-box-2" className="up-button-box-labels">
                                        <div className="up-button-box-label">
                                            <h4>I am here to Teach</h4>
                                        </div>{" "}
                                        {/**/}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <input type="radio" onChange={() => setValue(0)} name="select" id="option-1" checked={value === 0} />
                        <input type="radio" name="select" onChange={() => setValue(1)} id="option-2" checked={value === 1} />
                        <label htmlFor="option-1" className="option option-1 w-100">
                            <div className="dot"></div>
                            <span>I want to learn</span>
                        </label>
                        <label htmlFor="option-2" className="option option-2 w-100">
                            <div className="dot"></div>
                            <span>I am here to Teach </span>
                        </label> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div className="d-flex mt-2 justify-content-center">
                        <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                            <button
                                className="upload-1 sdisad-dsdactive "

                                onClick={() => handleClose()}
                            >
                                Close
                            </button>
                        </div>
                        <div className="idfadsf-sads kajfds-sdfe">
                            <button
                                onClick={(e: any) => handleSubmit(e)}
                                className="upload-1 sdisad-dsdactive"
                                id="activetab"

                            >
                                Login

                            </button>
                        </div>
                    </div>

                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>Login</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Role

