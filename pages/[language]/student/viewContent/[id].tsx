import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import moment from "moment";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useRouter } from "next/router";
import { myBucket, S3_BUCKET } from "../../../../src/confiq/aws/aws";
import { BsExclamationLg } from 'react-icons/bs'
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import { Breadcrumb, ProgressBar } from "react-bootstrap";
import { generateVideoThumbnail, SweetAlert } from "../../../../src/function/hooks";
import { pdfThumnail } from "../../../../src/constant/constant";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import Sidebar from "../../../../src/components/student/sidebar";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = ["one", "two", "three"];
const Home: NextPage = () => {

  // const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [isEdit, setIsEdit] = useState(false)
  const [section, setSection] = useState({})
  const [url, setUrl] = useState('')
  const [progressbar, setProgressbar] = useState()
  const [title, setTitle] = useState('')
  const [fileType, setFileType] = useState('')
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [option, setOption] = useState(null);
  const [answer, setAnswer] = useState('')
  const [check, setCheck] = useState(null)


  function onDocumentLoadSuccess(numPages: number) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const router = useRouter()
  let courseId = router.query.courseId
  let lectureId = router.query.lectId
  let courseTitle = router.query.title


  useEffect(() => {
    let fetchCourse = async () => {


      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/my-courses/curriculum/lectures-content/${86}`)
        if (res.data.success === true) {
          setLoading(false)
          if (res.data.response.lecture.key === 'images') {
            const paramss = {
              Bucket: S3_BUCKET,
              Key: res.data.response.lecture.value
            };
            const url = myBucket.getSignedUrl('getObject', paramss);
            setUrl(url)
          }

          setSection(res.data.response.lecture)

        }
        else {
          setLoading(false)
        }
      }
      catch (err) {
        setLoading(false)
        // SweetAlert({ icon: "error", text: err })

      }
    }
    fetchCourse()
  }, [lectureId])


  const handleChangeLectureFile = async (
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: any = evnt.target.files[0];
    setFileType(file?.name)

    if (!file?.name.match(/.(mp4|pdf|mov|wmv|avi|avchd|flv|mkv|mpeg-2)$/i)) {
      SweetAlert({
        icon: "error",
        text: "please select only video or pdf files ",
      });
    } else if (file?.type === "video/mp4") {
      const params = {
        ACL: "private",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          if (evt.loaded && evt.total) {
            let prog = Math.round((evt.loaded / evt.total) * 100);

            setProgressbar(prog)
          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });

          }
        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });

          }
        });
    } else {
      const params = {
        ACL: "private",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          if (evt.loaded && evt.total) {
            let prog = Math.round((evt.loaded / evt.total) * 100);
            setProgressbar(prog)


          } else {
            SweetAlert({
              icon: "error",
              text: "please check your internet connection",
            });

          }
        })
        .send((err) => {
          if (err) {
            SweetAlert({ icon: "error", text: err });

          }
        });
    }
  };




  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }


  const EditCourse = async () => {
    debugger
    try {
      let value = {
        lecture_id: 15,
        title: title,
        file_type: fileType?.file.type,
        file_url: fileType?.file.name
      }
      let res = await AxInstance.post('api//instructor/courses/curriculum/lectures/update', value)
      console.log("Res", res)

    }
    catch (err) {

    }
  }


  const handleInputChoice = (d) => {
    setOption(d)
  }




  return (
    <>
      {/* <NavigationBar1 /> */}
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">
                  <div className="d-flex mb-3">
                    <Breadcrumb>
                      <Breadcrumb.Item href="/student/dashboard">Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="/student/courses">My Courses</Breadcrumb.Item>
                      <Breadcrumb.Item >{courseTitle}</Breadcrumb.Item>
                    </Breadcrumb>

                  </div>
                  <div className="lecture_show">
                    {section?.contents?.map((item: any, index: any) => {
                      return (
                        <>
                          {
                            item.key === 'text' ?
                              <div className="lecture_detail">

                                <iframe src={item?.value} width={"100%"} title="Iframe Example"></iframe>
                              </div>
                              :
                              null
                          }

                          {
                            // d.codes?.map((c: any, i: number) => (
                            item?.key === "code" &&
                            <div className="code_block">
                              <div className="table_heading">
                                <div className="heading_left">

                                  <h4 style={{ paddingTop: '20px', fontSize: '16px' }}>{item?.value?.title}</h4>
                                </div>
                                <div className="heading_right">
                                  <div className="code_right">
                                    {/* <span className="code_heading">{item?.value?.language}</span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="code_instuction">
                                <span className="code_heading">{item?.value?.instruction}</span>

                              </div>


                              <div className="code_editor">
                                <div className="w-100 ">
                                  <span className="code_heading">
                                    <div dangerouslySetInnerHTML={{ __html: item?.value?.code }} />
                                  </span>

                                </div>
                              </div>


                            </div>
                            // ))
                          }

                          {
                            item?.key === "multiple" &&
                            < div className="multiple_choice" >
                              <div className="multiple_heading">
                                <div className="multiple_left">
                                  <h3>Participation Activity</h3>
                                  <h4 style={{ paddingLeft: '4rem', paddingTop: '20px', fontSize: '16px' }}>{item?.value?.title}</h4>
                                  <span className="right_border"></span>
                                </div>

                              </div>
                              <div className="multple_sugest">
                                <h4 style={{ paddingLeft: '10px' }}>{item?.value?.instruction}</h4>
                              </div>
                              {item.value?.questions.map((qs: any, ind: number) => (
                                <div className="multiple_option">
                                  <div className="row">
                                    <div className="col-md-7" >
                                      <>
                                        <div className="question" key={ind}>
                                          {ind + 1}) <input type="text" value={qs?.question} name="question" onChange={(e) => handleInputChoice(e, "multiple", index, i, ind, 0)} placeholder="questions" />
                                        </div>
                                        {qs?.options?.map((op: any, opIndex: number) => (
                                          <div className="options_data" key={opIndex}>
                                            <label>
                                              <input type="radio" name="option" onChange={(e) => handleInputChoice(op?.is_correct === "1" ? "1" : "0")} />
                                              <span style={{ paddingLeft: '10px' }}>{op?.option}</span>
                                            </label>
                                          </div>
                                        ))}
                                      </>



                                    </div>
                                    {option &&
                                      <div className="col-md-5">
                                        <div className="right_question_block">
                                          <div className={option === "1" ? " on_option  " : option === "0" ? " of_option  " : "question_wrapper"} style={{ height: '70px' }}>
                                            <div className="explaination" style={{ paddingTop: '20px' }}>
                                              <span >{qs?.choice_desc}</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>
                                    }

                                  </div>
                                </div>
                              ))
                              }
                            </div>

                          }

                          {
                            item.key === "short" &&
                            < div className="multiple_choice" >
                              <div className="multiple_heading">
                                <div className="multiple_left">
                                  <h3>Participation Activity</h3>
                                  <h4 style={{ paddingLeft: '4rem', paddingTop: '20px', fontSize: '16px' }}>{item?.value?.title}</h4>
                                  <span className="right_border"></span>
                                </div>

                              </div>

                              {item.value?.questions.map((qs: any, ind: number) => (
                                <div className="multiple_option mt-3">
                                  <div className="row">
                                    <div className="col-md-7" >
                                      <>
                                        <div className="question" key={ind}>
                                          {ind + 1}) {qs?.question}
                                        </div>

                                        <label className="d-flex flex-column mt-2 mx-3">
                                          <textarea name="option" value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ border: '1pt solid lightgray', maxWidth: '40%' }} />
                                          <div className="mt-2">
                                            <button style={{ width: '10%' }} onClick={() => handleCheck(ind)}>Check</button>
                                            <span style={{ paddingLeft: '10px' }}>show Answer</span>
                                          </div>
                                        </label>
                                      </>

                                    </div>
                                    {check === ind &&
                                      <div className="col-md-5">
                                        <div className="right_question_block">
                                          <div className={qs.answers.some(s => s.option === answer) ? " on_option  " : option === "0" ? " of_option  " : "question_wrapper"} style={{ height: '100%' }}>
                                            <div className="question_corect">
                                              {qs.answers.some(s => s.option === answer) ? "Correct" : "Incorrect"}
                                            </div>
                                            <div className="explaination" >
                                              <span >{qs.answers.some(s => s.option === answer) ? qs?.correct_reason : qs?.incorrect_hint}</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>
                                    }

                                  </div>
                                </div>
                              ))
                              }
                            </div>

                          }


                          {
                            // d.images?.map((im: any, i: number) => (
                            item.key === "images" &&
                            <div className="table_section " >
                              <div className="table_heading">
                                <div className="heading_left">

                                  <h3>{item?.title}</h3>
                                </div>

                              </div>
                              <div className="content_image">
                                <img src={item?.value} className="image_show" alt="slected_image" />
                              </div>


                            </div>
                            // ))
                          }


                          {
                            // d.videos?.map((v: any, i: number) => (
                            item?.key === "videos" &&
                            <div className="table_section">
                              <div className="table_heading">
                                <div className="heading_left">
                                  <h3>{item?.title}</h3>
                                </div>

                              </div>
                              <div className="video_player">
                                <ReactPlayer url={item?.value} width="50%" height={300} />
                              </div>

                            </div>
                            // ))
                          }

                          {
                            // d.codes?.map((c: any, i: number) => (
                            item?.key === "codes" &&
                            <div className="code_block">
                              <div className="table_heading">
                                <div className="heading_left">

                                  <h4 style={{ paddingTop: '20px', fontSize: '16px' }}>{item?.value?.title}</h4>
                                </div>
                                <div className="heading_right">
                                  <div className="code_right">
                                    {/* <span className="code_heading">{item?.value?.language}</span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="code_instuction">
                                <span className="code_heading">{item?.value?.instruction}</span>

                              </div>


                              <div className="code_editor">
                                <div className="w-100 ">
                                  <span className="code_heading">
                                    <div dangerouslySetInnerHTML={{ __html: item?.value?.codes }} />
                                  </span>

                                </div>
                              </div>


                            </div>
                            // ))
                          }



                        </>
                      )
                    })
                    }



                  </div >

                </div>
              }

            </div>
          </div>
        </div>



      </section >
    </>

  );
};

export default withAuth(Home);


