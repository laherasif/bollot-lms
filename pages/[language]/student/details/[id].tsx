import type { NextPage } from "next";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar2 from "../../../../src/components/student/NavigationBar2";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import CriculumCard from '../../../../src/components/student/criculumCard'
import Link from "next/link";
import { SweetAlert } from "../../../../src/function/hooks";
import CricculumSidebar from "../../../../src/components/student/cricculumSidebar";
import { Small } from "../../../../src/components/student/loader";
import { getCourseLecture } from "../../../../src/redux/actions/student/courses";
import Prequiz from "../prequiz";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [courseId, setCourseId] = useState('')
  const [courselectures, setCourseLectures] = useState({})
  const [loading, setLoading] = useState(false)
  const [checkPreQuiz, setCheckPreQuiz] = useState([])

  const router = useRouter()

  const dispatch = useDispatch()


  let courseTitle = router.query.id
  const { token } = useSelector((state: RootStateOrAny) => state.userReducer)
  const { Lectures } = useSelector((state: RootStateOrAny) => state.studentCourse)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });






  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/my-courses/${courseTitle}`)
        if (res.data.success === true) {
          // setSections(res.data.response.course)
          dispatch(getCourseLecture(res.data.response.course))
          setCourseId(res.data.response.course?.id)
          setLoading(false)

        }
        else {
          setLoading(false)
        }

      } catch (error) {
        SweetAlert({ icon: "error", text: error })

      }

    }
    fetchCourse()
  }, [courseTitle])


  useEffect(() => {
    let fetchQuizResult = async () => {
      try {
        let res = await AxInstance.post(`api//student/my-courses/quiz/results/1`, { course_id: courseId })
        if (res.data.success === true) {
          setCheckPreQuiz(res.data.response.results)
        }
      }
      catch (err) {
        SweetAlert({ icon: 'error', text: err })
      }
    }
    if (courseId) {
      fetchQuizResult()
    }
  }, [courseId])




  if (checkPreQuiz.length == 0) {
    // return (router.push(`/en/student/prequiz/${courseId}`))
    return <Prequiz course_Id={courseId} />
  }
  else {

    return (
      <>
        <NavigationBar2 />


        {loading ? Small() :
          <section className="dash-board">
            <div className="dash-board-1">
              <div className="aksldnsd-sdnaskdse">
                <CricculumSidebar
                  lecture={(value: any) => setCourseLectures(value)}
                />
              </div>




              <div className="w-100">
                <div className="sad-ds-asajd">
                  <div className="dash-2 m-0">
                    <div className="my-course">
                      <TopNavbar />
                    </div>
                  </div>
                </div>
                <div className="my-course jdsad-snd">
                  <Link href="/en/student/courses">
                    <h3 style={{ cursor: 'pointer' }}>
                      <i className="fa fa-arrow-left"></i>
                      Back
                    </h3>
                  </Link>



                  {courselectures?.lectures && courselectures?.lectures.length > 0 ?
                    <div className="seting-method-payment">
                      <div className="d-flex justify-content-between " style={{ padding: '0px 20px' }}>
                        <h3>Course Section : {courselectures?.title} </h3>
                        {/* <h5 style={{ paddingTop: '15px' }}>By : {Lectures?.instructor?.fullname}</h5> */}
                        {/* <h6 style={{paddingTop:'15px'}}>lectures : {lectures?.length}</h6> */}

                      </div>
                      <div className="first-payment-1 ">
                        <CriculumCard lectures={courselectures?.lectures} CourseId={Lectures?.id} />
                      </div>

                    </div>
                    : <div>Course Lectures are not avaliable</div>}
                </div>
              </div>
            </div>

          </section>
        }
      </>
    );
  };
};

export default Home;
