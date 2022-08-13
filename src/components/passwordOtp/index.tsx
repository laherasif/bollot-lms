import OTPInput from './otp'
import { Modal, Button } from 'react-bootstrap'
import React, { useState } from "react";


export default ({ providerEmail,  onStepChange , onPrevStep , step }: any) => {
    const [show, setShow] = useState(true);
    const [otp, setOtp] = useState('');




    return (

        <OTPInput
            autoFocus
            length={6}
            providerEmail={providerEmail}
            className="otpContainer"
            inputClassName="otpInput"
            onChangeOTP={(otp) => setOtp(otp)}
            onStepChange ={onStepChange}
            onPrevStep={onPrevStep}
        />


    )
}