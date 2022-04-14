import type { NextPage } from "next";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'
import axios from 'axios'
import { Small } from "../../../../src/components/student/loader";
const Home: NextPage = () => {
  // const intl = useIntl();

  const router = useRouter()

  const [quiz, setQuiz] = useState([])
  const [quizValue, setQuizValue] = useState<any>([])
  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  let [selectedAns, setSelectedAns] = useState("")



  const HendleChange = (e: any) => {
    setSelectedAns(e.target.value);



  }


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
      setLoading(true)
      let res = await AxInstance.get(`api//student/my-courses/quiz/${courseId}`)
      if (res.data.success === true) {
        setLoading(false)
        setQuiz(res.data.response.course_with_quiz)
      }
    }
    fetchQuiz()
  }, [router.query.id])



  const handleSubmit = (type: any) => {
    // e.preventDefault();
    let findIndx = Object.keys(quiz).length ? quiz.quiz[currentStep] : null

    if (type === "next") {
      if (currentStep !== quiz?.quiz?.length - 1) {
        let answser = findIndx?.options?.find((i: any) => quizValue?.some((f: any) => f?.option_id === i?.id))
        if (answser) {
          setCurrentStep(++currentStep);
          setSelectedAns(answser?.option)

        }
        else {
          setCurrentStep(++currentStep);
          setSelectedAns('')
          let question = findIndx?.id
          let ans = findIndx?.options?.find((i: any) => i.option === selectedAns)
          let value: any = {
            question_id: question,
            option_id: ans?.id
          }
          setQuizValue([...quizValue, value])
        }


      }
    }
    else if (currentStep > 0) {
      debugger
      setCurrentStep(--currentStep);
      let ans = findIndx?.options?.find((i: any) => quizValue.some((f: any) => i?.id === f?.option_id))
      setSelectedAns(ans?.option)

    }


  }

  const QuizSubmit = async () => {
    let value = {
      course_id: courseId,
      submission: quizValue
    }
    console.log("value", value)
    try {

      let res = await AxInstance.post('api//student/my-courses/quiz/submit', value)
      console.log("REa", res)

    } catch (error) {

    }
  }

  console.log("quiz", quizValue)

  let geneteRandom = quiz ? Object.keys(quiz).length && quiz.quiz[currentStep] : null

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
                  <h3>My Quiz</h3>
                  <div className="complete-web-1">


                    <div className="seting-method-payment">
                      <div className="first-payment-1">

                        <div className="containers my-1">
                          <div className="question ">
                            <div className="py-2 h5">
                              <b>Q.{currentStep + 1} {geneteRandom?.question}</b>
                            </div>
                            {/* <form onSubmit={handleSubmit}> */}
                            <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">

                              {geneteRandom?.options?.map((op: any, index: number) => (
                                <label className="options" key={index}>{op.option}
                                  <input type="radio"
                                    value={op.option}
                                    required
                                    checked={selectedAns === op.option}
                                    onChange={HendleChange}
                                    name="item" />
                                  <span className="checkmark" />
                                </label>
                              ))
                              }



                            </div>

                            {/* </form> */}
                          </div>
                          <div className="d-flex align-items-center pt-3 justify-content-between">
                            {currentStep > 0 ?
                              <div id="prev">

                                <button onClick={() => handleSubmit("prev")} className="btn btn-primary">Previous</button>{" "}
                              </div>
                              : ""
                            }
                            <div className="ml-auto mr-sm-5">
                              {" "}
                              <button onClick={() =>
                                // QuizSubmit() 
                                handleSubmit("next")
                              } className="btn btn-success">
                                {currentStep === quiz?.quiz?.length ?
                                  "Submit"
                                  :
                                  "Next"
                                }
                              </button>{" "}
                            </div>
                          </div>

                        </div>


                      </div>

                    </div>
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