import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { Small } from "../../../../src/components/instructor/loader";
// import Invitation from "../../../../src/components/instructor/invitationForm";
// import Search from "../../../../src/components/instructor/search";
import NewCourse from "../../../../src/components/admin/newCourse";
import { getAllInstructor, getAllStudent, getCatagories } from "../../../../src/redux/actions/admin";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [showIns, setShowIns] = useState([])
  const [showStu, setShowStu] = useState([])
  const [loading, setLoading] = useState(false)
  const [ins, setIns] = useState(false)
  const [email, setemail] = useState(false)
  const {  token , Students , Instructor } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

    const dispatch = useDispatch()

  // useEffect(() => {
  //   let fetchCourse = async () => {
  //     try {
  //       setLoading(true)
  //       let res = await AxInstance.get('api//admin/students')
  //       let resIns = await AxInstance.get('api//admin/instructors')
  //       let resCata = await AxInstance.get('api//admin/categories')
  //       if (res.data.success === true) {
  //         dispatch(getAllStudent(res.data))
  //         dispatch(getAllInstructor(resIns.data))
  //         dispatch(getCatagories(resCata.data.response.categories))

  //         // setLoading(false)
  //         // setShowStu(res.data.response.students)
  //         // setShowIns(resIns.data.response.instructors)

  //       }
  //     }
  //     catch (err) {

  //     }
  //   }
  //   fetchCourse()
  // }, [])


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
                  <Link href="/en/admin/dashboard" >
                    <h3 className="back-arrow">
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>
                  <h3>Manage Student  and Instructor </h3>
                </div>
                <div className=" jidfjsd-asjreid">
                  <div className="d-flex active_color">
                    <NewCourse/>
                  
                  </div>
                </div>
              </div>

              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="d-flex mb-3 active_color">
                      <button className={ins === false ? "upload-active sdisad-dsdactive" : "upload-active"} onClick={() => setIns(false)}>
                        Manage Students
                      </button>
                      <button className={ins ? "upload-active sdisad-dsdactive" : "upload-active"} onClick={() => setIns(true)} >Manage Instructor</button>
                    </div>

                  </div>
                </div>
              </div>
              <div className="complete-web-1">
                {
                  ins ? <CourseCard Instructor={Instructor}  /> : <CourseCard Student={Students} role={"student"} />
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
