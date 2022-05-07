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
import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import { useRouter } from "next/router";
import { ProgressBar, Spinner } from "react-bootstrap";
import { generateVideoThumbnail, SweetAlert } from "../../../../src/function/hooks";
import { S3_BUCKET , myBucket } from '../../../../src/confiq/aws/aws'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [section, setSection] = useState([])
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState()

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  let router = useRouter()
  const inputFile: any = useRef(null)

  let courseId = router.query.id

  console.log("error" , errors)


  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//instructor/courses/previews/get/${courseId}`)
        console.log("res", res)
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
    
    else{
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
              setSection( list )
            }
            else{
              SweetAlert({ icon: "error" , text : "please check your internet connection"})
            }

          })
          .send((err) => {
            if(err){
              SweetAlert({icon: "error" , text : err}) 
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

    try {

      let arr = []
      for (let j = 0; j < section.length; j++) {
        const elements = section[j];
        let regex = /data:.*base64,/
        let checks =  elements.thumbnail.replace(regex,"")
        let regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
         let check =  regexBase64.test(checks); 
         elements.thumbnail  = check ? elements.thumbnail : "" 

         arr.push(elements)
      }

      let saveCri = {
        course_id: courseId,
        previews: arr
      }
      setLoader(true)
      let res = await AxInstance.post('api//instructor/courses/previews/update', saveCri)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({icon : "success" , text :'Preview are Successfully updated'})

      }
      else {
        setLoader(false)
        setErrors(res.data.error)
        SweetAlert({ icon: 'error', text: 'please fill fields ' })

      }
    }
    catch (err) { 
      setLoader(false)
    }
  }


  let red = section.some((ac) => ac.progressbar < 100)


  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {/* {loading ? Small()
          : */}
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
                    <h3>Manage Preview Video
                    <br/>
                    <span style={{fontSize:'12px' , color:'red' , width:'100%'}}>(During uploading leacture progressbar create more and Save will not created till leature upload )</span>

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
                        disabled={red ? true : false }
                          onClick={() => AddmoreSection()}
                        >
                          + Add more preview </button>
                        <button className="upload-1 sdisad-dsdactive"
                          onClick={() => SaveCriculum()}
                        >
                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i> 
                          { loader ? 
                            <Spinner animation="border"/>  
                           : "Save"
                        }

                          </button>

                      </div>


                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  {section ? section?.map((lec: any, index: number) => (
                    <div className="drop-box" style={{ marginLeft: '10px', maxWidth: '30%' }}>
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
                          placeholder="Write here..." />

                      </div>


                      <div>
                              <label>Video / PDF file for this Lecture</label>
                              <div className="drop-box img_container">
                                <div className="kvjadsd-j43rm iasdufhvs-ernd" >
                                  <Icons name="i29" />
                                  {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" className="thum_img" /> : ""}
                                  {lec.thumbnail || lec.file_type === "Video" ? "" : lec.object_key ? lec?.object_key : <p>Drag file here / Choose file</p>}
                                </div>
                                {lec.thumbnail || lec.file_type === "PDF" ? "" :
                                  <input type="file" accept="pdf/*" onChange={(e) => handleChangeLectureFile(index, e)} className="custom-file-input" />
                                }


                              </div>
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


                </div>
              </div>
            </div>
          </div>
        {/* } */}
      </section >
    </div >
  );
};

export default Home;