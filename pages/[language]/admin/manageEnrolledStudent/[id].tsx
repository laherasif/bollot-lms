import type { NextPage } from "next";
import Dropdown from "../../../../src/components/admin/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/admin/TopNavbar";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Chart from "../../../../src/components/admin/chart";
import Chart1 from "../../../../src/components/admin/chart1";
import BarChart from "../../../../src/components/admin/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import NewCourse from "../../../../src/components/admin/newCourse";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import EnrolledStudent from "../../../../src/components/admin/EnrolledStudent";
import moment from "moment";
import { useRouter } from "next/router";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state: RootStateOrAny) => state?.admin?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  let router = useRouter()
  let courseId = router.query.id

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.post('api//admin/courses/stundets-enrolled', { course_id: courseId })
        let quizResult = await AxInstance.post('api//admin/courses/quiz/results', { course_id: courseId })
        if (res.data.response.students.length) {
          setLoading(false)
          setCourse(res.data.response.students)
          setQuiz(quizResult.data.response.results)
        }
        else {
          setLoading(false)

        }
      }
      catch (err) {
        setLoading(false)

      }
    }
    fetchCourse()
  }, [courseId])

  console.log("qiz", quiz)

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
                    <Link href="/en/admin/" >
                      <h3>
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Enrolled Student  </h3>
                  </div>
                  
                </div>

                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      

                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  <EnrolledStudent course={course} />
                </div>

                <div className="back-btn">

                  <h3>Quiz Results </h3>
                </div>

                { }

                <div className="hjsaisa-sdnjassd jsdif-dsndawje w-100">
                  {quiz && quiz ? quiz?.map((q: any, index: number) => {
                    if (index === 0)
                      return (
                        <div className="first-rev-sec p-3" >
                          <div className="rev-img pb-41 w-100" style={{ justifyContent: 'center', maxWidth: '90%' }}  >
                            <img src={q?.user?.image || "/assets/images/first-sec.svg"} alt="" style={{ width: '25%', height: '25%' }} />
                          </div>
                          <h3 className="text-center">{q?.user?.fullname || "Your Name"}</h3>
                          <div className="p-3">
                            <div className="d-flex justify-content-between">
                              <h3>Correct Answers</h3>  <h3>{q?.correct_answers} / {q?.out_of} </h3>

                            </div>
                            <div className="d-flex justify-content-between " style={{ alignItems: 'center' }}>
                              <h3>Attempted Time</h3> {moment(q?.createdAt).format("ll") || 0}
                              {/* <p>Attempted Time : {moment(q?.createdAt).format("ll") || 0}</p> */}
                            </div>
                          </div>
                        </div>
                      )
                  })
                    : <div>Course Quiz not found </div>
                  }


                </div>


              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default Home;
