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

  const [ques, setQues] = useState([
    {
      question: '',
      options: [
        { option: "", correct: false, }
      ]
    }

  ])

  const Questions = () => {
    setQues([
      {
        question: '',
        options: [
          { option: "", correct: false, },

        ]
      },
      ...ques,


    ])
  }

  const Addmore = (index: number) => {
    const list: any = [...ques];
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        const element = list[i];
        element?.options.push({ name: "", correct: false, })
      }

    }
    setQues(list)
  }


  const removeInputFields = (index: number) => {
    debugger

    const rows = [...ques];
    rows.splice(index, 1);
    setQues(rows);
  }


  
  const removeOptionFields = (index: number, i  : number ) => {

   
    const list: any = [...ques];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        let find  = element.options
        find.splice(i , 1 )
      }

    }
    setQues(list)
  }
  const handleChangeOptions = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...ques];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        element.options[i][name] = value;
      }

    }
    setQues(list)

  }

  const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...ques];
    for (let j = 0; j < list.length; j++) {
      if (j === index) {
        const element = list[j];
        for (let b = 0; b < element.options.length; b++) {
          let elements = element.options[b];
          if (elements.correct === true) {
            elements.correct = false
          }
          element.options[i][name] = true;
        }

      }

    }
    setQues(list)

  }

  let courseId = router.query.id


  const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const { name, value } = evnt.target;
    const list: any = [...ques];
    list[index][name] = value;
    setQues(list);



  }



  const SaveQuiz = async () => {
    let value = {
      course_id: courseId,
      questions: ques
    }
    try {
      setSaveQuiz(true)
      let res = await AxInstance.post('api//instructor/courses/quiz/store', value)
      if (res.data.success === true) {
        setSaveQuiz(false)
        setMessage(true)
        SweetAlert({ icon : "success" , text : "Quiz are successfuly created "})
        router.push('/en/instructor/courses')
      }
      else {
        setSaveQuiz(false)

        SweetAlert({ icon : "error" , text : "Quiz and options are required "})

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
                          <div style={{ marginLeft: '20px' }} className="idfadsf-sads">
                            <button className="upload-1 sdisad-dsdactive" onClick={() => SaveQuiz()}>Save Quiz</button>
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
                      <div className="p-3 quiz" style={{height:'410px'}} key={index}>
                        <div className="p-field  ">
                          <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                            <Icons name="i24" />
                            <label>Question : {index + 1}</label>
                            {(ques.length !== 1) ? <div onClick={(e) => removeInputFields(index)}> <i className="fa fa-trash mb-2"></i></div> : ""}
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
                                  checked={op.correct} name="correct" type="checkbox" />
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
                              <div style={{marginTop:'5px' , marginLeft:'10px'}} onClick={()=> removeOptionFields(index , i )}>
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
                    ))}


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
