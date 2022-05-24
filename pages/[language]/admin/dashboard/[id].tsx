import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../src/icons";
// import TopNavbar from "../../../src/components/TopNavbar";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Chart from "../../../../src/components/admin/chart";
import Chart1 from "../../../../src/components/admin/chart1";
import BarChart from "../../../../src/components/admin/barchart";
import DashboardRightBar from "../../../../src/components/admin/DashboardRightBar";
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getAllInstructor, getAllStudent } from '../../../../src/redux/actions/admin'
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getAllInstructor())
  //   dispatch(getAllStudent())
  // }, [])

  return (
    <div className="inst">

      <NavigationBar1 />
      <div className="kjfads0-asdi3">
        <Sidebar />

      </div>
      <section className="dash-board jadsifd-asdasid">
        <div className="jcoiasd03-eakw3e1" >
          <Sidebar />
        </div>

        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course">
              <div className="hdsf0s-sadmsa">
                <div>
                  <h3 className="lsjadf-sadnsd">
                    <span>Hi Tam Tran,</span>
                  </h3>
                  <h3>Welcome back👋</h3>
                </div>
                <div className="dsnodi-sdjsad">
                  <FiSearch color="#8A8A8A" size={17} />
                  <input type="text" placeholder="Search" />
                </div>
              </div>
              <div className="d-flex flex-wrap my-5">
                <div className="cards">
                  <Chart1
                    label="Courses"
                    value="05"
                    color={"#FCCE40"}
                    strokeColor="#E1A902"
                  />
                </div>
                <div className="cards">
                  <Chart1
                    label="Courses"
                    value="05"
                    color={"#FCCE40"}
                    strokeColor="#E1A902"
                  />
                </div>
                <div className="cards">
                  <Chart1
                    label="Total students"
                    value="105"
                    color={"#03BCD4"}
                    strokeColor="#0BACC0"
                  />
                </div>
                <div className="cards">
                  <Chart1
                    label="Revenue"
                    value="$45k"
                    color={"#5469C9"}
                    strokeColor="#2C42A5"
                  />
                </div>
              </div>
              <div className="d-flex w-100 kafsdfidsa-fen">
                <div className="w-100 kdsafjdas-sadn">
                  <h5 className="jdiofsdf-fndsf">Daily Learning Activity</h5>
                  <div className="odsafoskdf-dsnaier">
                    <Chart />
                  </div>
                </div>
                <div className="w-100 diafdsfi-dsaf">
                  <h5 className="jdiofsdf-fndsf">Weekly Status</h5>
                  <div className="odsafoskdf-dsnaier">
                    <h5 className="sanfkf-dafn">From Jan 10-18</h5>
                    <BarChart />
                    <div className="d-flex justify-content-between jasfidsf-afnesf3">
                      <div>
                        <span>Minimum</span>
                        <h5>04 Hrs</h5>
                      </div>
                      <div>
                        <span>Maximum</span>
                        <h5>08 Hrs</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Home;
