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
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [loading, setLoading] = useState(true)
  const [saveQuiz, setSaveQuiz] = useState(false)
  const [message, setMessage] = useState(false)


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

  const [ques, setQues] = useState([
    {
      question: '',
      options: [
        { name: "one", option: "Option number 1", correct: false, },
        { name: "two", option: "Option number 2", correct: false },
        { name: "three", option: "Option number 3", correct: false },
        { name: "fort", option: "Option number 4", correct: false },
      ]
    }
  ])

  const Questions = () => {
    setQues([
      {
        question: '',
        options: [
          { name: "one", option: "Option number 1", correct: false, },
          { name: "two", option: "Option number 2", correct: false },
          { name: "three", option: "Option number 3", correct: false },
          { name: "fort", option: "Option number 4", correct: false },
        ]
      },
      ...ques,


    ])
  }
  const removeInputFields = (index: number) => {
    const rows = [...ques];
    rows.splice(index, 1);
    setQues(rows);
  }
  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...ques];
    list[index][name] = value;
    setQues(list);



  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...ques];

    // for (let i = 0; i < list.length; i++) {
    //   const element = list[i];
    //   if (index === i) {
    //     for (let j = 0; j < element.options.length; j++) {
    //       const elements = element.options[j];
    //       elements.correct = false
    //     }
    //   }
    // }

    // list[index].options[i].correct = true;
    // setQues(list);



  }


  const SaveQuiz = async () => {
    let value = {
      course_id: 1,
      questions: ques
    }
    setSaveQuiz(true )
    try {
      let res = await AxInstance.post('api//instructor/courses/quiz/store', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        setMessage(true)
      }

    } catch (error) {

    }


  }



  return (
    <div className="inst" style={{position:'relative'}}>
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="jcoiasd03-eakw3e1">
          <Sidebar />
        </div>
        {loading ? Main()
          :
          <div className="dash-board-1">
            {message ? <div className="alert alert-success">Quiz are Successfully Saved </div>
              :
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
                          <div style={{ marginLeft: '20px' }}>
                            <button className="btn-2s" onClick={() => SaveQuiz()}>Save Quiz</button>
                          </div>
                          {/* <div>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">In Review</button>
                        </Link>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="complete-web-1 mb-3" style={{ marginBottom: '60px' }} >
                    {/* <QuizCard /> */}

                    {ques && ques.map((q, index) => (
                      <div className="p-3 quiz" key={index}>
                        <div className="p-field  ">
                          <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                            <Icons name="i24" />
                            <label>Question : {index + 1}</label>
                            {(ques.length !== 1) ? <i className="fa fa-trash mb-2" onClick={() => removeInputFields(index)}>Delete</i> : ""}
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
                          <div className="inputGroup" key={i}>
                            <input id={op.option} onChange={(e) => handleChangeRadio(index, i, e)} checked={op.correct} name={op.name} type="radio" />
                            <label htmlFor={op.option}>{op.option}</label>
                          </div>

                        ))}
                      </div>
                    ))}


                  </div>

                </div>
              </div>
            }
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
