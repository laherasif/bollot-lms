import type { NextPage } from "next";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import withAuth from "../../../../src/components/Hoc/authRoute";
import React, { useState, useEffect } from 'react'
import { useSelector, RootStateOrAny } from "react-redux";
import axios from 'axios'
import { useRouter } from 'next/router'
import moment from 'moment'
import Link from "next/link";
import { SweetAlert } from "../../../../src/function/hooks";
import { Small } from "../../../../src/components/student/loader";
const Home: NextPage = () => {

  const [reviews, setReviews] = useState([])
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
      catch (error) {
        SweetAlert({ icon: "error", text: error })

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
              {loading ? Small() :
                <div className="hdsf0s-sadmsa">

                  <h3>Your Reviews</h3>
                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst">
                        {/* <div className="ratio-bar">
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
                      </div> */}
                      </div>
                    </div>
                    <div className="hjsaisa-sdnjassd jsdif-dsndawje">
                      <div className="reviews-section">
                        {reviews && reviews.length ? reviews.map((rev) => (
                          <div className="first-rev-sec">
                            <div className="rev-img pb-41">
                              <img src={User?.image || "/assets/images/first-sec.svg"} alt="" />
                              <div className="you-rev">
                                <h3>{User?.fullname || "Your Name"}</h3>
                                <p>{moment(rev?.createdAt).format("ll") || 0}</p>
                              </div>
                            </div>
                            <div className="cm-webs-12">
                              <p>
                                {rev?.review || ""}
                              </p>
                              {/* <h6>Complete Web &amp; Mobile Designer in 2022...</h6> */}
                            </div>
                          </div>
                        )) : <div>Record not found</div>}

                      </div>

                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
