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
import { Breadcrumb } from "react-bootstrap";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = ["one", "two", "three"];
const Home: NextPage = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState({})
  const [url, setUrl] = useState('')
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
                      <Document
                        file={url}
                        options={{ workerSrc: "/pdf.worker.js" }}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                      : null
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

export default withAuth(Home);


