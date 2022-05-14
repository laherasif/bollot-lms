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
import React, { useState, useEffect } from 'react'
import instance from "../../../../src/confiq/axios/instance";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import axios from 'axios'
import { Small } from "../../../../src/components/student/loader";
import Link from "next/link";
import Conversation from "../../../../src/components/student/messageForm";
import ReviewForm from "../../../../src/components/student/reviewForm";
import { getSearchCourses } from '../../../../src/redux/actions/student/courses'
import { useRouter } from "next/router";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState(true)
  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)
  const { SearchCourse } = useSelector((state: RootStateOrAny) => state?.studentCourse)


  const dispatch = useDispatch()
  const router = useRouter()
  const courseSlug = router.query.id

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });
  useEffect(() => {
    let fetchCourse = async () => {
      let value = {
        page_no: 1,
        rows_per_page: 10,
        search: courseSlug
      }
      setLoading(true)
      let res = await AxInstance.post('api//courses', value)
      if (res.data.success === true) {
        setLoading(false)
        dispatch(getSearchCourses(res.data.response.courses))
      }
    }
    fetchCourse()
  }, [courseSlug])


  let check = reviews !== true

  return (
    <>
      <NavigationBar1 />
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
                    <button className="upload-1 sdisad-dsdactive">
                      Search Courses </button>
                   

                  </div>

                  <div className="complete-web-1">
                    {SearchCourse && SearchCourse.length > 0 ? SearchCourse.map((course: any) => {
                      if (!course?.schedule.length)
                        return (
                          <CourseCard course={course} key={course.id} courseId={(value: any) => setReviews(value)} />
                        )
                    })
                      : <div>Record not found </div>
                    }


                  </div>
                </div>
              }

            </div>
          </div>
        </div>


        {reviews && check && <ReviewForm reviewss={reviews} Toggle={(value: any) => setReviews(value)} />}

      </section>
    </>
  );
};

export default withAuth(Home);
