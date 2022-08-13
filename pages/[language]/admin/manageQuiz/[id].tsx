import type { NextPage } from "next";
import Dropdown from "../../../../src/components/admin/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import { FiSearch } from "react-icons/fi";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import NewCourse from "../../../../src/components/admin/newCourse";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import { SweetAlert } from "../../../../src/function/hooks";
import { Breadcrumb, Spinner } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {

  // const intl = useIntl();


  const router = useRouter()


  const courseId = router.query.id
  const courseTitle = router.query.live
  const Title = router.query.title


  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });





  const [loading, setLoading] = useState(false)
  const [saveQuiz, setSaveQuiz] = useState(false)
  const [errors, setErrors] = useState([])
  const [newError , setNewError] = useState('')
  const [allQuiz, setAllQuiz] = useState([

  ])



  const Questions = () => {
    setAllQuiz([
      ...allQuiz,
      {
        question: '',
        options: [
          { option: "", correct: false, },

        ]
      },


    ])
  }



  useEffect(() => {
    let fetchQuiz = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//admin/courses/quiz/${courseId}`)
        if (res.data.response) {
          setAllQuiz(res.data.response.course_with_quiz.quiz)
          setLoading(false)

        }
        else {
          SweetAlert({ icon: "error", text: "something is wronge" })
        }

      } catch (error) {
        setLoading(false)

      }
    }
    fetchQuiz()
  }, [])



  const Addmore = (index: number) => {
    const list: any = [...allQuiz];
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        const element = list[i];
        element?.options.push({ name: "", correct: false, })
      }

    }
    setAllQuiz(list)
  }


  const removeInputFields = (index: number, i: number) => {


    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        let find = element.options
        find.splice(i, 1)
      }

    }
    setAllQuiz(list)

    if (errors) {
      let convert = errors ? Object?.values(errors) : {}
      const error: any = [...convert];
      for (let j = 0; j < convert.length; j++) {
        if (j === index) {
          const element = error[j];
          let find = element.options
          find.splice(i, 1)
        }

      }
      setErrors(Object.assign({}, error))
    }
  }

  const removeInputField = (index: number,) => {

    const rows = [...allQuiz];
    rows.splice(index, 1);
    setAllQuiz(rows);


    setAllQuiz(rows)
  }



  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.options[i][name] = value;
      }

    }
    setAllQuiz(list)

  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        for (let b = 0; b < element.options.length; b++) {
          let elements = element.options[b];
          if (elements.correct === "1") {
            elements.correct = "0"
          }
          element.options[i][name] = "1";
        }

      }

    }
    setAllQuiz(list)

  }

  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    list[index][name] = value;
    setAllQuiz(list);




  }


  const UpdateQuiz = async () => {
    let value = {
      course_id: courseId,
      questions: allQuiz
    }

    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//admin/courses/quiz/edit/question', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        SweetAlert({ icon: "success", text: res.data.message })
        if (courseTitle) {
          router.push('/en/admin/liveCourses')
        }
        else {
          router.push('/en/admin/courses')

        }
      }
      else {
        setErrors(res.data.error.questions)
        let check = res.data.error
          if(typeof check === "string"){
            setNewError(check)
          }
        setSaveQuiz(false)

      }

    } catch (error) {
      setSaveQuiz(false)

    }


  }





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
                      <Breadcrumb.Item linkAs={Link} href={courseTitle ? "/en/admin/liveCourses" : "/en/admin/courses"} >
                        {courseTitle ? "Live Courses" : "Courses"}
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Course : {courseTitle || Title} </Breadcrumb.Item>
                    </Breadcrumb>

                    {/* <Link href={"/en/admin/courses"} >
                      <h3 className="back-arrow">
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Manage Quiz</h3> */}
                  </div>
                  <div className=" jidfjsd-asjreid">

                  </div>
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads">
                        <button
                          className="upload-1 sdisad-dsdactive"
                          id="activetab"
                          onClick={() => Questions()}>
                          + Add more questions </button>
                        <button
                          className="upload-1 sdisad-dsdactive"
                          id="activetab"

                          onClick={() => UpdateQuiz()}>

                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          {saveQuiz ? <Spinner animation="border" /> :
                            "Save"
                          }
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="complete-web-1">

                  <div className="complete-web-1 mb-3" style={{ marginBottom: '60px' }} >

                    {allQuiz.length ? allQuiz?.map((q, index) => (
                      <div className="p-3 quiz" key={index} style={{ maxWidth: '30%', marginLeft: '20px' }}>
                        <div className="">
                          <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                            <label>Question : {index + 1}</label>
                            {(allQuiz.length !== 1) ? <div onClick={(e) => removeInputField(index)}> <i className="fa fa-trash mt-2"></i></div> : ""}
                          </div>
                          <input
                            type="text"
                            name="question"
                            style={errors && errors[index]?.question && { border: '1pt solid red' }}
                            className="w-100 input_criculum"
                            value={q.question}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Write here..." />
                          {errors && errors[index]?.question ? <div className="invalid mt-1">{errors[index]?.question}</div> : null}

                        </div>
                        {q.options.length ? q.options.map((op, i) => (
                          <>
                            <div
                              className=""
                              style={{ display: 'flex', marginTop: '10px' }} key={i}>
                              <div style={{ width: '10%' }}>
                                <input style={{ marginTop: '10px' }}
                                  onChange={(e) => handleChangeRadio(index, i, e)}
                                  checked={op.correct === "1"} name="correct" type="checkbox" />
                              </div>
                              <div className="input_fields">
                                <input
                                  type="text"
                                  name="option"
                                  style={errors && errors[index]?.options[i]?.option && { border: '1pt solid red' }}
                                  className="w-100 input_criculum"
                                  value={op.option}
                                  onChange={(e) => handleChangeOptions(index, i, e)}
                                  placeholder="Write here...." />

                                {errors && errors[index]?.options ? <div className="invalid mt-1 w-100">{errors && errors[index]?.options[i]?.option}</div> : null}
                              </div>
                              <div style={{ paddingTop: '5px', paddingLeft: '10px' }} onClick={() => removeInputFields(index, i)}>
                                <i className="fa fa-trash"></i>
                              </div>
                            </div>
                            {/* <p>+Add more </p> */}


                          </>
                        ))
                          :
                          <div className="ml-3">
                            {errors ? <div className="invalid mt-1">{errors[index]?.options}</div> : null}
                          </div>

                        }
                        {q.options.length < 6 ?
                          <p className="add-more"
                            onClick={() => Addmore(index)}
                          >+ Add more </p>
                          : ""
                        }
                        <div>
                          {newError ? <div className="invalid mt-1">{ newError}</div> : null}

                          {/* {errors && errors[0]?.options[0] ? <div className="invalid mt-1">{errors[0]?.options[0]}</div> : null} */}
                        </div>

                      </div>
                    ))
                      : <div>Quiz not avaliable </div>
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

export default AdminAuth(Home);
