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
// import Chart from "../../../../src/components/chart";
// import Chart1 from "../../../../src/components/chart1";
// import BarChart from "../../../../src/components/barchart";
import Link from "next/link";
// import instance from "../../../../src/confiq/axios/instance";
import axios from 'axios'
import QuizCard from "../../../../src/components/instructor/quiz";
// import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Main } from "../../../../src/components/instructor/loader";
import { Spinner, ProgressBar } from "react-bootstrap";
import { useRouter } from "next/router";
const options = ["one", "two", "three"];
const S3_BUCKET = 'bolloot';
const REGION = 'us-east-1';
import AWS from 'aws-sdk'
import { SweetAlert } from "../../../../src/function/hooks";


AWS.config.update({
  accessKeyId: "AKIA5CYBVB45T33ZHF6Y",
  secretAccessKey: "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",
});

const CREDENTIAL = {
  accessKeyId: "AKIA5CYBVB45T33ZHF6Y",
  secretAccessKey: "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",
};

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0);
  const [thumb, setTumb] = useState();

  const [saveQuiz, setSaveQuiz] = useState(false)
  const [message, setMessage] = useState(false)
  const [section, setSection] = useState([
    {
      title: '',
      lectures: [
        { title: "", file_type: '', file_url: 'http://www.bollot.com', },

      ]

    }
  ])
  const [section2, setSection2] = useState([
    {
      title: '',
      lectures: [
        { title: '', file: '', thumbnail: '', progressbar: 0 }
      ]

    }
  ])

  const inputFile = useRef(null)

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  let courseID = Number(router.query.id)



  useEffect(() => {
    let getQuiz = async () => {
      try {
        let res = await AxInstance.get(`api//instructor/courses/curriculum/get/${courseID}`)
        if (res.data.success === true) {
          setSection2(res.data.response.sections)
          setSection(res.data.response.sections)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    getQuiz()
  }, [courseID])

  const [ques, setQues] = useState([
    {
      question: '',
      options: [
        { option: "", correct: false, }
      ]
    }

  ])

  const AddmoreSection = () => {
    setSection([
      ...section,
      {
        title: '',
        lectures: [
          { title: "", file_type: '', file_url: 'http://www.bollot.com', },

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


  const generateVideoThumbnail = (file: File) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");

      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        let ctx: any = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };
  console.log("progress", progress)


  const handleChangeLectureFile = async (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name } = evnt.target;
    const file = evnt.target.files[0]
    if (file.type === "video/mp4") {
      const thumbnail: any = await generateVideoThumbnail(file);


      const params = {
        ACL: 'private',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      };




      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err, data) => {
          if (err) console.log(err);
        })


      const list: any = [...section2];
      for (let j = 0; j < list.length; j++) {
        if (j === index) {
          const element = list[j];
          element.lectures[i].thumbnail = thumbnail;
          element.lectures[i][name] = file;
          element.lectures[i].progressbar = progress;

        }

      }
      setSection2(list)

      const lists: any = [...section];
      for (let j = 0; j < lists.length; j++) {
        if (j === index) {
          const element = lists[j];
          element.lectures[i][name] = file.type === "video/mp4" ? "Video" : "";

        }

      }
      setSection(lists)


    }
    else{

      
      const params = {
        ACL: 'private',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      };




      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err, data) => {
          if (err) console.log(err);
        })


      const list: any = [...section2];
      for (let j = 0; j < list.length; j++) {
        if (j === index) {
          const element = list[j];
          element.lectures[i][name] = file;
          element.lectures[i].progressbar = progress;

        }

      }
      setSection2(list)

      const lists: any = [...section];
      for (let j = 0; j < lists.length; j++) {
        if (j === index) {
          const element = lists[j];
          element.lectures[i][name] = file.type !== "video/mp4" ? "PDF" : "";

        }

      }
      setSection(lists)



    
    }

  }
  






  const AddmoreLecture = (index: number) => {
    const list: any = [...section];
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        const element = list[i];
        element?.lectures.push({ title: "", file: '' })
      }

    }
    setSection(list)
  }







  const Addmore = (index: number,) => {
    debugger
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
        const elements = lists[i];
        elements?.lectures.push({ title: "", file_type: '', file_url: 'https://www.bollot.com' })
      }

    }
    setSection(lists)

  }



  const removeInputFields = (index: number, i: number) => {


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
        const element = lists[j];
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



  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...section];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.lectures[i][name] = value;
      }

    }
    setSection(list)

    const lists: any = [...section2];
    for (let j = 0; j < lists.length; j++) {
      if (j === index) {
        const element = lists[j];
        element.lectures[i][name] = value;
      }

    }
    setSection2(lists)

  }



  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...section];
    list[index][name] = value;
    setSection(list);

    const lists: any = [...section2];
    lists[index][name] = value;
    setSection2(lists);



  }



  const UpdateQuiz = async () => {
    let value = {
      course_id: courseID,
      sections: section
    }
    console.log("sections", value)
    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//instructor/courses/curriculum/section/update', value)
      console.log("REs", res)
      if (res.data.success === true) {
        setSaveQuiz(false)
        setMessage(true)
        SweetAlert({ icon: 'success', text: "Criculum Created" })

        router.push('/en/instructor/courses')
      }
      else {
        setSaveQuiz(false)
        SweetAlert({ icon: 'error', text: "Please fill all fields " })

      }

    } catch (error) {
      setSaveQuiz(false)
      SweetAlert({ icon: 'error', text: "Server Error" })

    }


  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };



  return (
    <div className="inst" style={{ position: 'relative' }}>
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="jcoiasd03-eakw3e1">
          <Sidebar />
        </div>
        {loading ? Main()
          :
          <div className="dash-board-1">

            <div className="dash-2 ">
              <div className="my-course" style={{ position: 'relative' }}>
                <div className="hdsf0s-sadmsa">
                  <div>
                    <Link href="/en/instructor/courses">
                      <h3 style={{ cursor: 'pointer' }}>
                        <i className="fa fa-arrow-left"></i>
                        Back
                      </h3>
                    </Link>
                    <h3>Criculum Management </h3>
                  </div>

                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="maxima ">
                        <div className="idfadsf-sads">
                          <button onClick={() => AddmoreSection()} className="upload-1 sdisad-dsdactive">
                            + Add More
                          </button>
                        </div>
                        {/* <div>
                          <Link href="/en/instructor/preview">
                          <button className="upload-1">Preview</button>
                          </Link>
                        </div> */}
                        {section2 && section2?.length ?
                          <div style={{ marginLeft: '20px' }} >
                            <button className="upload-1 " onClick={() => UpdateQuiz()}>Update Criculum</button>
                          </div>
                          : ''}

                      </div>
                    </div>

                  </div>
                </div>
                <div className="complete-web-1 mb-3" style={{ marginBottom: '60px' }} >
                  {section2 && section2?.length ? section2.map((sec: any, index: number) => (
                    <>
                      <div className="drop-box mb-3 " style={{ width: '30%' }} key={index}>
                        <div className="p-field  ">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <Icons name="i24" />
                              <label>Section Title</label>
                            </div>
                            {sec?.length !== -1 && <div onClick={() => removeInputField(index)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}

                          </div>
                          <input
                            type="text"
                            name="title"
                            value={sec.title}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Write here..." />

                        </div>
                        {sec.lectures.map((lec: any, i: number) => (
                          console.log("lec", lec),
                          <div className="drop-box " style={{ marginTop: '10px' }} key={i}>
                            <div className="kvjadsd-j43rm">
                              <div className="jodsa-wnedas">
                                <h6>Lectures</h6>
                              </div>
                              <Icons name="i26" />
                            </div>

                            <div className="p-field  ">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                  <Icons name="i24" />
                                  <label>Title</label>
                                </div>
                                {lec?.length !== -1 && <div onClick={() => removeInputFields(index, i)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></div>}
                              </div>
                              <input
                                type="text"
                                name="title"
                                value={lec.title}
                                onChange={(e) => handleChangeOptions(index, i, e)}
                                placeholder="Write here..." />

                            </div>


                            <div className="mt-3" style={{ cursor: 'pointer' }}>
                              <label>Video / PDF file for this Lecture</label>
                              {/* {progress}% */}
                              <div className="drop-box" style={{ marginTop: '5px' }}>
                                <div className="kvjadsd-j43rm iasdufhvs-ernd " onClick={onButtonClick}>
                                  <Icons name="i29" />
                                  {lec.thumbnail ? <img src={lec.thumbnail} alt="course_img" style={{ width: '100%', objectFit: 'cover' }} /> : ""}
                                  {<p>Drag file here / Choose file</p>}
                                </div>
                                <input type="file" ref={inputFile} accept="audio/*,video/*" name="file_type" onChange={(e) => handleChangeLectureFile(index, i, e)} id="img" style={{ display: 'none' }} />
                              </div>
                              <div className="mt-2">
                                {lec.progress === 100 ? " "
                                  :
                                  <ProgressBar animated now={lec.progressbar} />}
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
                        <h3 style={{ cursor: 'pointer', fontSize: '14px', textAlign: 'right', marginTop: '10px' }} onClick={() => Addmore(index)} >+ Add more lectures </h3>


                      </div>
                    </>
                  ))
                    : <div>Not Found </div>
                  }

                </div>

              </div>
            </div>
          </div>
        }
      </section>
      {
        saveQuiz &&
        <div style={{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', opacity: '1', textAlign: 'center', top: 0, left: 0, right: 0, bottom: 0, zIndex: '999' }}>
          <div style={{ marginTop: '20rem', zIndex: '9999' }}>
            <Spinner animation="border" variant="primary" />
          </div>

        </div>
      }
    </div>
  );
};



export default withAuth(Home);
