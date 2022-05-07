import OTPInput from './otp'
import { Modal , Button  } from 'react-bootstrap'
import React,{useState } from "react";


export default ({ openToggle , providerEmail , role } : any ) => {
    const [show, setShow] = useState(true);
    const [otp, setOtp] = useState('');

    const handleClose = () =>{
         setShow(false)
         openToggle(false)
        }


    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <OTPInput
                    autoFocus
                    length={6}
                    providerEmail={providerEmail}
                    role={role}
                    className="otpContainer"
                    inputClassName="otpInput"
                    onChangeOTP={(otp) => setOtp(otp)}
                />
            </Modal.Body>
            
        </Modal>


    )
}