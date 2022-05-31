import { Carousel, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import ReactPlayer from "react-player";
import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';
import { S3_BUCKET, myBucket } from '../../confiq/aws/aws'
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default ({ lectures, CourseId }: any) => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [errors, setErorrs] = useState(false);
  const [played, setPlayed] = useState(0)
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    GetLect(lectures[index]?.object_key)
  };

  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const countTime = async () => {
    try {

      let value = {
        course_id: CourseId,
        course_section_lecture_id: lectures[index].id,
        minutes: 1
      }
      let res = await AxInstance.post('api//student/my-courses/progress/record', value)
      if (res.data.error) {
        setErorrs(true)
      }



    } catch (error) {

    }
  }


  const [intervalID, setInterID] = useState(); // created a useState for intervalID

  useEffect(() => {
    if (errors === false) {
      let letintervalID = setInterval(() => {
        countTime()
      }, 60000);
      setInterID(letintervalID); // took letintervalID and stored it in useState intervalID
    } else if (errors === true) {
      console.log("clearInterval stop!");
      clearInterval(intervalID);
    }
  }, [errors]);



  useEffect(() => {

    const paramss = {
      Bucket: S3_BUCKET,
      Key: lectures[0]?.object_key
    };
    try {
      const url = myBucket.getSignedUrl('getObject', paramss);
      setValue(url)
    }
    catch (err) {

    }
  }, [lectures])



  const GetLect = (link: any) => {

    const paramss = {
      Bucket: S3_BUCKET,
      Key: link
    };
    try {
      const url = myBucket.getSignedUrl('getObject', paramss);
      setValue(url)
    }
    catch (err) { }
  }

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess(numPages: number) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }



  return (
    <>
      <div className="videos-title">
        <div>
          <h4>
            <>
              Title : {lectures[index].title}
              {/* <span>
                {lectures[index]?.is_completed  &&
                  <>
                    <i style={{ color: 'green' }} className="fa fa-check-circle"></i>
                  </>
                  }
              </span> */}
            </>
          </h4>
        </div>
        <div>
          Lectures : {index + 1} / {lectures.length}
        </div>
      </div>

      {lectures.some((s: any) => s.file_type === "Video") && lectures.length === 1 ?

        lectures.length && lectures?.map((lec: any, i: number) => (

          <ReactPlayer
            width="100%"
            height="100%"
            preload="none"
            playing={lectures[index].id === lec.id ? true : false}
            controls
            url={value} />
        ))
        : lectures.some((s) => s.file_type === "Video") && lectures.length > 1 ?
          <Carousel activeIndex={index} interval={null} indicators={false} onSelect={handleSelect}>
            {
              lectures.length && lectures?.map((lec: any, i: number) => (

                <Carousel.Item key={i} style={{ width: '100%' }}>
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    preload="none"
                    pip={true}
                    playing={lectures[index].id === lec.id ? true : false}
                    controls
                    url={value} />

                </Carousel.Item>

              ))
            }
          </Carousel>

          : lectures.some((s) => s.file_type === "PDF") && lectures.length > 1 ?
            <Carousel activeIndex={index} interval={null} indicators={false} onSelect={handleSelect}>
              {lectures.length && lectures?.map((lec: any, i: number) => (
                <Carousel.Item style={{ width: '100%' }}>
                  <div style={{ textAlign: '-webkit-center' }}>

                    <Document
                      file={value}
                      options={{ workerSrc: "/pdf.worker.js" }}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                    <div style={{ textAlign: 'center' }}>
                      <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                      </p>
                      <div className="umpire w-100 " >
                        <div className="umpire-1 umpire-1-cst  mt-3 ">
                          <div className="d-flex mb-3 maxima d-flex justify-content-center">
                            <button
                              className="upload-1 sdisad-dsdactive "
                              disabled={pageNumber <= 1} onClick={previousPage}
                            >
                              Previous
                            </button>
                            <button
                              className="upload-1 sdisad-dsdactive"
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
                </Carousel.Item>
              ))
              }
            </Carousel>

            :
            lectures.length === 1 && lectures?.map((lec: any, i: number) => (
              <div style={{ textAlign: '-webkit-center' }}>

                <Document
                  file={value}
                  options={{ workerSrc: "/pdf.worker.js" }}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <div style={{ textAlign: 'center' }}>
                  <p>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                  </p>
                  <div className="umpire w-100 " >
                    <div className="umpire-1 umpire-1-cst  mt-3 ">
                      <div className="d-flex mb-3 maxima d-flex justify-content-center">
                        <button
                          className="upload-1 sdisad-dsdactive "
                          disabled={pageNumber <= 1} onClick={previousPage}
                        >
                          Previous
                        </button>
                        <button
                          className="upload-1 sdisad-dsdactive"
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
            ))


      }


    </>
  );
}
