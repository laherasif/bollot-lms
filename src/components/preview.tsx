import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icons from "../icons";
import { Modal, Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'

import AWS from 'aws-sdk'

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


const PreviewModel = ({ Toggle, previews }: any) => {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState('');
    const [prvId, setprevId] = useState({});

    const handleClose = () => {
        setShow(false)
        Toggle(false)
    }

    useEffect(() => {
        setShow(true)
        const paramss = {
            Bucket: S3_BUCKET,
            Key: previews[0].object_key
        };
        try {
            const url = myBucket.getSignedUrl('getObject', paramss);
            setValue(url)
            setprevId(previews[0])
        }
        catch (err) { }
    }, [previews])

    // const handleSubmit = () => {
    //     permition(value)
    //     Toggle(false)
    // }
    const handleShow = () => setShow(true);



    const GetVideo = async (link: any) => {
        if (prvId !== link.id) {
            const paramss = {
                Bucket: S3_BUCKET,
                Key: link.object_key
            };
            try {
                const url = myBucket.getSignedUrl('getObject', paramss);
                setValue(url)
                setprevId(link)

            }
            catch (err) { }
        }

    }

    console.log("value", value)

    return (

        <div className="hasiw0eskdwd">
            <Modal
                show={show}
                size="large"
                onHide={handleClose}

            >
                <Modal.Header closeButton>
                    <div>
                        <span>Course Preview</span>
                        <h3>{prvId?.title} </h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        {/* <video style={{ height: "100%", width: '100%', marginBottom: '20px' }} controls autoPlay>
                            <source src={value}
                                type="video/mp4"></source>
                        </video> */}
                        <ReactPlayer width="100%" height="100%" playing={true} controls url={value} />
                    </div>



                    <div className="preview">
                        <h3>Free Sample Videos:</h3>
                        <ul >
                            {previews && previews.map((p: any, i: number) => (
                                <li
                                    onClick={() => GetVideo(p)}
                                    className={p?.id === prvId.id ? "active" : null}
                                >
                                    <div className="preview_container">
                                        <div className="thumnail">
                                            <img src="https://dev.thetechub.us/bolloot/images/courses/thumbnails/6267ac230d3e1-1650961443.jpg" alt="thumb" />
                                            <div className="title_icon">
                                                <i className="fa fa-play-circle"></i>
                                                <span>{p?.title} </span>
                                            </div>
                                        </div>
                                        <div className="video_time">
                                            03:53
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>


                </Modal.Body>

            </Modal>
        </div>
    );
};
export default PreviewModel

