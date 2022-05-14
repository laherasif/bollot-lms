import type { NextPage } from "next";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'
import axios from 'axios'
import { Small } from "../../../../src/components/student/loader";
import Link from "next/link";
import { SweetAlert } from "../../../../src/function/hooks";
import Card from "../../../../src/components/student/quizCard";
import { Spinner } from "react-bootstrap";
const Home: NextPage = () => {
  // const intl = useIntl();

  const router = useRouter()

  const [quiz, setQuiz] = useState([])
  const [quizValue, setQuizValue] = useState<any>([])
  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)
  let [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswer] = useState([])
  const [info, setInfo] = useState("")






  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  let courseId = router.query.id


  useEffect(() => {
    let fetchQuiz = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/my-courses/quiz/${courseId}`)
        console.log("res", res)
        if (res.data.success === true) {
          setLoading(false)
          setQuiz(res.data.response.course_with_quiz)
        }
      }
      catch (err) {
        SweetAlert({ icon: "error", text: ' Network Error ' })
      }
    }
    fetchQuiz()
  }, [courseId])



  // const handleSubmit = (type: any) => {
  //   // e.preventDefault();
  //   let findIndx = Object.keys(quiz).length ? quiz.quiz[currentStep] : null

  //   if (type === "next") {
  //     if (currentStep !== quiz?.quiz?.length) {
  //       let answser = findIndx?.options?.find((i: any) => quizValue?.some((f: any) => f?.option_id == i?.id))
  //       if (answser) {
  //         setCurrentStep(currentStep + 1);
  //         setSelectedAns(answser?.option)

  //       }
  //       else {
  //         setCurrentStep(currentStep + 1);
  //         setSelectedAns('')
  //         let question = findIndx?.id
  //         let ans = findIndx?.options?.find((i: any) => i.option === selectedAns)
  //         let value: any = {
  //           question_id: question,
  //           option_id: ans?.id
  //         }
  //         setQuizValue([...quizValue, value])
  //       }


  //     }
  //   }
  //   else {
  //     debugger
  //     setCurrentStep(--currentStep);
  //     let ans = findIndx?.options.find((i: any) => quizValue?.some((f: any) => i?.id == f?.option_id))
  //     setSelectedAns(ans?.option)

  //   }


  // }
  console.log("anser", answers)


  const handleSubmit = (e: React.FormEvent<EventTarget>, questionId: number, answer: string) => {
    let arr = []
    e.preventDefault();
    setAnswer([
      ...answers,
      { question_id: questionId, option_id: parseInt(answer) }
    ])
    let len = quiz?.quiz.length - 1
    if (currentStep !== len) {
      setCurrentStep(++currentStep);
    }
    else {
      setShowResult(true);

    }

  }





  const handleBack = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (currentStep !== quiz.length - 1) {
      setCurrentStep(--currentStep);
    }
    else {
      setShowResult(true);
    }


  }


  const QuizSubmit = async () => {
    let value = {
      course_id: courseId,
      submission: answers
    }
    try {
      let res = await AxInstance.post('api//student/my-courses/quiz/submit', value)
      if (res.data.success === true) {
        // SweetAlert({ icon: "success", text: res.data.message })
        // router.push('/en/student/courses')
        setInfo(res.data.message)
      }
      else {
        SweetAlert({ icon: "error", text: "Please Atttempted all Question / Answer" })
        router.push('/en/student/courses')

      }

    } catch (error) {

    }
  }

  if (answers && answers.length > 0  &&  quiz?.quiz?.length > 0 && answers.length === quiz?.quiz?.length) {
    QuizSubmit()
  }


  console.log("quiz", quiz)




  return (
    <>

      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">
                  <Link href="/en/student/courses">
                    <h3 style={{ cursor: 'pointer' }}>
                      <i className="fa fa-arrow-left"></i>
                      Back
                    </h3>
                  </Link>
                  {/* <h3>My Quiz</h3> */}

                  <div className='quiz-info'>
                    <div className="d-flex justify-content-between">
                      <h3>Title : {quiz?.title} </h3>
                      <h3>Total Questions : {quiz?.quiz?.length}  </h3>
                      <h3>Attempt Questions : {currentStep + 1} </h3>
                    </div>

                  </div>
                  <div className="complete-web-1">
                  { quiz?.quiz?.length ? 
                       quiz && quiz?.quiz?.length && !showResult ?
                        <Card
                          options={quiz?.quiz[currentStep]?.options}
                          question={quiz?.quiz[currentStep]?.question}
                          callback={handleSubmit}
                          callprev={handleBack}
                          totalQuestion={quiz?.quiz.length}
                          questionId={quiz?.quiz[currentStep]?.id}
                          curruntQuestion={currentStep}
                        />
                        :
                        <div className='info-container'>
                          {info ?
                            info
                            :
                            <div className="info-spinner">
                              <Spinner animation="border" />
                            </div>
                          }
                        </div>
                    : <div> Quiz not uploaded yet </div>}

                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>




    </>
  )
}

// export const getServerSideProps = async ({ params }: any) => {

//   const res = await instance.get(
//     `api//courses/${params.id}`,
//   );
//   return {
//     props: {
//       Course: res.data.response.course,
//     },
//   };
// };


export default Home