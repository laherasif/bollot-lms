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
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Router, { useRouter } from "next/router";
import LiveVideo from './videoModel'
import { generateVideoThumbnail, SweetAlert } from "../../function/hooks";
import { S3_BUCKET, myBucket } from '../../confiq/aws/aws'
import {
  addLectureInputPreview,
  addLecturePreview,
  addLectureThumanilPreview,
  delLectureThumanilPreview,
  addMoreLectPreview,
  delLecturepreview,
  delLecturePreviews,
  clearStates,

} from "../../redux/actions/instructor/preview";
import { coursesId } from "../../redux/actions/instructor/addcourse";

export default ({ changeState, onPrevStep, step }: any) => {

  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [live, setLive] = useState('');
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState([]);
  const [section, setSection] = useState([]);



  const inputFile = useRef(null)
  const router = useRouter()

  const dispatch = useDispatch()

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)
  const { Previews, lectures } = useSelector((state: RootStateOrAny) => state?.preview)
  const { courseId } = useSelector((state: RootStateOrAny) => state?.addCourse)

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
        // SweetAlert({ icon: "error", text: err })

      }
    }
    fetchApi()
  }, [])


  const AddmoreSection = () => {

    dispatch(addMoreLectPreview())

  }



  const handleChangeSection = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    dispatch(addLectureInputPreview({ name, value, index }))

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
            debugger
            let prog = Math.round((evt.loaded / evt.total) * 100)
            let data = {
              thumbnail: thumbnail,
              prog: prog,
              video: "Video",
              file: file.name
            }

            dispatch(addLectureThumanilPreview({ data, index }))
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
    dispatch(delLecturepreview(index))



  }



  const AddPreviewLect = (data: any) => {


    if (Previews?.some((d: any) => d.course_section_lecture_id === data.course_section_id)) {
      dispatch(delLecturePreviews(data))

    }
    else {
      dispatch(addLecturePreview(data))
    }
    // }
  }

  const VideoShow = (link: any) => {
    setLive(link)
  }


  const delThumnail = (index: number) => {
    dispatch(delLectureThumanilPreview(index))

  }


  const SaveCriculum = async () => {
    try {
      let saveCri = {
        course_id: courseId,
        previews: Previews
      }
      setLoader(true)
      let res = await AxInstance.post('api//instructor/courses/previews/store', saveCri)
      if (res.data.success === true) {
        setLoading(false)
        SweetAlert({ icon: "success", text: res.data.message })
        router.push('/en/instructor/courses')
        dispatch(clearStates())
        dispatch(coursesId(""))

      }
      else {
        setLoading(false)
        dispatch(clearStates())
        setErrors(res.data.error.previews)


      }
    }
    catch (err) {
      setLoader(false)
      SweetAlert({ icon: "error", text: err })

    }
  }



  console.log("preview" , Previews)
  console.log("preview" , preview)




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
              {preview.length ? preview?.map((pr: any, index: number) => {
              
                  return (
                    <div key={index}>
                      {pr?.lectures?.map((lec: any, i: number) => (
                        <Table responsive="md" key={i} >
                          <tbody >
                            <tr style={lec?.file_type === "PDF" ? { visibility: 'hidden', cursor: 'pointer' } : { cursor: 'pointer' }} >
                              <td>
                                <div className="custom-checkbox">

                                  <input
                                    type="checkbox"
                                    className="custom-control-input "
                                    id="customCheck1"
                                    // checked={Previews?.some((d: any) => d.course_section_lecture_id === lec.course_section_id ? true : false)}
                                    onChange={(e) => AddPreviewLect(lec, e)}
                                  />
                                </div>

                              </td>
                              <>
                                <td onClick={() => VideoShow(lec)}>
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
                              </>

                            </tr>
                          </tbody>
                        </Table>


                      ))}

                    </div>

                  )
              })
                : <div>Preview video not found </div>
              }


            </div>
          </div>
        </div>


        {Previews ? Previews?.map((lec: any, index: number) => {
          if (!lec.course_section_lecture_id)
            return (
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


                <div className={lec.thumbnail && lec.id || lec.progressbar === 100 ? "image-container" : ""}>
                  <label>Video file for this Lecture</label>
                  <div className="drop-box img-box">
                    <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                      <Icons name="i29" />
                      {/* {load ? <Spinner animation="border" size="sm"/> : */}
                      <>
                        {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : ""}
                        {lec.thumbnail || lec.file_type === "Video" ? "" : lec.object_key ? lec?.object_key : <p>Drag file here / Choose file</p>}
                      </>
                      {/* }/ */}
                    </div>
                    {lec?.thumbnail || lec.file_type === "PDF" ? "" :
                      <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, e)} className="custom-file-input" />
                    }
                    {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.object_key}</div> : null}


                  </div>
                  <div className="mt-2">
                    {lec.progressbar === 100 ? " "
                      :
                      lec.progressbar && <ProgressBar animated now={lec.progressbar} />}
                  </div>
                  {lec?.thumbnail  && lec.progressbar === 100 ?
                    <>
                      <div className="overlay"></div>
                      <div id="icon" onClick={() => delThumnail(index)}>
                        <i className="fa fa-close" ></i>
                      </div>
                    </>
                    : null
                  }
                </div>


              </div>
            )
        })
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
        live ?
          <LiveVideo link={live} Toggle={(value) => setLive(value)} /> : null
      }


    </>
  );
};
