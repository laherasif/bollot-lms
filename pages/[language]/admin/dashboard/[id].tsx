import type { NextPage } from "next";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Chart from "../../../../src/components/admin/chart";
import Chart1 from "../../../../src/components/admin/chart1";
import BarChart from "../../../../src/components/admin/barchart";
// import DashboardRightBar from "../../../../src/components/admin/DashboardRightBar";
import React, { useState, useEffect } from 'react'
import {
  RootStateOrAny,
  useDispatch,
  useSelector
} from "react-redux";
import {
  getAllInstructor,
  getAllStudent,
  getAllCompany,
  getCatagories,
  getStatistic,
  getTransaction,
  getCodeLanguage,
} from '../../../../src/redux/actions/admin'
import axios from "axios";
import { Small } from "../../../../src/components/admin/loader";
import { SweetAlert } from "../../../../src/function/hooks";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
// const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(false)
  const { token, Admin, Statistic } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const dispatch = useDispatch()



  useEffect(() => {
    let fetchCourse = async () => {
      try {
        const options: Object = {
          method: 'GET',
          url: 'https://judge0-ce.p.rapidapi.com/languages',
          headers: {
            'X-RapidAPI-Key': "dc684477damsh4a8d57199134a8ep144f2fjsndb99bad0d80a",
            'X-RapidAPI-Host': "judge0-ce.p.rapidapi.com"
          }
        };

        setLoading(true)
        let res = await AxInstance.get('api//admin/students')
        let resIns = await AxInstance.get('api//admin/instructors')
        let resComp = await AxInstance.get('api//admin/businesses')
        let resCata = await AxInstance.get('api//admin/categories')
        let resStat = await AxInstance.get('api//admin/dashboard-stats')
        let resTran = await AxInstance.get('api//admin/transactions')
        let resLang = await axios.request(options);
        if (res.data.success === true) {
          dispatch(getCodeLanguage(resLang.data))
          dispatch(getAllStudent(res.data))
          dispatch(getAllInstructor(resIns.data))
          dispatch(getAllCompany(resComp.data))
          dispatch(getCatagories(resCata.data.response.categories))
          dispatch(getStatistic(resStat.data.response.data))
          dispatch(getTransaction(resTran.data.response))
          setLoading(false)
        }
      }
      catch (err) {
        SweetAlert({ icon: "error", text: err })
      }
    }
    fetchCourse()
  }, [])

  return (
    // <div className="inst">

    //   <NavigationBar1 />
    //   {/* <div className="kjfads0-asdi3">
    //     <Sidebar />
    //   </div> */}
    //   <section className="dash-board jadsifd-asdasid">
    //     <div className="jcoiasd03-eakw3e1" >
    //       <Sidebar />
    //     </div>

    <div className="inst mb-4" >
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>

        {
          loading ?
            Small()
            :
            <div className="dash-board-1">
              <div className="dash-2 ">
                <div className="my-course">
                  <div className="hdsf0s-sadmsa">
                    <div>
                      <h3 className="lsjadf-sadnsd">
                        <span>Hi {Admin?.fullname},</span>
                      </h3>
                      <h3>Welcome back👋</h3>
                    </div>
                    {/* <div className="dsnodi-sdjsad">
                  <FiSearch color="#8A8A8A" size={17} />
                  <input type="text" placeholder="Search" />
                </div> */}
                  </div>
                  <div className="d-flex flex-wrap my-5">
                    <div className="cards">
                      <Chart1
                        label="Total Courses"
                        value={Statistic?.total_courses}
                        color={"#FCCE40"}
                        strokeColor="#E1A902"
                        chart={Statistic?.courses_chart}
                      />
                    </div>
                    <div className="cards">
                      <Chart1
                        label="Students Enrolled This Month"
                        value={Statistic?.total_students_learning}
                        color={"green"}
                        strokeColor="green"
                        chart={Statistic?.students_learning_chart}

                      />
                    </div>
                    <div className="cards">
                      <Chart1
                        label="Total students"
                        value={Statistic?.total_students_registered}
                        color={"#03BCD4"}
                        strokeColor="#0BACC0"
                        chart={Statistic?.total_students_registered_chart}

                      />
                    </div>
                    {/* <div className="cards">
                  <Chart1
                    label="Revenue"
                    value={Statistic?.total_revenue}
                    color={"#5469C9"}
                    strokeColor="#2C42A5"
                  />
                </div> */}
                    <div className="cards">
                      <Chart1
                        label="Instructors"
                        value={Statistic?.total_instructors_registered}
                        color={"pink"}
                        strokeColor="pink"
                        chart={Statistic?.total_instructors_registered_chart}

                      />
                    </div>
                    <div className="cards">
                      <Chart1
                        label="Companies"
                        value={Statistic?.total_companies_registered}
                        color={"lightgray"}
                        strokeColor="lightgray"
                        chart={Statistic?.total_companies_registered_chart}

                      />
                    </div>

                    <div className="cards info_card">
                      <h2>Total Revenue</h2>
                      <h3>{Statistic?.total_revenue}</h3>
                    </div>
                    <div className="cards info_card">
                      <h2>Stripe Balance</h2>
                      <h3>{Statistic?.stripe_balance_available}</h3>
                    </div>
                    <div className="cards info_card">
                      <h2>Stripe Balance Pending</h2>
                      <h3>{Statistic?.stripe_balance_pending}</h3>
                    </div>

                  </div>
                  <div className="d-flex w-100 kafsdfidsa-fen">
                    <div className="w-100 kdsafjdas-sadn">
                      <h5 className="jdiofsdf-fndsf">Total Revenue</h5>
                      <div className="odsafoskdf-dsnaier">
                        <BarChart chart={Statistic?.revenue_chart} />

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        }

      </section>
    </div>
  );
};

export default AdminAuth(Home);
