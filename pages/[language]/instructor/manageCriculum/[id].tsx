import type { NextPage } from "next";
import Dropdown from "../../../../src/components/instructor/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Chart from "../../../../src/components/instructor/chart";
import Chart1 from "../../../../src/components/instructor/chart1";
import BarChart from "../../../../src/components/instructor/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import NewCourse from "../../../../src/components/instructor/newCourse";
import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from 'next/router'
import { Small } from "../../../../src/components/instructor/loader";
import { convertToBase64, generateVideoThumbnail, getBase64Image, SweetAlert } from "../../../../src/function/hooks";
import { myBucket, S3_BUCKET } from "../../../../src/confiq/aws/aws";
import { ProgressBar, Spinner } from "react-bootstrap";
import instance from "../../../../src/confiq/axios/instance";
const options = ["one", "two", "three"];


const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [network, setNetwork] = useState(false)
  const [load, setLoad] = useState(false)
  const [pregress, setProgress] = useState([])
  const [errors, setErrors] = useState()
  const [section, setSection] = useState([

  ])

  console.log("errora", errors)


  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  console.log("section", section)



  const router = useRouter()
  let courseId = router.query.id


  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//instructor/courses/curriculum/get/${courseId}`)
        console.log("rea", res)
        if (res.data.success === true) {
          setLoading(false)
          setSection(res.data.response.sections)
        }
        else {
          setLoading(false)
        }
      }
      catch (err) {
        setLoading(false)

      }
    }
    fetchCourse()
  }, [courseId])



  const AddmoreSection = () => {
    setSection([
      ...section,
      {
        title: '',
        lectures: [
          { title: "", file_type: '', object_key: '', thumbnail: '', progressbar: '' },
        ]
      }
    ])

  }



  const handleChangeSection = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    const lists: any = [...section];
    lists[index][name] = value;
    setSection(lists);
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



  const handleChangeLectureFile = async (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = evnt.target.files[0]
    if (!file.name.match(/.(mp4|pdf)$/i)) {
      SweetAlert({ icon: "error", text: 'please select only video or pdf files ' })
    }
    else
      if (file.type === "video/mp4") {
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
                  element.lectures[i].thumbnail = thumbnail;
                  element.lectures[i].progressbar = prog;
                  element.lectures[i].file_type = "Video";
                  element.lectures[i].object_key = file.name;
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
              setNetwork(true)

            }
          })



      }
      else {
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
                  element.lectures[i].thumbnail = "data:image/png;base64,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";
                  element.lectures[i].progressbar = prog;
                  element.lectures[i].file_type = "PDF";
                  element.lectures[i].object_key = file.name;
                }
              }
              setSection(list)
            }

            else {
              SweetAlert({ icon: "error", text: "please check your internet connection" })
            }

          })
          .send((err, data) => {
            if (err) {
              SweetAlert({ icon: "error", text: err })
              setNetwork(true)
            }
          })



      }




  }




  const AddmoreLecture = (index: number) => {

    const lists: any = [...section];
    for (let i = 0; i < lists.length; i++) {
      if (i === index) {
        const element = lists[i];
        element?.lectures.push({ title: "", file_type: '', file_url: '' })
      }

    }
    setSection(lists)

  }
  const SaveCriculum = async () => {

    let arr = []
    for (let index = 0; index < section.length; index++) {
      const element = section[index];
      for (let j = 0; j < element.lectures.length; j++) {
        const elements = element.lectures[j];
        let regex = /data:.*base64,/
        let checks = elements.thumbnail.replace(regex, "")
        let regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        let check = regexBase64.test(checks);
        elements.thumbnail = check ? elements.thumbnail : elements.thumbnail
      }
      arr.push(element)

    }





    let saveCri = {
      course_id: courseId,
      sections: section
    }

    try {
      setLoader(true)
      let res = await AxInstance.post('api//instructor/courses/curriculum/section/update', saveCri)
      if (res.data.success === true) {
        setLoader(false);

        SweetAlert({ icon: "success", text: 'Criculum are Successfully updated' })
      }
      else {
        setLoader(false)
        setErrors(res.data.error)
      }

    }
    catch (err) {
      setLoader(false)

    }
  }


  const delThumnail = (index: number, i: number) => {
    debugger
    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i].thumbnail = ""
        if (network === true) {
          element.lectures[i].progressbar = 0
        }
      }

    }
    setSection(lists)
  }



  const removeInputFields = (index: number, i: number) => {
    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        let find = element.lectures
        find.splice(i, 1)
      }

    }
    setSection(lists)
  }

  const removeInputField = (index: number,) => {
    const row = [...section];
    row.splice(index, 1);
    setSection(row);
  }


  let red = section?.some((ac) => ac.lectures.some((sa) => sa.progressbar > 0 && sa.progressbar < 100))
  // let red = section.some((ac) => ac.progressbar < 100 && ac.progressbar > 0)



  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">

                  <div className="back-btn">
                    <Link href="/en/instructor/courses" >
                      <h3>
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Manage Curriculum

                    </h3>
                  </div>
                  <div className=" jidfjsd-asjreid">
                  </div>
                </div>
                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads">

                        <button className="upload-1 sdisad-dsdactive"
                          disabled={red ? true : false}
                          style={red ? { opacity: '0.5' } : { opacity: 1 }}
                          onClick={() => AddmoreSection()}
                        >
                          + add more sections </button>
                        <button className="upload-1 sdisad-dsdactive"
                          disabled={red ? true : false}
                          style={red ? { opacity: '0.5' } : { opacity: 1 }}
                          onClick={() => SaveCriculum()}
                        >
                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          {loader ? <Spinner animation="border" />
                            :
                            "Save"
                          }
                        </button>

                      </div>

                    </div>
                  </div>
                </div>
                <div className="complete-web-1 mb-3">
                  <div className="criculum-container">
                    {section ? section?.map((sec: any, index: number) => (
                      <div className="drop-box" style={{ marginLeft: '10px', maxWidth: '100%' }}>
                        <div className="kvjadsd-j43rm">
                          <div className="jodsa-wnedas">
                            <h6>Section title</h6>
                          </div>
                          {sec?.length !== -1 && <div onClick={() => removeInputField(index)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}
                        </div>
                        <div >
                          <input
                            type="text"
                            name="title"
                            className="input_criculum"
                            style={errors && errors?.sections && errors?.sections[index]?.title && { border: '1pt solid red' }}
                            // style={{border: '1pt solid red'}}
                            value={sec.title}
                            onChange={(e) => handleChangeSection(index, e)}
                            placeholder="Write here..." />
                          {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.title}</div> : null}

                        </div>
                        {sec.lectures.map((lec: any, i: number) => (
                          <div className="drop-box " style={{ marginTop: '10px' }}>
                            <div className="kvjadsd-j43rm">
                              <div className="jodsa-wnedas">
                                <h6>Lectures</h6>
                              </div>
                              {lec?.length !== -1 && <div onClick={() => removeInputFields(index, i)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}

                            </div>

                            <div >
                              <div className="d-flex">
                                <Icons name="i24" />
                                <label>Title</label>
                              </div>
                              <input
                                type="text"
                                name="title"
                                className="input_criculum"

                                style={errors && errors?.sections && errors?.sections[index]?.lectures[i]?.title && { border: '1pt solid red' }}
                                value={lec.title}
                                onChange={(e) => handleChangeLecture(index, i, e)}
                                placeholder="Write here..." />
                              {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.lectures[i]?.title}</div> : null}

                            </div>

                            <div className={lec.thumbnail && lec.id || lec.progressbar === 100 ? "image-container" : ""}>
                              <label>Video / PDF file for this Lecture</label>
                              <div className="drop-box img-box"
                                style={errors && errors?.sections && errors?.sections[index]?.lectures[i]?.object_key && { border: '1pt solid red' }}

                              >
                                <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                                  <Icons name="i29" />
                                  <p>{lec?.object_key}</p>
                                  {/* {load ? <Spinner animation="border" size="sm"/> : */}
                                  {/* <>
                                    {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : ""}
                                    {lec.thumbnail || lec.file_type === "Video" ? "" : lec.object_key ? lec?.object_key : <p>Drag file here / Choose file</p>}
                                  </> */}
                                  {/* }/ */}
                                </div>
                                {lec?.object_key ? "" :
                                  <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, i, e)} className="custom-file-input" />
                                }
                                {errors && errors?.sections ? <div className="invalid mt-1">{errors?.sections[index]?.lectures[i]?.object_key}</div> : null}


                              </div>
                              <div className="mt-2">
                                {lec.progressbar === 100 ? " "
                                  :
                                  lec.progressbar && <ProgressBar animated now={lec.progressbar} />}
                              </div>
                              {lec?.object_key && lec.progressbar === 100 ?
                                <>
                                  <div className="overlay"></div>
                                  <div id="icon" onClick={() => delThumnail(index, i)}>
                                    <i className="fa fa-close" ></i>
                                  </div>
                                </>
                                : null
                              }
                            </div>

                          </div>
                        ))}
                        <span className="add-mores"
                        style={sec.lectures.some((s:any) => s.progressbar > 0 && s.progressbar < 100 ) ? {cursor:'not-allowed' } :{ cursor:'pointer'} }
                        onClick={ sec.lectures.some((s:any) => s.progressbar > 0 && s.progressbar < 100 ) ? null : () => AddmoreLecture(index)} >+ Add more lectures </span>


                      </div>
                    ))
                      : <div>Record not found </div>
                    }
                  </div>



                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default Home;
