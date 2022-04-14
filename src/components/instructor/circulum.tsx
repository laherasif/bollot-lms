import React from "react";
import {
    Container,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";
import Icons from "../../insIcons";
import { useState, useEffect } from 'react'
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk'
import Secdule from "./secdule";


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



export default ({course_id}:any) => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumb, setTumb] = useState();
    const [videos, setVideos] = useState();
    const [aswVideoSrc, setAwsVideoSrc] = useState([]);
    const [type, setType] = useState(0);

    // useEffect(() => {
    //     let fun = async () => {
    //         const params = {
    //             ACL: 'private',
    //             Bucket: S3_BUCKET,
    //         };
    //         let client = new S3Client({ region: REGION, credentials: CREDENTIAL })
    //         const command = new ListObjectsCommand(params);
    //         const response: any = await client.send(command);
    //         setAwsVideoSrc(response.Contents)
    //     }
    //     fun()
    // }, [progress])

    // console.log("aws", aswVideoSrc)

    // const generateVideoThumbnail = (file: File) => {
    //     return new Promise((resolve) => {
    //         const canvas = document.createElement("canvas");
    //         const video = document.createElement("video");

    //         // this is important
    //         video.autoplay = true;
    //         video.muted = true;
    //         video.src = URL.createObjectURL(file);

    //         video.onloadeddata = () => {
    //             let ctx: any = canvas.getContext("2d");

    //             canvas.width = video.videoWidth;
    //             canvas.height = video.videoHeight;

    //             ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    //             video.pause();
    //             return resolve(canvas.toDataURL("image/png"));
    //         };
    //     });
    // };


    // const handleFileInput = async (e: any) => {
    //     const file = e.target.files[0];
    //     const thumbnail: any = await generateVideoThumbnail(e.target.files[0]);


    //     setTumb(thumbnail)
    //     setSelectedFile(file);

    // }




    // const uploadFile = (file: any) => {

    //     const params = {
    //         ACL: 'private',
    //         Body: file,
    //         Bucket: S3_BUCKET,
    //         Key: file.name
    //     };

    //     myBucket.putObject(params)
    //         .on('httpUploadProgress', (evt) => {
    //             setProgress(Math.round((evt.loaded / evt.total) * 100))
    //         })
    //         .send((err) => {
    //             if (err) console.log(err)
    //         })
    // }

    // const getFiles = (key: any) => {
    //     const paramss = {
    //         Bucket: S3_BUCKET,
    //         Key: key
    //     };




    //     myBucket.getObject(paramss, function (error, data) {
    //         if (error) {
    //             console.error(error);
    //         }

    //         console.log("datad", data)
    //     });
    // }


    return (
        <>

            <div className="p-field">
                {/* <div className="d-flex">
                    <Icons name="i24" />
                    <h4>Curriculum</h4>
                </div>
                <h5>
                    Start putting together your course by creating sections,
                    lectures and practice (quizzes, coding exercises and
                    assignments).
                </h5>

                <div className="my-4">
                    <hr></hr>
                </div> */}

                <div className="d-flex">
                    <div className="hasdfkj" >
                        <input className="full-2"
                            type="radio"
                            value={type}
                            checked={type === 0}
                            name="live"
                            onChange={(e) => setType(0)}
                        />
                        <p>Live classes</p>
                    </div>
                    <div className="hasdfkj">
                        <input className="full-2"
                            type="radio"
                            value={type}
                            checked={type === 1}
                            name="sedule"
                            onChange={(e) => setType(1)}

                        />
                        <p>Classes Seadule</p>

                    </div>

                </div>

                {type === 0 ?
                    <>
                        <div className="drop-box mb-3">
                            <div className="kvjadsd-j43rm">
                                <div className="jodsa-wnedas">
                                    <h6>Section 1</h6>
                                    <div className="jodsa-wnedas">
                                        <Icons name="i25" />
                                        <p>Introduction</p>
                                    </div>
                                </div>
                                <Icons name="i26" />
                            </div>

                            <input
                                type="number"
                                name="price"
                                // value={state.price}
                                // onChange={(e) => hendleFields(e)}
                                placeholder="Write here..." />

                            <div className="drop-box " style={{ marginTop: '10px' }}>
                                <div className="kvjadsd-j43rm">
                                    <div className="jodsa-wnedas">
                                        <h6>Lectures</h6>

                                    </div>
                                    <Icons name="i26" />
                                </div>

                                <div className="p-field  ">
                                    <div className="d-flex">
                                        <Icons name="i24" />
                                        <label>Pricing</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="price"
                                        // value={state.price}
                                        // onChange={(e) => hendleFields(e)}
                                        placeholder="Write here..." />

                                </div>

                                {/* <img src={thumb} width="50px" /> */}

                                <video width="100%" height="100%" controls >
                                    <source src={'s3://bolloot/www_screencapture_com_2022-3-23_23_09.mp4'} type="video/mp4" />
                                </video>

                                <div>
                                    <label>Course Image</label>
                                    {progress}%
                                    <div className="drop-box" style={{ margin: '0px' }}>
                                        <label htmlFor="img" style={{ cursor: 'pointer' }}>
                                            <div className="kvjadsd-j43rm iasdufhvs-ernd">
                                                <Icons name="i29" />
                                                {<p>Drag your photos here</p>}
                                            </div>
                                        </label>
                                        <input type="file" accept="audio/*,video/*" name="cover_image" onChange={(e) => handleFileInput(e)} id="img" style={{ display: 'none' }} />
                                    </div>
                                    {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button> */}
                                </div>

                                {/* <div>
                            {aswVideoSrc.map((aws: any) => (
                                <p onClick={() => getFiles(aws.Key)}>{aws.Key}</p>
                            ))}
                        </div> */}


                            </div>

                        </div>
                        <div className="d-flex">
                            <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                                <button className="upload-1 sdisad-dsdactive ">
                                    Preview
                                </button>
                            </div>
                            <div className="idfadsf-sads kajfds-sdfe">
                                <button className="upload-1 sdisad-dsdactive">
                                    Submit for review
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <Secdule course_id={course_id} />
                }

            </div>

        </>
    );
};
