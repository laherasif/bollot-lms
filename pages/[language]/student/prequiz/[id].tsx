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
import { Spinner, Table } from "react-bootstrap";
const Home: NextPage = ({course_Id}:any ) => {
  // const intl = useIntl();

  const router = useRouter()

  const [quiz, setQuiz] = useState([])
  const [quizResult, setQuizResult] = useState<any>([])
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
        let res = await AxInstance.get(`api//student/my-courses/quiz/${course_Id}/1`)
        let resResult = await AxInstance.post(`api//student/my-courses/quiz/results/1`, { course_id: course_Id })
        if (res.data.success === true) {
          setLoading(false)
          setQuiz(res.data.response.course_with_quiz)
          setQuizResult(resResult.data.response.results)
        }
      }
      catch (err) {
        SweetAlert({ icon: "error", text: ' Network Error ' })
      }
    }
    fetchQuiz()
  }, [course_Id])






  const handleSubmit = (e: React.FormEvent<EventTarget>, questionId: number, answer: string) => {
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
      course_id: course_Id,
      submission: answers
    }
    try {
      let res = await AxInstance.post('api//student/my-courses/quiz/submit/1', value)
      if (res.data.success === true) {
        setInfo(res.data.message)
      }
      else {
        SweetAlert({ icon: "error", text: "Please Atttempted all Question / Answer" })
        router.push('/en/student/courses')

      }

    } catch (error) {
      SweetAlert({ icon: "error", text: error })

    }
  }

  if (answers && answers.length > 0 && quiz?.quiz?.length > 0 && answers.length === quiz?.quiz?.length) {
    QuizSubmit()
  }






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


                  <div className="alert alert-danger">
                    Please Attempted Pre Quiz for access to Cricculum 
                  </div>

                  <div className='quiz-info'>
                    <div className="d-flex justify-content-between">
                    { quiz &&  <h3>Title : {quiz?.title} </h3> }
                      {
                        quiz?.quiz?.length > 0 ?
                          <>
                            <h3>Total Questions : {quiz?.quiz?.length}  </h3>
                            <h3>Attempt Questions : {currentStep + 1} </h3>

                          </>
                          : null
                      }
                    </div>

                  </div>
                  <div className="complete-web-1">
                    {quiz?.quiz?.length ?
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

                  {quizResult && quizResult.length ?
                    <div>
                      <div className="mt-3">
                        <h3>Quiz Results</h3>

                        <Table responsive="md" >
                          <thead>
                            <tr>
                              <th>Attempt Questions</th>
                              <th>Correct Answers</th>
                              <th>Percantage</th>

                            </tr>

                          </thead>
                          <tbody >
                            {quizResult && quizResult.map((item:any ) => (
                              <tr style={{ cursor: 'pointer' }} key={item.id}>
                                <td>
                                  {item.out_of}
                                </td>
                                <td>
                                  {item.correct_answers}
                                </td>
                                <td>
                                  {item.percent}
                                </td>
                              </tr>

                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    : null}
                </div>

              }
            </div>
          </div>
        </div>
      </section>




    </>
  )
}

// export const getServerSideProps = async ({params}: any) => {

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