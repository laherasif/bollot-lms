import React from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import Icons from "../../insIcons";
import { useState, useEffect, useRef } from 'react'
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk'
import Secdule from "./secdule";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import Router, { useRouter } from "next/router";
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



export default ({ course_id }: any) => {

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumb, setTumb] = useState();
  const [videos, setVideos] = useState();
  const [aswVideoSrc, setAwsVideoSrc] = useState([]);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [section, setSection] = useState([
    {
      title: '',
      lectures: [
        { title: "", file_type: '', file_url: 'http://www.bollot.com', },

      ]

    }
  ])
  const [section2, setSection2] = useState([
    {
      title: '',
      lectures: [
        { title: '', file: '', thumbnail: '', progressbar: 0 }
      ]

    }
  ])


  const inputFile = useRef(null)

  const AddmoreSection = () => {
    setSection([
      ...section,
      {
        title: '',
        lectures: [
          { title: "", file_type: '', file_url: 'http://www.bollot.com', },

        ]
      }
    ])

    setSection2([
      ...section2,
      {
        title: '',
        lectures: [
          { title: "", file: '', thumbnail: '', progressbar: 0 },

        ]
      }
    ])
  }


  const handleChangeSection = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...section2];
    list[index][name] = value;
    setSection2(list);


    const lists: any = [...section];
    lists[index][name] = value;
    setSection(lists);



  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };



  const router = useRouter()




  const handleChangeLecture = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...section2];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.lectures[i][name] = value;
      }

    }
    setSection2(list)

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = value;
      }

    }
    setSection(lists)

  }


  const generateVideoThumbnail = (file: File) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");

      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        let ctx: any = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };



  const handleChangeLectureFile = async (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name } = evnt.target;
    const file = evnt.target.files[0]
    const thumbnail: any = await generateVideoThumbnail(file);
    // setTumb(thumbnail)

    const params = {
      ACL: 'private',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };





    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err, data) => {
        if (err) console.log(err);
      })



    const list: any = [...section2];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.lectures[i].thumbnail = thumbnail;
        element.lectures[i][name] = file;
        element.lectures[i].progressbar = progress;

      }

    }
    setSection2(list)

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = file.type === "video/mp4" ? "Video" : "PDF";


      }

    }
    setSection(lists)


  }








  const AddmoreLecture = (index: number) => {
    const list: any = [...section2];
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        const element = list[i];
        element?.lectures.push({ title: "", file: '' })
      }

    }
    setSection2(list)

    const lists: any = [...section];
    for (let i = 0; i < lists.length; i++) {
      if (i === index) {
        const element = lists[i];
        element?.lectures.push({ title: "", file_type: '', file_url: 'https://www.bollot.com' })
      }

    }
    setSection(lists)

  }



  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  const SaveCriculum = async () => {
    debugger
    try {


      let saveCri = {
        course_id: course_id,
        sections: section
      }

      console.log("saveCri", saveCri)
      setLoading(true)
      let res = await AxInstance.post('api//instructor/courses/curriculum/store', saveCri)
      if (res.data.success === true) {
        setLoading(false)
        router.push(`/en/instructor/quiz/${res.data.response.course.id}`)

      }
      else {
        setLoading(false)
        setErrors(res.data.error)
        SweetAlert({ icon: 'error', text: 'please fill fields ' })

      }
    }
    catch (err) { }
  }


  const removeInputFields = (index: number, i: number) => {
    debugger

    const list: any = [...section2];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        let find = element.lectures
        find.splice(i, 1)
      }

    }
    setSection2(list)

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = list[j];
        let find = element.lectures
        find.splice(i, 1)
      }

    }
    setSection(lists)
  }

  const removeInputField = (index: number,) => {

    const rows = [...section2];
    rows.splice(index, 1);
    setSection2(rows);

    const row = [...section];
    row.splice(index, 1);
    setSection(row);


  }


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


  console.log("section", section2)


  return (
    <>

      <div className="p-field">

        <div className="row">
          <div className="col-12 col-md-6 mt-10 col-md-offset-1 " >
            <div
              data-cy="button-box"
              id="up-button-box"
              className={`up-button-box ${type === 0 ? 'up-button-box  up-button-box-radio active' : ''} `}
              style={{ height: '100%' }}
              onClick={() => setType((0))}
            >
              <div className="up-radio">
                <label className="up-checkbox-label" htmlFor="up-button-box">
                  <input
                    type="radio"
                    checked={type === 0}
                    name="student"
                    onChange={(e) => setType(0)}
                  />
                  <span className="up-checkbox-replacement-helper">
                    {/**/} {/**/}{" "}
                  </span>{" "}
                </label>
              </div>{" "}
              <div className="up-illustrations">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 145 130"
                  aria-hidden="true"
                  role="img"
                >
                  <polygon
                    points="145,18.601 73.396,10.394 72.487,18.338 71.58,10.422 0,18.622 12.049,123.807	72.489,116.884 132.95,123.809"
                    fill="var(--illustration-color-13, #e8f1e8)"
                  />
                  <rect
                    x="28.472"
                    width="88.055"
                    height={130}
                    fill="var(--illustration-color-1, #d5e0d5)"
                  />
                  <rect
                    x="46.352"
                    y="99.789"
                    width="53.601"
                    height="16.229"
                    fill="var(--illustration-color-2, #14a800)"
                  />
                  <path
                    d="M98.925 40.338c0 14.554-11.802 26.361-26.354 26.361-14.56 0-26.36-11.807-26.36-26.361 0-14.552 11.801-26.355 26.36-26.355 14.552 0 26.354 11.804 26.354 26.355"
                    fill="var(--illustration-color-11, #f7faf7)"
                  />
                  <path
                    d="M81.664 37.781c0 4.764-3.865 8.633-8.626 8.633-4.769 0-8.629-3.869-8.629-8.633 0-4.763 3.86-8.633 8.629-8.633 4.761 0 8.626 3.87 8.626 8.633m-.971 9.439a12.184 12.184 0 01-6.476 2.661c-.396.043-.791.078-1.19.078-.402 0-.798-.035-1.194-.081a12.085 12.085 0 01-6.457-2.666A18.452 18.452 0 0055.05 59.997c4.66 4.154 10.781 6.706 17.519 6.706 7.108 0 13.541-2.832 18.285-7.409A18.44 18.44 0 0080.693 47.22"
                    fill="var(--illustration-color-15, #9aaa97)"
                  />
                  <path
                    d="M109.936 122.305l-6.063-6.059 5.198-3.309c.128-.121.063-.34-.11-.385l-18.143-6.512a.227.227 0 00-.281.271l6.518 18.149c.04.177.262.235.387.106l3.31-5.189 6.056 6.053c.16.162.424.162.584 0l2.545-2.545a.411.411 0 00-.001-.58z"
                    fill="var(--white, #ffffff)"
                  />
                  <path
                    d="M96.029 80.154H48.971a1.568 1.568 0 110-3.136H96.03c.867 0 1.566.701 1.566 1.568s-.7 1.568-1.567 1.568zm-3.102 9.319H52.075a1.568 1.568 0 110-3.135h40.852a1.567 1.567 0 110 3.135z"
                    fill="var(--illustration-color-4, #beccbe)"
                  />
                </svg>
              </div>{" "}
              <div id="button-box-1" className="up-button-box-labels">
                <div className="up-button-box-label">
                  <h4>I will upload lectures for students</h4>
                </div>{" "}
                {/**/}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-10">
            <div data-cy="button-box"
              className={`up-button-box ${type === 1 ? 'up-button-box  up-button-box-radio active' : ''} `}
              onClick={() => setType((1))}

            >
              <div className="up-radio">
                <label className="up-checkbox-label">
                  <input
                    type="radio"
                    value={type}
                    checked={type === 1}
                    name="instructor"
                    onChange={(e) => setType(1)}
                  />{" "}
                  <span className="up-checkbox-replacement-helper">
                    {/**/} {/**/}{" "}
                  </span>{" "}
                </label>
              </div>{" "}
              <div className="up-illustrations">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 145 130"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    d="M125.657 123.228H57.062a1.55 1.55 0 01-1.553-1.555V8.328c0-.857.694-1.556 1.553-1.556h86.383c.857 0 1.556.698 1.556 1.556v95.436"
                    fill="var(--illustration-color-2, #14a800)"
                  />
                  <path
                    d="M108.203 30.291H72.431a1.612 1.612 0 010-3.222h35.772a1.611 1.611 0 010 3.222zm20.481 22.017H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm-9.783 39.794H72.603a1.612 1.612 0 010-3.223h46.299a1.611 1.611 0 11-.001 3.223zm9.783-26.532H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm0 13.268H72.603a1.611 1.611 0 010-3.221h56.081a1.61 1.61 0 110 3.221z"
                    fill="var(--illustration-color-5, #00c217)"
                  />
                  <polygon
                    points="125.657,123.228 125.657,103.764 145,103.764"
                    fill="var(--illustration-color-5, #00c217)"
                  />
                  <path
                    d="M55.515 96.132v-38.19a3.597 3.597 0 013.598-3.596h12.751c4.575 0 8.661-2.723 9.095-7.278.5-5.227-3.597-8.688-8.72-8.688H53.424a8.747 8.747 0 00-5.891 2.271L34.754 51.467l-.217.199a8.71 8.71 0 01-6.059 2.438H2.628v42.027h52.887z"
                    fill="var(--illustration-color-13, #e8f1e8)"
                  />
                  <path
                    d="M.809 98.674H29.34a1.62 1.62 0 001.623-1.616V53.236c0-.896-.728-1.621-1.623-1.621H.809a.809.809 0 00-.809.811v45.439c0 .444.36.809.809.809"
                    fill="var(--illustration-color-1, #d5e0d5)"
                  />
                  <path
                    d="M24.839 60.703a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0"
                    fill="var(--white, #ffffff)"
                  />
                </svg>
              </div>{" "}
              <div id="button-box-2" className="up-button-box-labels">
                <div className="up-button-box-labels">
                  <h4>I will all the classes personally, online </h4>
                </div>{" "}
                {/**/}
              </div>
            </div>
          </div>
        </div>



        {type === 0 ?
          <>
            <div className="drop-box mb-3">
              {section2.map((sec: any, index: number) => (
                <>
                  <div className="kvjadsd-j43rm">
                    <div className="jodsa-wnedas">
                      <h6>Section title</h6>
                    </div>
                    { sec?.length !== -1 && <div onClick={()=> removeInputField( index  )} style={{cursor:'pointer'}}><i className="fa fa-trash"></i></div> }

                  </div>
                  <input
                    type="text"
                    name="title"
                    value={sec.title}
                    onChange={(e) => handleChangeSection(index, e)}
                    placeholder="Write here..." />
                  {/* { errors && <div className='invalid'>{errors.sections.0.title[0]}</div>} */}
                  {sec.lectures.map((lec: any, i: number) => (

                    <div className="drop-box " style={{ marginTop: '10px' }}>
                      <div className="kvjadsd-j43rm">
                        <div className="jodsa-wnedas">
                          <h6>Lectures</h6>
                        </div>
                        { lec?.length !== -1 && <div onClick={()=> removeInputFields( index  , i )} style={{cursor:'pointer'}}><i className="fa fa-trash"></i></div> }

                      </div>

                      <div className="p-field  ">
                        <div className="d-flex">
                          <Icons name="i24" />
                          <label>Title</label>
                        </div>
                        <input
                          type="text"
                          name="title"
                          value={lec.title}
                          onChange={(e) => handleChangeLecture(index, i, e)}
                          placeholder="Write here..." />

                      </div>

                      {/* <img src={thumb} width="50px" /> */}

                      {/* <video width="100%" height="100%" controls >
                                    <source src={'s3://bolloot/www_screencapture_com_2022-3-23_23_09.mp4'} type="video/mp4" />
                                </video> */}

                      <div>
                        <label>Video / PDF file for this Lecture</label>
                        {/* {progress}% */}
                        <div className="drop-box" style={{ margin: '0px' }}>

                          <div className="kvjadsd-j43rm iasdufhvs-ernd" onClick={onButtonClick}>
                            <Icons name="i29" />
                            {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" style={{ width: '100%', objectFit: 'cover' }} /> : ""}
                            {!lec.thumbnail && <p>Drag file here / Choose file</p>}
                          </div>

                          <input type="file" ref={inputFile} accept="audio/*,video/*" name="file_type" onChange={(e) => handleChangeLectureFile(index, i, e)} id="img" style={{ display: 'none' }} />
                        </div>
                        <div className="mt-2">
                          {lec.progressbar === 100 ? " "
                            :
                            lec.progressbar && <ProgressBar animated now={lec.progressbar} />}
                        </div>
                        {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button> */}
                      </div>





                      {/* <div>
                            {aswVideoSrc.map((aws: any) => (
                              <p onClick={() => getFiles(aws.Key)}>{aws.Key}</p>
                              ))}
                            </div> */}


                    </div>
                  ))}
                  <h3 style={{ cursor: 'pointer' }} onClick={() => AddmoreLecture(index)} >+ Add more lectures </h3>


                </>
              ))}
            </div>
            <h3 style={{ cursor: 'pointer' }} onClick={() => AddmoreSection()}  >+ Add more lectures and more sections</h3>
            <div className="d-flex">
              <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                {/* <button className="upload-1 sdisad-dsdactive ">
                  Preview
                </button> */}
              </div>
              <div className="idfadsf-sads kajfds-sdfe">
                <button className="upload-1 sdisad-dsdactive" onClick={() => SaveCriculum()}>
                  {loading ?
                    <Spinner animation="border" />
                    :
                    "Save & Next"
                  }
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
