import type { NextPage } from "next";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddCourse from "../../../../src/components/instructor/addCourse";
import AddQuiz from "../../../../src/components/instructor/addQuiz";
import AddPreQuiz from "../../../../src/components/instructor/addPreQuiz";
import Criculum from "../../../../src/components/instructor/circulum";
import Previews from "../../../../src/components/instructor/preview";
import { Small } from "../../../../src/components/instructor/loader";
import { Breadcrumb } from "react-bootstrap";
import withAuth from "../../../../src/components/Hoc/authRoute";
const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [stepn, setStepn] = useState([
    { one: true },

  ]);



  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])


  const stepChangeHandler = () => {



    if (step + 1 === 1) {
      setStepn([...stepn, { tw: true }])
    }
    else if (step + 1 === 2) {
      setStepn([...stepn, { th: true }])
    }
    else if (step + 1 === 3) {
      setStepn([...stepn, { fr: true }])
    }
    else if (step + 1 === 4) {
      setStepn([...stepn, { fv: true }])
    }

    setStep(step + 1);
    // dispatch(pageNo(step + 1))

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
                      <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item href="/en/instructor/courses">
                        Courses
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Add Course</Breadcrumb.Item>
                    </Breadcrumb>
                    <h3>Add New Courses</h3>
                  </div>

                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">

                  </div>
                </div>
                <div className="complete-web-1">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  p-0 mt-3 mb-2" >
                        <div className="card px-0 pt-4 pb-0 mt-3 form_card" >
                          <div id="msform">
                            {/* progressbar */}
                            <ul id="progressbar" >
                              <li className="active" id="account">
                                <strong>Add Course</strong>
                              </li>
                              <li className={stepn[1]?.tw ? "active" : ''} id="prequiz">
                                <strong>Add Pre Quiz</strong>
                              </li>
                              <li className={stepn[2]?.th ? "active" : ''} id="personal">
                                <strong>Plan Your Course </strong>
                              </li>
                              <li className={stepn[3]?.fr ? "active" : ''} id="payment">
                                <strong>Add Quiz</strong>
                              </li>
                              <li className={stepn[4]?.fv ? "active" : ''} id="confirm">
                                <strong>Add Preview</strong>
                              </li>
                            </ul>

                            <br /> {/* fieldsets */}
                            <fieldset>
                              <div className="course_padding">
                                {/* {stepPages[step]} */}
                                {step === 0 && <AddCourse
                                  // handleCourseId={(value: any) => setCourseId(value)}
                                  onStepChange={stepChangeHandler}
                                // errors={errors}
                                />}

                                {step ===  1 && <AddPreQuiz
                                  onStepChange={stepChangeHandler}
                                  onPrevStep={(step: any) => setStep(step)}
                                  step={1}
                                // errors={errors}
                                />}
                                {step === 2 && <Criculum
                                  onStepChange={stepChangeHandler}
                                  onPrevStep={(step: any) => setStep(step)}
                                  step={2}
                                // errors={errors}
                                />}
                                {step === 3 && <AddQuiz
                                  onStepChange={stepChangeHandler}
                                  onPrevStep={(step: any) => setStep(step)}
                                  step={3}
                                // errors={errors}
                                />}
                                {step === 4 && <Previews
                                  onStepChange={stepChangeHandler}
                                  onPrevStep={(step: any) => setStep(step)}
                                  step={4}
                                // errors={errors}
                                />}

                              </div>
                            </fieldset>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        }
      </section>
    </div>
  );
};

export default withAuth(Home);
