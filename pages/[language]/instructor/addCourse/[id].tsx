import type { NextPage } from "next";
// import Dropdown from "../../../../src/components/instructor/dropdown";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
// import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import Chart from "../../../../src/components/instructor/chart";
// import Chart1 from "../../../../src/components/instructor/chart1";
// import BarChart from "../../../../src/components/instructor/barchart";
import Link from "next/link";
// import CourseCard from "../../../../src/components/instructor/CourseCard1";
// import NewCourse from "../../../../src/components/instructor/newCourse";
import { useEffect, useState, useCallback, useRef } from "react";
// import { RootStateOrAny, useSelector } from "react-redux";
// import axios from "axios";
import AddCourse from "../../../../src/components/instructor/addCourse";
import AddQuiz from "../../../../src/components/instructor/addQuiz";
import Criculum from "../../../../src/components/instructor/circulum";
import Previews from "../../../../src/components/instructor/preview";
import { Small } from "../../../../src/components/instructor/loader";
import { useDispatch } from "react-redux";
import { pageNo} from '../../../../src/redux/actions/instructor/addcourse'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({});
  const [steps, setSteps] = useState([
    { label: "Account Details", isValid: undefined },
    { label: "Personal Details", isValid: undefined },
    { label: "Payment Details", isValid: undefined },
    { label: "Payment Details", isValid: undefined },
  ]);
  const [stepn, setStepn] = useState([
    { one: true },
   
  ]);

  const [points, setPoints] = useState([
    'Add Course',   
    'Plane Your Course',   
    'Add Quiz',   
    'Add preview',   
  ]);
  const [courseId, setCourseId] = useState('');

  const myRef = useRef()
  const myCri = useRef()
  const myQuiz = useRef()
  const myPrev = useRef()

  const dispatch = useDispatch()


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  // const stepPages = [<AddCourse handleCourseId={(value: any) => setCourseId(value)} ref={myRef} />, <Criculum courseId={courseId} ref={myCri} />, <AddQuiz courseId={courseId} ref={myQuiz} />, <Previews courseId={courseId} ref={myPrev} />];

  // const lastStepIndex = steps.length - 1;
  // const isLastStep = lastStepIndex === step;
  // const isPreviousStepsValid =
  //   steps
  //     .slice(0, step)
  //     .findIndex((currentStep) => currentStep.isValid === false) === -1;

  // const onStepSubmit = useCallback(
  //   (event) => {
  //     event.preventDefault()
  //     const { isValid, values } = event;
  //     // if(step === 1){
  //     // }

  //     // const currentSteps = steps.map((currentStep, index) => ({
  //     //   ...currentStep,
  //     //   isValid: index === step ? isValid : currentStep.isValid,
  //     // }));
  //     // setSteps(currentSteps);

  //     // const currentStepn = stepn.map((currentStep, index) => ({
  //     //   ...currentStep,
  //     //   value: index === step ? true : currentStep.value,
  //     // }));

  //     // setStepn(currentStepn);
  //     if (step === 0) {
  //       let res = myRef.current.SaveCourse()
  //       if (!res) {
  //         setStep(() => Math.min(step + 1, lastStepIndex));
  //         console.log("res", res)
  //       }

  //     }
  //     else if (step === 1) {
  //       let res = myCri.current.SaveCriculum()
  //       if (!res) {
  //         setStep(() => Math.min(step + 1, lastStepIndex));
  //         console.log("res", res)
  //       }

  //     }
  //     else if (step === 2) {
  //       let res = myQuiz.current.UpdateQuiz()
  //       console.log("rs", res)
  //       if (res) {
  //         setStep(() => Math.min(step + 1, lastStepIndex));

  //       }

  //     }
  //     else if (step === 3) {
  //       let res = myPrev.current.SavePreview()
  //       if (res) {
  //         setStep(() => Math.min(step + 1, lastStepIndex));
  //         console.log("res", res)
  //       }

  //     }


  //     // setFormState(values);

  //     // if (isLastStep && isPreviousStepsValid && isValid) {
  //     //   alert(JSON.stringify(values));
  //     // }
  //   },
  //   [steps, isLastStep, isPreviousStepsValid, step, lastStepIndex]
  // );

  // const onPrevClick = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     setStep(() => Math.max(step - 1, 0));
  //   },
  //   [step, setStep]
  // );



  const stepChangeHandler = () => {

    
    
    if(step + 1  === 1 ){
      setStepn([...stepn , {tw :true }])
    }
    else if(step + 1  === 2 ){
      setStepn([...stepn , {th : true }])
    }
    else if( step + 1 === 3 ) {
      setStepn([...stepn , {fr : true }])
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
                  <Link href="/en/instructor/courses" >
                    <h3>
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>
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
                    <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5  p-0 mt-3 mb-2" style={{ width: '60%' }}>
                      <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                        <div id="msform">
                          {/* progressbar */}
                          <ul id="progressbar" style={{ padding: '0px 10%' }}>
                            <li className="active" id="account">
                              <strong>Add Course</strong>
                            </li>
                            <li className={stepn[1]?.tw  ? "active" : ''} id="personal">
                              <strong>Plan Your Course </strong>
                            </li>
                            <li className={stepn[2]?.th ? "active" : ''} id="payment">
                              <strong>Add Quiz</strong>
                            </li>
                            <li className={stepn[3]?.fr ? "active" : ''} id="confirm">
                              <strong>Add Preview</strong>
                            </li>
                          </ul>

                          <br /> {/* fieldsets */}
                          <fieldset>
                            <div style={{ textAlign: 'left' , padding:'0px 30px' }}>
                              {/* {stepPages[step]} */}
                              {step === 0 && <AddCourse
                                handleCourseId={(value: any) => setCourseId(value)}
                                onStepChange={stepChangeHandler}
                              // errors={errors}
                              />}
                              {step === 1  && <Criculum
                                courseId={courseId}
                                onStepChange={stepChangeHandler}
                                onPrevStep={(step:any) => setStep(step)}
                                step ={1}
                              // errors={errors}
                              />}
                              {step === 2 && <AddQuiz
                                courseId={courseId}
                                onStepChange={stepChangeHandler}
                                onPrevStep={(step:any) => setStep(step)}
                                step={2}
                              // errors={errors}
                              />}
                              {step === 3 && <Previews
                                courseId={courseId}
                                onStepChange={stepChangeHandler}
                                onPrevStep={(step:any) => setStep(step)}
                                step={3}
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

export default Home;
