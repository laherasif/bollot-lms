import type { NextPage } from "next";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import { Accordion, Breadcrumb, Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { MdClass } from 'react-icons/md'
import { FaBookReader, FaClipboardList } from 'react-icons/fa'
import { AiTwotoneAppstore } from 'react-icons/ai'
import { IoStatsChart } from 'react-icons/io'
import { useRouter } from "next/router";
import { Welcome, Report, Class, Assignment, Test, } from '../../../../src/components/admin/zybooksRight'
import CreateSection from "../../../../src/components/admin/CreateSectionPopup";
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
  const [dummy, setDummy] = useState('')

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


  const handleClose = (type:string ) => {
    setShow(false)
    if (type === 'load') {
      setDummy('')
      return 
    }


  }



  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//admin/courses/curriculum/get/${courseId}`)
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

    if (dummy === '') {
      fetchCourse()
    }
  }, [courseId, dummy])


  let findCourse = Courses.find((c) => c.id == courseId)


  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        {loading ? Small() :
          <div className="inst container">
            <div className="mt-4">
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Courses Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="course_detail_header">
                  <div className="header_wrapper">
                    {/* <div className="search_bar">
                      <Search />
                      <h4>Search</h4>
                    </div> */}
                    <h4 className="header_view" onClick={() => { setShow(true), setDummy("dummy") }}>Create Section</h4>
                    {/* <h4 className="header_config">View Content explorer</h4> */}
                  </div>
                </div>
                <div className="table_content">
                  <div className="table_wrapper">
                    <h4>Table of Content</h4>
                  </div>
                  {section && section?.map((sec, index) => (
                    <Accordion defaultActiveKey={index} style={{ marginBottom: '5px' }}>
                      <Accordion.Item eventKey={sec.id}>
                        <Accordion.Header>{sec?.title}</Accordion.Header>
                        {sec?.lectures?.map((lec, i) => (
                          <>
                            <Link href={`/en/instructor/lectureView?courseId=${courseId}&lectId=${lec?.id}&courseName=${sec?.title}`}>
                              <Accordion.Body className="table_body d-flex">
                                {i + 1} {"."}
                                <div
                                  dangerouslySetInnerHTML={{ __html: lec?.title }}
                                />
                              </Accordion.Body>
                            </Link>

                          </>


                        ))}

                        <Accordion.Body className="section_botton_block">
                          <div >
                            <Link href={`/en/admin/createSection?sectionId=${sec?.id}&courseId=${courseId}&courseName=${sec?.title}`}>
                              Create Lecture
                            </Link>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>

                    </Accordion>
                  ))}



                </div>
              </div>
              <div className="col-md-4">
                <div className="course_right_wrapper" >
                  <div className="right_header" style={{ backgroundImage: `url(${findCourse?.cover_image})` }}>
                    <div className="header_text">
                      <h4 className="header_title">Digital Course</h4>
                      <h6 className="header_date">Expires {moment(findCourse?.created_at).format('ll')}</h6>
                    </div>
                  </div>
                  <div className="right_main">
                    {
                      comp.map((cp, index) => (
                        activeIndex === index ? cp : null
                      ))
                    }
                  </div>
                  <div className="right_footer">
                    <div className="tabs">
                      {tabs.map((tap, index) => (
                        <div id={activeIndex === index && "active"} className="tab" onClick={() => setActiveIndex(index)}>
                          <p >{tap.name}</p>
                        </div>
                      ))}


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </section>
      {show && <CreateSection permition={show} Toggle={(value:string) => handleClose(value)} courseId={courseId} />}
    </div >
  );
};

export default withAuth(Home);

