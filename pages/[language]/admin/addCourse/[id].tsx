import type { NextPage } from "next";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import AddCourse from "../../../../src/components/admin/addCourse";
import AddQuiz from "../../../../src/components/admin/addQuiz";
import Criculum from "../../../../src/components/admin/circulum";
import Previews from "../../../../src/components/admin/preview";
import { Small } from "../../../../src/components/admin/loader";
import { useRouter } from "next/router";
import instance from "../../../../src/confiq/axios/instance";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
 
  const [stepn, setStepn] = useState([
    { one: true },
   
  ]);

 
  // const [courseId, setCourseId] = useState('');

  const router = useRouter()
  const id = router.query.id

   useEffect(() => {
     let fetchCourse = async () => {
       let res = await instance.get(`api//admin/courses/${id}`)
     }
     fetchCourse()
   },[id])

 



  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])





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
                  <Link href="/en/admin/courses" >
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
                                onStepChange={stepChangeHandler}
                                onPrevStep={(step:any) => setStep(step)}
                                step ={1}
                              // errors={errors}
                              />}
                              {step === 2 &&
                               <AddQuiz
                                onStepChange={stepChangeHandler}
                                onPrevStep={(step:any) => setStep(step)}
                                step={2}
                              // errors={errors}
                              />}
                              {step === 3 &&
                               <Previews
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
