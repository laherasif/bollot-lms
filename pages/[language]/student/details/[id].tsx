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
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import CourseSideBar from "../../../../src/components/student/courseSidebar";
import CriculumCard from '../../../../src/components/student/criculumCard'
import Link from "next/link";
import Conversation from "../../../../src/components/student/messageForm";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [courseId, setCourseId] = useState('')
  const [section, setSections] = useState({})
  const [lectures, setLectures] = useState({})
  const [conversation, setConversation] = useState(false)

  const router = useRouter()

  let courseTitle = router.query.id
  const { token } = useSelector((state: RootStateOrAny) => state.userReducer)

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
        let res = await AxInstance.get(`api//student/my-courses/${courseTitle}`)
        setSections(res.data.response.course)
        setCourseId(res.data.response.course.id)
      } catch (error) {

      }

    }
    fetchCourse()
  }, [courseTitle])



  return (
    <>
      <NavigationBar2 />

      <section className="dash-board">
        <div className="dash-board-1">
          {/* <CourseSideBar courseId={courseId} /> */}
          <div className="aksldnsd-sdnaskdse">
            {/* <div className="aksldnsd-sdnaskdse-1">
                    <img src={User?.image} alt="user_image" />
                    <p>{User?.fullname}</p>
                </div> */}
            <div className="hsaid9iawdeka">
              <div >
                <h2 className="ksdfhd-active">Content</h2>
                <div className="content-section">
                  {section && section?.sections?.map((sec: any, i: number) => {
                    console.log("sectionid" , sec.id)
                      return (
                        <div className="ksajdfds-sads" onClick={() => { setLectures(sec?.lectures), setCourseId(sec?.id) }} key={i}>
                          {sec.id === courseId ? (
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx={9} cy={9} r={9} fill="#D0565C" />
                              <path d="M4 9L6.5 12L13.5 5" stroke="white" />
                            </svg>
                          ) : (
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx={9} cy={9} r="8.5" stroke="#D0565C" />
                            </svg>
                          )}
                          <h3 style={{ paddingTop: '10px' }}>{sec?.title}</h3>
                        </div>
                      )


                  })
                  }

                </div>
              </div>
              {/* <div>
                <h2>Notes</h2>
              </div>
              <div>
                <h2>Announcements</h2>
              </div>
              <Link href={`/en/student/resource/${courseTitle}`}>
                <h2>Resources</h2>
              </Link>
              <div>
                <h2>Live Classes</h2>
              </div> */}
              <div onClick={() => setConversation(true)}>
                <h2>Message to Instructor</h2>
              </div>
              <div>
                <Link href={`/en/student/quiz/${courseId}`}>
                  <h2>Quiz</h2>
                </Link>
              </div>
              {/* <div>
                <h2>Review</h2>
              </div> */}
            </div>
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
                  <h3>Title : {section?.title}</h3>
                  <h5 style={{ paddingTop: '15px' }}>By : {section?.instructor?.fullname}</h5>
                  {/* <h6 style={{paddingTop:'15px'}}>lectures : {lectures?.length}</h6> */}

                </div>
                <div className="first-payment-1 ">
                  {lectures.length ?
                    <CriculumCard lectures={lectures} CourseId={section?.id} />
                    :
                    <div className="start-list-item">
                      <img src={section?.cover_image || "/assets/images/Group 276.png"} alt="course_img" />
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
        {conversation && <Conversation permition={conversation} Toggle={(value: any) => setConversation(value)} user_id={section?.instructor?.id} />}

      </section>
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
