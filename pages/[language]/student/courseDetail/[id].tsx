import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import { Accordion, Breadcrumb, Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import withAuth from "../../../../src/components/Hoc/authRoute";
import Search from "../../../../src/components/instructor/search";
import { MdClass } from 'react-icons/md'
import { FaBookReader, FaClipboardList } from 'react-icons/fa'
import { AiTwotoneAppstore } from 'react-icons/ai'
import { IoStatsChart } from 'react-icons/io'
import { useRouter } from "next/router";
import { Welcome, Report, Class, Assignment, Test, } from '../../../../src/components/instructor/zybooksRight'
import CreateSection from "../../../../src/components/instructor/CreateSectionPopup";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
const options = ["one", "two", "three"];
const Home: NextPage = () => {

  const [tabs, setTabs] = useState([
    { icon: <MdClass />, name: "Home" },
    { icon: <FaBookReader />, name: "My Class" },
    { icon: <AiTwotoneAppstore />, name: "Reporting" },
    { icon: <FaClipboardList />, name: "Assignments" },
    { icon: <IoStatsChart />, name: "Tests" },
  ])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [section, setSection] = useState([])

  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { Courses } = useSelector((state: RootStateOrAny) => state?.InsDash)

  let comp = [Welcome(), Class(), Report(), Assignment(), Test()]

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const router = useRouter()
  let courseId = router.query.id
  let courseTitle = router.query.title

  console.log("courseTitle" , router)

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/my-courses/curriculum/${courseId}`)
        if (res.data.success === true) {
          setLoading(false)

          setSection(res.data.response.sections)
        }
        else {
          setLoading(false)
        }
      }
      catch (err) {
        setLoading(false)
        // SweetAlert({ icon: "error", text: err })


      }
    }
    fetchCourse()
  }, [courseId])


  let findCourse = Courses.find((c) => c.id == courseId)

  console.log("show", show)

  return (
    <>
      {/* <NavigationBar1 /> */}
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">
                  <div className="d-flex mb-3">
                    <Breadcrumb>
                      <Breadcrumb.Item href="/en/student/dashboard">Home</Breadcrumb.Item>
                      <Breadcrumb.Item href="/en/student/courses">My Courses</Breadcrumb.Item>
                      <Breadcrumb.Item >{courseTitle}</Breadcrumb.Item>
                    </Breadcrumb>

                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="course_detail_header">
                        <div className="header_wrapper">
                          {/* <div className="search_bar">
                      <Search />
                      <h4>Search</h4>
                    </div> */}
                          {/* <h4 className="header_view" onClick={() => setShow(true)}>Create Section</h4>
                    <h4 className="header_config">View Content explorer</h4> */}
                        </div>
                      </div>
                      <div className="table_content">
                        <div className="table_wrapper">
                          <h4>Table of Content</h4>
                        </div>
                        {section && section?.map((sec, index) => (
                          <Accordion defaultActiveKey={sec?.id} style={{ marginBottom: '5px' }}>
                            <Accordion.Item eventKey={sec.id}>
                              <Accordion.Header>{sec?.title}</Accordion.Header>
                              {sec?.lectures?.map((lec, i) => (
                                <>
                                  <Link href={`/en/student/viewContent?courseId=${courseId}&lectId=${lec?.id}`}>
                                    <Accordion.Body className="table_body d-flex">
                                      {i + 1} {"."}
                                      <div
                                        dangerouslySetInnerHTML={{ __html: lec?.title }}
                                      />
                                    </Accordion.Body>
                                  </Link>

                                </>


                              ))}

                              {/* <Accordion.Body className="section_botton_block">
                          <div >
                            <Link href={`/en/student/createSection?courseId=${sec?.id}`}>
                              Create Lecture
                            </Link>
                          </div>
                        </Accordion.Body> */}
                            </Accordion.Item>

                          </Accordion>
                        ))}



                      </div>
                    </div>

                  </div>
                </div>
              }

            </div>
          </div>
        </div>



      </section >
    </>
  )
}
export default withAuth(Home);


