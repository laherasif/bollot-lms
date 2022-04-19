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
      if (currentStep !== quiz?.quiz?.length) {
        let answser = findIndx?.options?.find((i: any) => quizValue?.some((f: any) => f?.option_id == i?.id))
        if (answser) {
          setCurrentStep(currentStep + 1);
          setSelectedAns(answser?.option)

        }
        else {
          setCurrentStep(currentStep + 1);
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
    else {
      debugger
      setCurrentStep(--currentStep);
      let ans = findIndx?.options.find((i: any) => quizValue?.some((f: any) => i?.id == f?.option_id))
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
      if(res.data.success === true ){
        SweetAlert({ icon : "success" , text : res.data.message })
        router.push('/en/student/courses')
      }
      else{
        SweetAlert({ icon : "error" , text : "Please Atttempted all Question / Answer" })
        router.push('/en/student/courses')


      }

    } catch (error) {

    }
  }


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
                  <Link href="/en/student/courses">
                    <h3 style={{cursor:'pointer'}}>
                      <i className="fa fa-arrow-left"></i>
                      Back
                    </h3>
                  </Link>
                  <h3>My Quiz</h3>
                  <div className="complete-web-1">


                    <div className="seting-method-payment">
                      <div className="first-payment-1">

                        <div className="containers my-1">
                          <div className="question ">
                            <div className="py-2 h5">
                            {currentStep  === quiz?.quiz?.length ? " " :  <b>Q.{ currentStep + 1} {geneteRandom?.question}</b>}
                            </div>
                            {/* <form onSubmit={handleSubmit}> */}
                            {quiz?.quiz?.length ?
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
                            : <div>Quiz not found </div>
}

                            {/* </form> */}
                          </div>
                          <div className="d-flex align-items-center pt-3 justify-content-between">
                            {/* {currentStep > 0 ?
                              <div id="prev">

                                <button onClick={() => handleSubmit("prev")} className="btn btn-primary">Previous</button>{" "}
                              </div>
                              : ""
                            } */}
                            <div className="ml-auto mr-sm-5">
                              {" "}
                              <button onClick={() =>
                               {currentStep > quiz?.quiz?.length -1  ? QuizSubmit() :
                                handleSubmit("next")
                               }
                              } className="btn btn-success">
                                {currentStep > quiz?.quiz?.length -1    ?
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