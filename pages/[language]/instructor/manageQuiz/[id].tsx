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
import { useEffect, useState } from "react";
import { Main } from "../../../../src/components/instructor/loader";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { SweetAlert } from "../../../../src/function/hooks";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)
  const [saveQuiz, setSaveQuiz] = useState(false)
  const [message, setMessage] = useState(false)
  const [allQuiz, setAllQuiz] = useState([])

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

  let courseID = router.query.id


  useEffect(() => {
    let getQuiz = async () => {
      try {
        let res = await AxInstance.get(`api//instructor/courses/quiz/${courseID}`)
        console.log("RES", res)
        if (res.data.success === true) {
          setAllQuiz(res.data.response.course_with_quiz.quiz)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    getQuiz()
  }, [])

  const [ques, setQues] = useState([
    {
      question: '',
      options: [
        { option: "", correct: false, }
      ]
    }

  ])

  const Questions = () => {
    setAllQuiz([
      {
        question: '',
        options: [
          { option: "", correct: false, },

        ]
      },
      ...allQuiz,


    ])
  }

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
  }

  const removeInputField = (index: number,) => {

    const rows = [...allQuiz];
    rows.splice(index, 1);
    setAllQuiz(rows);


    setAllQuiz(rows)
  }



  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
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
    debugger
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
    debugger
    const { name, value } = evnt.target;
    const list: any = [...allQuiz];
    list[index][name] = value;
    setAllQuiz(list);



  }



  const UpdateQuiz = async () => {
    let value = {
      course_id: courseID,
      questions: allQuiz
    }
    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//instructor/courses/quiz/edit/question', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        setMessage(true)
        SweetAlert({ icon: "success", text: "Quiz are successfully updated" })
        router.push('/en/instructor/courses')
      }

    } catch (error) {

    }


  }



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
                    <h3>Quiz Management </h3>
                  </div>

                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="maxima ">
                        <div className="idfadsf-sads">
                          <button onClick={() => Questions()} className="upload-1 sdisad-dsdactive">
                            + Add More
                          </button>
                        </div>
                        {allQuiz && allQuiz.length ?
                          <div style={{ marginLeft: '20px' }} className="idfadsf-sads">
                            <button className="upload-1 sdisad-dsdactive" onClick={() => UpdateQuiz()}>Update Quiz</button>
                          </div>
                          : null
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <div className="complete-web-1 mb-3" style={{ marginBottom: '60px' }} >
                  {/* <QuizCard /> */}

                  {allQuiz && allQuiz.length ? allQuiz?.map((q, index) => (
                    <div className="p-3 quiz" key={index}>
                      <div className="p-field  ">
                        <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                          <Icons name="i24" />
                          <label>Question : {index + 1}</label>
                          {(allQuiz.length !== 1) ? <div onClick={(e) => removeInputField(index)}> <i className="fa fa-trash mb-2"></i></div> : ""}
                        </div>
                        <input
                          type="text"
                          name="question"
                          className="w-100"
                          value={q.question}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Write here..." />

                      </div>
                      {q.options.map((op, i) => (
                        <>
                          <div className="p-field" style={{ display: 'flex', marginTop: '10px' }} key={i}>
                            <div style={{ width: '20%' }}>
                              <input style={{ marginTop: '10px' }}
                                onChange={(e) => handleChangeRadio(index, i, e)}
                                checked={op.correct === "1"} name="correct" type="checkbox" />
                            </div>
                            <div style={{ width: '100%' }}>
                              <input
                                type="text"
                                name="option"
                                className="w-100"
                                value={op.option}
                                onChange={(e) => handleChangeOptions(index, i, e)}
                                placeholder="Write here...." />
                            </div>
                            <div style={{ paddingTop: '5px', paddingLeft: '10px' }} onClick={() => removeInputFields(index, i)}>
                              <i className="fa fa-trash"></i>
                            </div>
                          </div>
                          {/* <p>+Add more </p> */}


                        </>
                      ))}
                      {q.options.length < 6 ?
                        <h3 style={{ cursor: 'pointer', textAlign: 'right', fontSize: '14px', marginTop: '10px' }}
                          onClick={() => Addmore(index)}
                        >+ Add more </h3>
                        : ""
                      }
                    </div>
                  ))
                    : <div>Quiz not avaliable </div>
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
