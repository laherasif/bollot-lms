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
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = ["one", "two", "three"];
const Home: NextPage = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [section, setSection] = useState({})
  const [url, setUrl] = useState('')
  const [progressbar, setProgressbar] = useState()
  const [title, setTitle] = useState('')
  const [fileType, setFileType] = useState('')
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
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
        let res = await AxInstance.get(`api//instructor/courses/curriculum/lectures/${lectureId}`)
        if (res.data.success === true) {
          setLoading(false)
          const paramss = {
            Bucket: S3_BUCKET,
            Key: res.data.response.lecture.object_key
          };
          const url = myBucket.getSignedUrl('getObject', paramss);
          setSection(res.data.response.lecture)
          setUrl(url)

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
      console.log("Res" , res )

    }
    catch (err) {

    }
  }



  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        {loading ? Small() :
          <div className="container">
            <div className="mt-4">
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} href={`/en/instructor/courseDetail/${courseId}`}>Course Detail</Breadcrumb.Item>
                <Breadcrumb.Item active>Lecture Details</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="lecture_wrapper">
              <div className="lecture_container">
                <div className="lecture_left">
                  <div className="lecture_icon">
                    <BsExclamationLg />
                  </div>
                  <div className="lecture_text">
                    <h5>What is zyBooks ?</h5>
                    <p>new to zyBooks? Check out a short video to learn how zyBooks uses concise writing, interactive activitive, and research-backed approaches to help to help students learn.</p>
                  </div>
                </div>
                <div className="lecture_right">
                  <button>Watch Now</button>
                </div>
              </div>

              <div className="lecture_show">
                <div className="lecture_detail">
                  <h4>{section?.title}</h4>
                </div>

                <div className="lecture_edit_Dele">

                  {isEdit ?
                    <div className="upload_lecture">
                      <div className="form-group">
                        <label>Upload Lecture</label>
                        <br />
                        <label>lecture Title</label>
                        <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <label className="mt-3">Video / PDF </label>
                        <input type="file" name="file" onChange={handleChangeLectureFile} />
                      </div>
                      {progressbar === 100 ? "" :
                        <div className="mt-4">
                          {progressbar && <ProgressBar animated now={progressbar} />}
                        </div>
                      }
                    </div>
                    :
                    <div className="lecture_container">
                      <div className="lecture_data">
                        <h4>Instructor notes:</h4>
                        <p>{section?.title}</p>
                      </div>
                      <div className="lecture_Action">
                        <span>
                          <i className="fa fa-trash"></i>
                        </span>
                        <span onClick={() => setIsEdit(true)}>
                          <i className="fa fa-edit" ></i>
                        </span>
                      </div>
                    </div>
                  }
                  <div className="lecture_upload_btn mt-2">
                    <button className="save" 
                    onClick={() =>  EditCourse()}
                    disabled={progressbar === 100 ? false : true }>Save</button>
                    <button className="cancel">Cancel</button>
                  </div>
                </div>

                <div className="lecture_disply">
                  {section?.file_type === "Video" ?
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      preload="none"
                      pip={true}
                      playing={true}
                      controls
                      url={url}
                    />
                    : section?.file_type === "PDF" ?
                      <div >

                        <Document
                          file={url}
                          options={{ workerSrc: "/pdf.worker.js" }}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber} />
                        </Document>
                        <div style={{ textAlign: 'center' }}>
                          <p>
                            Page {pageNumber || (numPages ? 1 : "--")} of {numPages ? 1 : "--"}
                          </p>
                          <div className="umpire w-100 " >
                            <div className="umpire-1 ">
                              <div className="d-flex mb-3 justify-content-center w-100"  >
                                <button
                                  className="upload-1 sdisad-dsdactive "
                                  id="activetab"

                                  disabled={pageNumber <= 1}
                                  onClick={previousPage}
                                >
                                  Previous
                                </button>
                                <button
                                  className="upload-1 sdisad-dsdactive"
                                  id="activetab"

                                  disabled={pageNumber >= numPages}
                                  onClick={nextPage}
                                >
                                  Next
                                </button>
                              </div>

                            </div>
                          </div>


                        </div>
                      </div>





                      : null
                  }




                </div>

              </div >
            </div >

          </div >
        }






      </section >
    </div >

  );
};

export default withAuth(Home);


