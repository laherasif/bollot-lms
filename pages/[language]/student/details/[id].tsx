import type { NextPage } from "next";
// import Dropdown from "../../../../src/components/student/dropdown";
// import { useIntl } from "react-intl";
// import Sidebar from "../../../../src/components/student/sidebar";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
// import CourseCard from "../../../../src/components/student/CourseCard";
import NavigationBar2 from "../../../../src/components/student/NavigationBar2";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import CourseSideBar from "../../../../src/components/student/courseSidebar";
import CriculumCard from '../../../../src/components/student/criculumCard'
import Link from "next/link";
import Conversation from "../../../../src/components/student/messageForm";
import { SweetAlert } from "../../../../src/function/hooks";
import CricculumSidebar from "../../../../src/components/student/cricculumSidebar";
import { Small } from "../../../../src/components/student/loader";
import { getCourseLecture } from "../../../../src/redux/actions/student/courses";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [courseId, setCourseId] = useState('')
  const [section, setSections] = useState({})
  const [lectures, setLectures] = useState({})
  const [loading, setLoading] = useState(false)

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


  return (
    <>
      <NavigationBar2 />


      {loading ? Small() :
        <section className="dash-board">
          <div className="dash-board-1">
            <div className="aksldnsd-sdnaskdse">
              <CricculumSidebar
                lecture={(value: any) => setLectures(value)}
                courseId={(value: any) => setCourseId(value)}
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
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.57 5.93L3.5 12L9.57 18.07"
                        stroke="#131313"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.4999 12H3.66992"
                        stroke="#131313"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span style={{ marginLeft: 10 }}>Back</span>
                  </h3>
                </Link>



                <div className="seting-method-payment">
                  <div className="d-flex justify-content-between " style={{ padding: '0px 20px' }}>
                    <h3>Title : {Lectures?.title} </h3>
                    <h5 style={{ paddingTop: '15px' }}>By : {Lectures?.instructor?.fullname}</h5>
                    {/* <h6 style={{paddingTop:'15px'}}>lectures : {lectures?.length}</h6> */}

                  </div>
                  <div className="first-payment-1 ">
                    {lectures.length ?
                      <CriculumCard lectures={lectures} CourseId={Lectures?.id} />
                      :
                      <div className="start-list-item">
                        <img
                          src={Lectures?.cover_image || "/assets/images/Group 276.png"}
                          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                          alt="course_img" />
                      </div>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
      }
    </>
  );
};

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

export default Home;
