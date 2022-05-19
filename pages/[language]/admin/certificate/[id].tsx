import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Small } from "../../../../src/components/instructor/loader";
import Invitation from "../../../../src/components/instructor/invitationForm";
import Search from "../../../../src/components/instructor/search";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const [email, setemail] = useState(false)
  const { User, token } = useSelector((state: RootStateOrAny) => state?.userReducer)

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
        let res = await AxInstance.get('api//instructor/courses')
        if (res.data.success === true) {
          setLoading(false)
          setCourse(res.data.response.courses)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [])

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {/* {loading ? Small()
          : */}
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course">
              <div className="hdsf0s-sadmsa">

                <div className="back-btn">
                  <Link href="/en/instructor/" >
                    <h3>
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>
                  <h3>Manage Certificate</h3>
                </div>
                {/* <div className=" jidfjsd-asjreid">
                  <Search />
                  <div className="d-flex idfadsf-sads">
                    <Link href='/en/instructor/addCourse'>
                      <button className="upload-1 sdisad-dsdactive">
                        + Add New Employe </button>
                    </Link>
                  </div>
                </div> */}
              </div>

              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="d-flex mb-3 idfadsf-sads">
                      <button className="upload-1 sdisad-dsdactive">
                      Certificates
                      </button>
                      {/* <Link href="/en/instructor/liveCourses">
                        <button className="upload-1" >Manage Header Menu</button>
                      </Link>
                      <Link href="/en/instructor/liveCourses">
                        <button className="upload-1" >Manage Banners</button>
                      </Link> */}
                      {/* <Link href="/en/instructor/liveCourses">
                        <button className="upload-1" >Manage Banners</button>
                      </Link> */}
                    </div>

                  </div>
                </div>
              </div>
              <div className="complete-web-1">
                {course && course.length > 0 ? course.map((course: any) => {
                  if (!course?.schedule.length)
                    return (
                      <CourseCard course={course} key={course.id} />
                    )
                })
                  : <div>Record not found </div>
                }


              </div>
            </div>
          </div>
        </div>
        {/* } */}

        {/* {email && <Invitation permition={email} Toggle={(value: any) => setemail(value)} />} */}
      </section >
    </div >
  );
};

export default Home;
