import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
// import moment from "moment";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { Breadcrumb } from "react-bootstrap";
import Custumization from "../../../../src/components/instructor/custumization";
import ClassInfo from "../../../../src/components/instructor/Classinfo";
import AddInstructor from "../../../../src/components/instructor/addInstructor";
import ContactInfo from "../../../../src/components/instructor/ContactInfo";
import Review from "../../../../src/components/instructor/Review";
import Select from "../../../../src/components/instructor/SelectZybook";
// const options = ["one", "two", "three"];
import { FcCheckmark } from 'react-icons/fc'
import { addZybookCourseInput, saveStep } from "../../../../src/redux/actions/instructor/zybooks";

const Home: NextPage = () => {

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0);


  const [stepn, setStepn] = useState([
    { one: true },
  ]);

  const dispatch = useDispatch()



  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { zybooks } = useSelector((state: RootStateOrAny) => state)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });





  const stepChangeHandler = () => {
    debugger

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
    else if (step + 1 === 5) {
      setStepn([...stepn, { sx: true }])
    }

    setStep(step + 1);
    // let name = "step"
    // let value = step === 0 ? step : step + 1
    // dispatch(addZybookCourseInput({ name, value }))


  }

  // const [func, setFunc] = useState(
  //   [<
  //   ])

  console.log("stepn", stepn)



  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        {loading ? Small() :
          <div className="container">
            <div className="mt-4">
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} href="/en/instructor">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Lecture Details</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="adopt_wrapper">
              <div className="row">
                <div className="col-md-3">
                  <div className="adopt_left">
                    <ul>
                      <li>
                        <div className="adopt_left_list">
                          <div className="list_ul">
                            <h4 className={step === 0 && "left_heading"}>Select zyBooks</h4>
                            {stepn[1]?.tw ? <FcCheckmark /> : <p>Not done</p>}
                          </div>
                          {stepn[1]?.tw ?

                            <div className="course_container custumize">
                              <img src={zybooks?.firtCourse?.cover_image} alt="course_image" />
                              <h4>{zybooks?.firtCourse?.title}</h4>
                            </div>
                            : null}
                        </div>

                      </li>
                      <li>
                        <div className="adopt_left_list">
                          <div className="list_ul">
                            <h4 className={step === 1 && "left_heading"}>Customizations</h4>
                            <p>optional</p>
                          </div>
                          {stepn[2]?.th ?
                            zybooks?.courses.map((f) => (
                              <div className="course_container custumize mb-1">
                                <img src={f?.cover_image} alt="course_image" />
                                <h4>{f.title}</h4>
                              </div>
                            ))
                            : null}
                        </div>

                      </li>
                      <li>
                        <div className="adopt_left_list">
                          <div className="list_ul">
                            <h4 className={step === 2 && "left_heading"}>Class Info</h4>
                            {stepn[3]?.fr ? <FcCheckmark /> : <p>Not done</p>}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="adopt_left_list">
                          <div className="list_ul">
                            <h4 className={step === 3 && "left_heading"}>Instructors</h4>
                            {stepn[4]?.fv ? <FcCheckmark /> : <p>Not done</p>}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="adopt_left_list">
                          <div className="list_ul">
                            <h4 className={step === 4 && "left_heading"}>Contact Info</h4>
                            {stepn[5]?.sx ? <FcCheckmark /> : <p>Not done</p>}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="adoption_wrapper">
                    <div className="adopt_detail">

                      {step === 0 && <Select onStepChange={stepChangeHandler} />}
                      {step === 1 && <Custumization
                        onStepChange={stepChangeHandler}
                        onPrevStep={(step: any) => setStep(step)}
                        backText={"Select zyBook"}
                        step={1} />
                      }
                      {step === 2 && <ClassInfo
                        onStepChange={stepChangeHandler}
                        onPrevStep={(step: any) => setStep(step)}
                        backText={"Customize"}

                        step={2} />}
                      {step === 3 && <AddInstructor
                        onStepChange={stepChangeHandler}
                        onPrevStep={(step: any) => setStep(step)}
                        backText={"Class Information"}

                        step={3} />}
                      {step === 4 && <ContactInfo
                        onStepChange={stepChangeHandler}
                        onPrevStep={(step: any) => setStep(step)}
                        backText={"Add Instructor"}
                        step={4} />}
                      {step === 5 && <Review
                        onStepChange={stepChangeHandler}
                        onPrevStep={(step: any) => setStep(step)}
                        backText={"Contact Information"}
                        step={5} />}

                    </div>
                    <div className="delete_adopt">
                      <p>Cancel adoption</p>
                    </div>
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

export default withAuth(Home);


