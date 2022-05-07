import React from "react";
import {

  ProgressBar,
  Spinner,
  Table,
} from "react-bootstrap";
import Icons from "../../insIcons";
import { useState, useEffect, useRef } from 'react'
// import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
// import AWS from 'aws-sdk'
// import Secdule from "./secdule";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import Router, { useRouter } from "next/router";
import LiveVideo from './videoModel'
import { generateVideoThumbnail, SweetAlert } from "../../function/hooks";
import { S3_BUCKET, myBucket } from '../../confiq/aws/aws'

export default ({ changeState, courseId, onPrevStep, step }: any) => {

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumb, setTumb] = useState();
  const [videos, setVideos] = useState();
  const [lectures, setLectures] = useState([]);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState('');
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [section, setSection] = useState([
    {
      title: '',
      lectures: [
        { title: "", file_type: '', object_key: '', thumbnail: '' },

      ]

    }
  ])
  const [section2, setSection2] = useState([])

  const inputFile = useRef(null)
  const router = useRouter()

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let res = await AxInstance.get(`api//instructor/courses/curriculum/get/${courseId}`)
        setPreview(res.data.response.sections)

      }
      catch (err) {
        SweetAlert({ icon: "error", text: "Network error" })
      }
    }
    fetchApi()
  }, [])


  const AddmoreSection = () => {
    setSection([
      ...section,
      {
        title: '',
        lectures: [
          { title: "", file_type: '', object_key: '', thumbnail: '' },
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





  const AddPreviewLect = (data: any, e) => {
    console.log("e", e)
    if (lectures.some((d: any) => d.id === data.id)) {
      alert("already")
    }
    else {

      setLectures([...lectures, data])
    }


  }

  const VideoShow = (link: any) => {
    setLive(link)
  }



  const handleChangeLectureFile = async (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name } = evnt.target;
    const file: any = evnt.target.files[0]
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
        let pro = Math.round((evt.loaded / evt.total) * 100)
        const list: any = [...section2];
        for (let j = 0; j < list.length; j++) {
          if (j === index) {
            const element = list[j];
            element.lectures[i].thumbnail = thumbnail;
            element.lectures[i][name] = file;
            element.lectures[i].progressbar = pro;

          }

        }
        setSection2(list)

      })
      .send((err, data) => {
        if (err) console.log(err);
      })

    // const list: any = [...section2];
    // for (let j = 0; j < list.length; j++) {
    //   if (j === index) {
    //     const element = list[j];
    //     element.lectures[i].thumbnail = thumbnail;
    //     element.lectures[i][name] = file;
    //     element.lectures[i].progressbar = progress;

    //   }

    // }
    // setSection2(list)

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = file.type === "video/mp4" ? "Video" : "PDF";
        element.lectures[i].thumbnail = thumbnail;
        element.lectures[i].object_key = file.name;


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

  const SaveCriculum = async () => {
    debugger

    try {

      let arr = []

      for (let index = 0; index < lectures.length; index++) {
        const element: any = lectures[index];
        // let reader = new FileReader();
        // reader.readAsDataURL(element.thumbnail);
        // reader.onloadend = () =>  {
        //   console.log(reader.result);
        // };
        arr.push({ course_section_lecture_id: element.id }, { title: element.title, object_key: element.object_key, thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYA…gQIAAAQIECBAgQIBAWGDbAA5oOFrJ1gAAAABJRU5ErkJggg==" })

      }

      let saveCri = {
        course_id: courseId,
        previews: arr
      }
      setLoading(true)
      let res = await AxInstance.post('api//instructor/courses/previews/store', saveCri)
      console.log("res", res)
      if (res.data.success === true) {
        setLoading(false)
        router.push(`/en/instructor/courses`)

      }
      else {
        setLoading(false)
        setErrors(res.data.error)
        SweetAlert({ icon: 'error', text: 'please fill fields ' })

      }
    }
    catch (err) { }
  }






  return (
    <>



      <div className="p-fields">
        <div className="complete-web-1 ">
          <div className="umpire w-100">
            <div className="umpire-1 umpire-1-cst ">
              <div className="maxima ">
                <div className="idfadsf-sads">
                  <button onClick={() => AddmoreSection()} className="upload-1 sdisad-dsdactive">
                    + Add peview video
                  </button>
                </div>
                {/* <div style={{ marginLeft: '20px' }} className="idfadsf-sads">
                  <button className="upload-1 sdisad-dsdactive" > <i className="fa fa-save"></i>Save</button>
                </div> */}


              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 table-video" >
              {preview ? preview?.map((pr: any, i: number) => (
                <>
                  {pr?.lectures.map((lec: any, i: number) => (
                    <Table responsive="md" >

                      <tbody >
                        <tr>
                          <td>
                            <div className="custom-checkbox">

                              <input
                                type="checkbox"
                                className="custom-control-input "
                                id="customCheck1"
                                onChange={(e) => AddPreviewLect(lec, e)}
                              />
                            </div>

                          </td>
                          <td>
                            <div className="video_section" onClick={() => VideoShow(lec)}>
                              <img src={lec?.thumbnail} alt="previews" />
                              <div className="video-icon">
                                <i className="fas fa-play-circle"></i>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="video-title">
                              {lec?.title}

                            </div>
                          </td>

                        </tr>
                      </tbody>
                    </Table>


                  ))}

                </>

              ))
                : <div>Preview video not found </div>
              }


            </div>
          </div>
        </div>

        {/* 
        {type === 1 ? */}
        <>
          {section2.map((sec: any, index: number) => (
            <div className="drop-box mb-3" style={{ maxWidth: '90%', margin: 'auto', marginTop: '20px' }}>
              <>

                {sec.lectures.map((lec: any, i: number) => (

                  <div className="drop-box " style={{ marginTop: '10px' }}>
                    <div className="kvjadsd-j43rm">
                      <div className="jodsa-wnedas">
                        <h6>Lectures</h6>
                      </div>
                      {lec?.length !== -1 && <div onClick={() => removeInputFields(index, i)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}

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

                        <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                          <Icons name="i29" />
                          {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" style={{ width: '100%', objectFit: 'cover' }} /> : ""}
                          {!lec.thumbnail && <p>Drag file here / Choose file</p>}
                        </div>
                        {lec.thumbnail ? "" :
                          <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, i, e)} className="custom-file-input" />
                        }
                        {/* <input type="file" ref={inputFile} accept="audio/*,video/*" name="file_type" onChange={(e) => handleChangeLectureFile(index, i, e)} id="img" style={{ display: 'none' }} /> */}
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
                <h3 style={{ cursor: 'pointer', }} onClick={() => AddmoreLecture(index)} >+ Add more lectures </h3>


              </>
            </div>
          ))}
          <div className="d-flex mt-2 justify-content-center mt-2">
            <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
              <button className="upload-1 sdisad-dsdactive " onClick={() => onPrevStep(step - 1)}>
                Previous
              </button>
            </div>
            <div className="idfadsf-sads kajfds-sdfe">
              <button className="upload-1 sdisad-dsdactive" onClick={() => SaveCriculum()}>
                {loading ?
                  <Spinner animation="border" />
                  :
                  "Finish"
                }
              </button>
            </div>
          </div>
        </>
        {/* :
          null
        } */}

        {live &&
          <LiveVideo link={live} />}

      </div>

    </>
  );
};
