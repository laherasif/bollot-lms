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

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [live, setLive] = useState('');
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState([]);
  const [section, setSection] = useState([]);



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
        let res = await AxInstance.get(`api//instructor/courses/curriculum/get/${courseId || 69 }`)
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
      { title: "", file_type: '', object_key: '', thumbnail: '', progressbar: '' },
    ])

  }



  const handleChangeSection = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    const lists: any = [...section];
    lists[index][name] = value;
    setSection(lists);
  }



  const handleChangeLectureFile = async (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = evnt.target.files[0]
    if (!file.name.match(/.(mp4)$/i)) {
      SweetAlert({ icon: "error", text: 'please select only video files ' })
    }

    else {
      const thumbnail: any = await generateVideoThumbnail(file)

      const params = {
        ACL: 'private',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      };
      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          if (evt.loaded && evt.total) {
            let prog = Math.round((evt.loaded / evt.total) * 100)
            const list: any = [...section];
            for (let j = 0; j < list.length; j++) {
              if (j === index) {
                const element = list[j];
                element.thumbnail = thumbnail;
                element.progressbar = prog;
                element.file_type = "Video";
                element.object_key = file.name;
              }
            }
            setSection(list)
          }
          else {
            SweetAlert({ icon: "error", text: "please check your internet connection" })
          }

        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err })
          }
        })
    }

  }

  const removeInputField = (index: number,) => {

    const row = [...section];
    row.splice(index, 1);
    setSection(row);


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


  const handleChangeLecture = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;

    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = value;
      }

    }
    setSection(lists)

  }

  const SaveCriculum = async () => {
    let arr = []


    for (let j = 0; j < section.length; j++) {
      const elements = section[j];
      let regex = /data:.*base64,/
      let checks = elements.thumbnail.replace(regex, "")
      let regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      let check = regexBase64.test(checks);
      arr.push(elements)
      elements.thumbnail = check ? elements.thumbnail : ""


    }

    try {
      let saveCri = {
        course_id: courseId,
        previews: arr
      }
      setLoader(true)
      let res = await AxInstance.post('api//instructor/courses/previews/store', saveCri)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({ icon: "success", text: 'Preview are Successfully updated' })

      }
      else {
        setLoader(false)
        setErrors(res.data.error.previews)

      }
    }
    catch (err) {
      setLoader(false)
    }
  }

  console.log("etrros", errors)



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
              {preview ? preview?.map((pr: any, index: number) => (
                <div key={index}>
                  {pr?.lectures?.map((lec: any, i: number) => (
                    <Table responsive="md" key={i} >

                      <tbody >
                        <tr style={lec?.file_type === "PDF" ? { visibility: 'hidden', cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => VideoShow(lec)}>
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
                          <td >
                            <div className="video_section" >
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

                </div>

              ))
                : <div>Preview video not found </div>
              }


            </div>
          </div>
        </div>


        {section ? section?.map((lec: any, index: number) => (
          <div className="drop-box" style={{ marginLeft: '40px', maxWidth: '80%', marginTop: '30px' }}>
            <div className="kvjadsd-j43rm">
              <div className="jodsa-wnedas">
                <h6>Lectures</h6>
              </div>
              {lec?.length !== -1 && <div onClick={() => removeInputField(index)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}

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
                onChange={(e) => handleChangeSection(index, e)}
                id={`${errors[index]?.title[0] && 'input_filed_error'}`}
                placeholder="Write here..." />
              {errors ? <div className="invalid mt-1">{errors[index]?.title[0]}</div> : null}

            </div>


            <div>
              <label>Video / PDF file for this Lecture</label>
              <div className="drop-box img_container" id={`${errors[index]?.object_key[0] && 'input_filed_error'}`}>
                <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                  <Icons name="i29" />
                  {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : ""}
                  {lec.thumbnail || lec.file_type === "Video" ? "" : lec.object_key ? lec?.object_key : <p>Drag file here / Choose file</p>}
                </div>
                {lec.thumbnail || lec.file_type === "PDF" ? "" :
                  <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, e)} className="custom-file-input" />
                }


              </div>
              {errors ? <div className="invalid mt-1">{errors[index]?.object_key[0]}</div> : null}
              <div className="mt-2">
                {lec.progressbar === 100 ? " "
                  :
                  lec.progressbar && <ProgressBar animated now={lec.progressbar} />}
              </div>
            </div>



          </div>
        ))
          : <div>Record not found </div>
        }

        <div className="umpire w-100 " >
          <div className="umpire-1 umpire-1-cst d-flex justify-content-center mt-3 ">
            <div className="d-flex mb-3 idfadsf-sads">
              <button
                className="upload-1 sdisad-dsdactive "
                onClick={() => onPrevStep(step - 1)}
              >
                Previous
              </button>
              <button
                className="upload-1 sdisad-dsdactive"
                onClick={() => SaveCriculum()}
              >
                <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                {loading ? <Spinner animation="border" /> : "Save & Next"}
              </button>
            </div>

          </div>
        </div>


        {/* <div className="d-flex mt-2 justify-content-center mt-2">
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
        </div> */}


      </div>


      {
        live &&
        <LiveVideo link={live} />
      }


    </>
  );
};
