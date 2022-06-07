import type { NextPage } from "next";
import Dropdown from "../../../../src/components/admin/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/admin/TopNavbar";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Chart from "../../../../src/components/admin/chart";
import Chart1 from "../../../../src/components/admin/chart1";
import BarChart from "../../../../src/components/admin/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import NewCourse from "../../../../src/components/admin/newCourse";
import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import { useRouter } from "next/router";
import { Breadcrumb, ProgressBar, Spinner } from "react-bootstrap";
import { bytesToSize, generateVideoThumbnail, SweetAlert } from "../../../../src/function/hooks";
import { S3_BUCKET, myBucket } from '../../../../src/confiq/aws/aws'
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [section, setSection] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [network, setNetwork] = useState(false)
  const [errors, setErrors] = useState()

  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  let router = useRouter()

  let courseId = router.query.id




  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//admin/courses/previews/get/${courseId}`)
        if (res.data.success === true) {
          setLoading(false)
          setSection(res.data.response.course_previews)
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
      { title: "", file_type: '', object_key: '', thumbnail: '', progressbar: '', file_size: '', uuid: '' },
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
    if (!file.name.match(/.(mp4| mov | wmv | avi | avchd | flv| mkv| mpeg-2)$/i)) {
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
                element.file_size = file.size;
                element.uuid = 123

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








  const SaveCriculum = async () => {
    let arr = []




    try {

      let saveCri = {
        course_id: courseId,
        previews: section
      }
      setLoader(true)
      let res = await AxInstance.post('api//admin/courses/previews/update', saveCri)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({ icon: "success", text: res.data.message })

      }
      else {
        setLoader(false)
        setErrors(res.data.error.previews)

      }
    }
    catch (err) {
      setLoader(false)
      setNetwork(true)
    }
  }


  const delThumnail = (index: number,) => {
    const lists: any = [...section];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.thumbnail = ""
        element.object_key = ""
        if (network === true) {
          element.progressbar = 0
        }
      }

    }
    setSection(lists)
  }



  let red = section.some((ac) => ac.progressbar < 100 && ac.progressbar > 0)


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

                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/liveCourses">Live Courses</Breadcrumb.Item>
                      <Breadcrumb.Item active>Manage Previews </Breadcrumb.Item>
                    </Breadcrumb>

                    {/* <Link href="/en/admin/courses" >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Manage Preview Video */}

                    {/* </h3> */}
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
                          + Add more preview </button>
                        <button className="upload-1 sdisad-dsdactive"
                          disabled={red ? true : false}
                          style={red ? { opacity: '0.5' } : { opacity: 1 }}
                          onClick={() => SaveCriculum()}
                        >
                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          {loader ?
                            <Spinner animation="border" />
                            : "Save"
                          }

                        </button>

                      </div>


                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  {section ? section?.map((lec: any, index: number) => (

                    < div className="drop-box" style={{ marginLeft: '10px', maxWidth: '30%' }}>
                      <div className="kvjadsd-j43rm">
                        <div className="jodsa-wnedas">
                          <h6>Lectures</h6>
                        </div>
                        {

                          lec?.length !== -1 && <div style={lec?.progressbar > 0 && lec?.progressbar < 100 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} onClick={lec?.progressbar > 0 && lec?.progressbar < 100 ? null : () => removeInputField(index)} ><i className="fa fa-trash"></i></div>}

                      </div>

                      <div className="">
                        <div className="d-flex">
                          <Icons name="i24" />
                          <label>Title</label>
                        </div>
                        <input
                          type="text"
                          name="title"
                          className="input_criculum"
                          style={errors && errors[index]?.title && { border: '1pt solid red' }}
                          // id={`${errors[index]?.title && 'input_filed_error'}`}
                          value={lec.title}
                          onChange={(e) => handleChangeSection(index, e)}
                          placeholder="Write here..." />
                        {errors && errors[index]?.title ? <div className="invalid mt-1">{errors[index]?.title}</div> : null}

                      </div>


                      <div className={lec.thumbnail && lec.id || lec.progressbar === 100 || network ? "image-container" : ""}

                      >
                        <label>Video / PDF file for this Lecture</label>
                        <div className="drop-box img-box w-100"
                          style={errors && errors[index]?.object_key && { border: '1pt solid red' }}

                        >
                          <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                            <Icons name="i29" />
                            {lec?.id && !lec?.uuid && lec?.thumbnail !== '' ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : lec?.object_key}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {lec?.file_size > 0 && <p className="mt-2">File Size : {bytesToSize(lec?.file_size)}</p>}
                              {lec?.progressbar === 100 && <p className="mt-2">File Uploaded <i style={{ color: 'green' }} className="fa fa-check-circle"></i></p>}
                            </div>
                          </div>
                          {lec.thumbnail ? "" :
                            <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, e)} className="custom-file-input" />
                          }
                          {errors && errors[index]?.object_key ? <div className="invalid mt-1">{errors[index]?.object_key}</div> : null}


                        </div>
                        <div className="mt-2">
                          {lec.progressbar === 100 ? " "
                            :
                            lec?.progressbar && <ProgressBar animated now={lec.progressbar} />}
                        </div>
                        {lec?.object_key || lec?.thumbnail && lec.progressbar === 100 ?
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
                  ))
                    : <div>Record not found </div>
                  }


                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default AdminAuth( Home );
