import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Small } from "../../../../src/components/admin/loader";
import NewCourse from "../../../../src/components/admin/newCourse";
import { Breadcrumb } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [ins, setIns] = useState(false)
  const [loading, setLoading] = useState(false)
  const { Students, Instructor } = useSelector((state: RootStateOrAny) => state?.admin)
  const [loader , setLoader ] = useState(false )
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [ins || loader ])


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
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item active>Users</Breadcrumb.Item>
                    </Breadcrumb>

                  </div>

                  <div className="my-2">
                    <NewCourse loader={(value:any)=> setLoader(value)}/>
                  </div>
                </div>

                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 course w-100">
                        <button id={ins === false  ? "activetab" : "" } className={ins === false ? "upload-1 sdisad-dsdactive" : "upload-1"} onClick={() => setIns(false)}>
                          Manage Students
                        </button>
                        <button id={ins ? "activetab" : "" } className={ins ? "upload-1 sdisad-dsdactive"  : "upload-1"} onClick={() => setIns(true)} >Manage Instructor</button>





                      </div>

                    </div>
                  </div>
                </div>

                {/* <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 ">
                        <button className={ins === false ? "upload-1 sdisad-dsdactive" : "upload-1"} onClick={() => setIns(false)}>
                          Manage Students
                        </button>
                        <button className={ins ? "upload-1 sdisad-dsdactive" : "upload-1"} onClick={() => setIns(true)} >Manage Instructor</button>
                      </div>

                    </div>
                  </div>
                </div> */}
                <div className="complete-web-1">
                  {
                    ins ? <CourseCard Instructor={Instructor} /> : <CourseCard Student={Students} role={"student"} />
                  }


                </div>
              </div>
            </div>
          </div>
        }

        {/* {email && <Invitation permition={email} Toggle={(value: any) => setemail(value)} />} */}
      </section >
    </div >
  );
};

export default AdminAuth(Home);
