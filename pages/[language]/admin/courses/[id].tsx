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
// import Chart from "../../../../src/components/chart";
// import Chart1 from "../../../../src/components/chart1";
// import BarChart from "../../../../src/components/barchart";
import Link from "next/link";
import instance from "../../../../src/confiq/axios/instance";
import CourseCard from "../../../../src/components/admin/CourseCard1";
import NewCourse from "../../../../src/components/admin/newCourse";
import { RootStateOrAny, useSelector } from "react-redux";
const options = ["one", "two", "three"];
import React, { useState } from 'react'
// import {  useDispatch  } from "react-redux";
// import {getAllInstructor , getAllStudent } from '../../../../src/redux/actions/admin'
const Home: NextPage = () => {
  // const intl = useIntl();

  const [role, setRole] = useState('')

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course">
              <div className="hdsf0s-sadmsa">
                <div>
                  <h3>Manage Students & Instructor </h3>
                </div>

                <div className=" jidfjsd-asjreid">
                  <div className="dsnodi-sdjsad">
                    <FiSearch color="#8A8A8A" size={17} />
                    <input type="text" placeholder="Search" />
                  </div>
                  <NewCourse />
                </div>
              </div>

              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="maxima ">
                      <div className="idfadsf-sads">
                        <button onClick={()=> setRole("student")} className={`upload-1 sdisad-dsd${role === "student" ? 'active' : ""}`} >
                          ALL students
                        </button>
                      </div>
                      <div className="idfadsf-sads">
                        <button onClick={()=> setRole("instructor")} className={`upload-1 sdisad-dsd${role === "instructor" ? 'active' : ""}`}>
                          ALL Instructor
                        </button>
                      </div>
                      {/*<div>
                        <Link href="/en/payments">
                          <button className="upload-1">In Review</button>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="complete-web-1">
                <CourseCard role={role === "student" ? "student" : "instructor"} />

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



export default Home;
