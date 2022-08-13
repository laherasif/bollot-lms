import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icons from "../icons";
import { Modal, Button } from 'react-bootstrap'
import AWS from 'aws-sdk'
import { SweetAlert } from "../../function/hooks";

const S3_BUCKET = 'bolloot';
const REGION = 'us-east-1';


AWS.config.update({
    accessKeyId: "AKIA5CYBVB45T33ZHF6Y",
    secretAccessKey: "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",
});

const CREDENTIAL = {
    accessKeyId: "AKIA5CYBVB45T33ZHF6Y",
    secretAccessKey: "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",
};

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})



const Role = ({ Toggle, permition, link }: any) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const handleClose = () => {
        setShow(false)
        Toggle('')
    }


    const handleShow = () => setShow(true);

  

    useEffect(() => {
        handleShow()

        const paramss = {
            Bucket: S3_BUCKET,
            Key: link?.object_key
        };
        try {
            const url = myBucket.getSignedUrl('getObject', paramss);
            setValue(url)
        }
        catch (err) {
            SweetAlert({icon :'error' , text: err})
         }
    }, [link])

    return (



        < div className="hasiw0eskdwd" >
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton onClick={() => handleClose()}>
                    <Modal.Title>{link?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <video style={{ height: "100%", width: '100%', marginBottom: '20px' }} controls autoPlay>
                        <source src={value}
                            type="video/mp4"></source>
                    </video>
                </Modal.Body>
                <Modal.Footer>
                    <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                        <button className="upload-1 sdisad-dsdactive"
                        
                        onClick={() => handleClose()}>
                            close
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};
export default Role

