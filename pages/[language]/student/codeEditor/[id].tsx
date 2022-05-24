import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
const options = ["one", "two", "three"];
import React, { useState, useEffect } from 'react'
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import axios from 'axios'
import { Small } from "../../../../src/components/student/loader";
import Link from "next/link";

const Home: NextPage = () => {
  // const intl = useIntl();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState(true)
  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)
 

  // console.log("Courses" , Courses)

  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });
 

  let check =  reviews !== true 

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
                      My Courses </button>
                    <Link href="/en/student/liveCourses">

                      <button className="upload-1" >My Live Courses</button>
                    </Link>
                   
                  </div>

                  <div className="complete-web-1">
                   

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
