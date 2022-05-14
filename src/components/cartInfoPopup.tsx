import Link from "next/link";
import React, { useState } from "react";
import Icons from "../icons";
import { Modal, Button } from 'react-bootstrap'
const InfoCart = ({ Course }: any) => {
    console.log("Course", Course)
    const [show, setShow] = useState(true);
    const [value, setValue] = useState(0);

    const handleClose = () => {
        setShow(false)
    }

    // const handleSubmit = () => {
    //     permition(value)
    //     Toggle(false)
    // }
    // const handleShow = () => setShow(true);
    return (

        <div className="hasiw0eskdwd">
            <Modal
                show={show}
                size="md"
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add to cart</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:'150px ' , padding:'20px'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="d-flex">
                            <i className="fa fa-check-circle" style={{ fontSize: '40px', color: 'green', }}></i>
                            {/* <i className="fa fa-check-circle" style={{fontSize:'48px' , color:'green'}}></i> */}
                            <img src={Course?.cover_image} style={{ width: '30%', height: '100%', marginLeft: '10px' }} alt="image" />
                            <div style={{ display: 'flex', flexDirection: 'column' , marginLeft:'10px' , width:'100%' }}>
                                <p style={{ fontSize: '14px' }}>{Course?.title}</p>
                                <span style={{ lineHeight: '0.2' }}>{Course?.instructor?.fullname }</span>
                            </div>
                        </div>
                        <div className="w-100">
                            <Link href="/en/cart">
                                <button className="btn-1s">Go to cart </button>
                            </Link>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
};
export default InfoCart

