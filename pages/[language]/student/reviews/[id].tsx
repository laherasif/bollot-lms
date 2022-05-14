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
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import { FaStar } from "react-icons/fa";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import React, { useState, useEffect } from 'react'
import { useSelector, RootStateOrAny } from "react-redux";
import axios from 'axios'
import { useRouter } from 'next/router'
import Rating from '../../../../src/components/ratingStar'
import moment from 'moment'
import Link from "next/link";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [reviews, setReviews] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const courseId = router.query.id

  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)

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

        let res = await AxInstance.post('api//review/get-review', { course_id: courseId })
        if (res.data.success === true) {
          setLoading(false)
          setReviews(res.data.response.review)
        }
      }
      catch (err) {

      }
    }
    fetchCourse()
  }, [courseId])

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
                <Link href="/en/student/courses" >
                  <h3 style={{cursor:'pointer'}}>
                    <i className="fa fa-arrow-left "></i>
                    <span className="pl-2">Back</span>
                  </h3>
                </Link>
                <h3>Your Reviews</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst">
                      <div className="ratio-bar">
                        <h3>{reviews?.rating || 0}</h3>
                        <p>out of</p>
                        <h3 className="ml-9">5</h3>
                        <div className="lasjdsad-sdjsa ksjadas">
                          {reviews?.rating ?
                            <Rating value={reviews?.rating} />
                            :
                            <Rating value={0} />

                          }
                        </div>
                        {/* <h6>4.8(151)</h6> */}
                      </div>
                    </div>
                  </div>
                  <div className="hjsaisa-sdnjassd jsdif-dsndawje">
                    <div className="reviews-section">
                      <div className="first-rev-sec">
                        <div className="rev-img pb-41">
                          <img src={User?.image || "/assets/images/first-sec.svg"} alt="" />
                          <div className="you-rev">
                            <h3>{User?.fullname || "Your Name"}</h3>
                            <p>{moment(reviews?.createdAt).format("ll") || 0}</p>
                          </div>
                        </div>
                        <div className="cm-webs-12">
                          <p>
                            {reviews?.review || ""}
                          </p>
                          {/* <h6>Complete Web &amp; Mobile Designer in 2022...</h6> */}
                        </div>
                      </div>
                    </div>

                  </div>
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
