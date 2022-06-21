import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import CourseCard from "../../../../src/components/admin/CourseCard";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import { clearStates } from "../../../../src/redux/actions/instructor/preview";
// import { SweetAlert } from "../../../../src/function/hooks";
import { Breadcrumb } from "react-bootstrap";
// import Swal from "sweetalert2";
import AdminAuth from '../../../../src/components/Hoc/adminRoute'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const [del, setDel] = useState(false)
 
  const dispatch = useDispatch()


  const ClearData = () => {
    dispatch(clearStates())
  }

  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
      setLoading(false )
    }, 1000);
  },[])

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
                      <Breadcrumb.Item active>Courses</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <Link href="/en/admin/" >
                    <h3 className="back-arrow">
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>
                  <h3>Courses and Catagories </h3> */}
                  </div>
                  <div className="my-2">
                    {/* <Search /> */}
                    <div className="d-flex idfadsf-sads">
                      <Link href='/en/admin/addCourse'>
                        <button className="upload-1 sdisad-dsdactive" onClick={() => ClearData()}>
                          + Add New Course </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="complete-web-1 mt-2">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 course">
                        <button className="upload-1 sdisad-dsdactive" id="activetab">
                          All Courses
                        </button>
                        <Link href="/en/admin/coupon">
                          <button className="upload-1" >Coupons</button>
                        </Link>
                        <Link href="/en/admin/liveCourses">
                          <button className="upload-1" >Live Courses</button>
                        </Link>
                        <Link href="/en/admin/catagories">
                          <button className="upload-1" >Course Categories</button>
                        </Link>


                      </div>

                    </div>
                  </div>
                </div>
                <div className="complete-web-1">
                  <CourseCard  />


                </div>
              </div>
            </div>
          </div>
        }

      </section >
    </div >
  );
};

export default AdminAuth( Home );
