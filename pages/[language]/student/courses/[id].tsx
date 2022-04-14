import type { NextPage } from "next";
import Dropdown from "../../../../src/components/student/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
const options = ["one", "two", "three"];
import React , { useState , useEffect}  from 'react'
import instance from "../../../../src/confiq/axios/instance";
import withAuth from "../../../../src/components/Hoc/authRoute";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course , setCourse] = useState([])
  useEffect(()=>{
      let fetchCourse = async () =>{
        let res = await instance.get('api//student/my-courses')
        console.log("res" , res )
        setCourse(res.data.response.courses)
      }
      fetchCourse()
  },[])

  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <h3>My Courses</h3>
                <div className="complete-web-1">
                  { course && course.map((course:any)=>(
                    <CourseCard  course={ course } key={course.id}/>
                  ))}
                  

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
