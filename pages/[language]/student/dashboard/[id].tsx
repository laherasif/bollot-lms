import type { NextPage } from "next";
// import Dropdown from "../../../../src/components/student/dropdown";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import Chart from '../../../../src/components/student/chart'
import Chart1 from '../../../../src/components/student/chart1'
import BarChart from '../../../../src/components/student/barchart'
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useEffect, useState } from "react";
import { Main } from "../../../../src/components/student/loader";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getDashboardStatic,
  getPayemnts,
  getTransactions
} from "../../../../src/redux/actions/student/courses";
import axios from "axios";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();
  const [loading, setLoading] = useState(true)
  const [charts, setCharts] = useState([])
  const dispatch = useDispatch()

  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)
  const { Dashboard } = useSelector((state: RootStateOrAny) => state.studentCourse)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  useEffect(() => {
    try {
      let fetchStat = async () => {
        let res = await AxInstance.get('api//student/dashboard-stats')
        let resPayment = await AxInstance.get('api//student/payments')
        let resTrns = await AxInstance.get('api//student/transactions')
        dispatch(getDashboardStatic(res.data.response.data))
        dispatch(getPayemnts(resPayment.data.response))
        dispatch(getTransactions(resTrns.data.response.transactions))
        setCharts(res.data.response.data)
      }
      fetchStat()
    }
    catch (err) { }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  return (

    <>
      <NavigationBar1 />
      <section className="dash-board">
        {
          loading ? Main()
            :
            <div className="dash-board-1">
              <Sidebar />
              <div className="dash-2">
                <div className="my-course">
                  <TopNavbar />
                  <div className="hdsf0s-sadmsa">
                    <h3 className="lsjadf-sadnsd">
                      <span>Hi {User?.fullname}</span>
                    </h3>
                    <h3>Welcome back👋</h3>
                  </div>
                  <div className="d-flex flex-wrap my-5" >
                    <div className="njadfskdfns-dsfsad">
                      <Chart1 chart={Dashboard?.inprogress} label="Inprogress" value={Dashboard?.total_inprogress} color={"#FCCE40"} strokeColor="#E1A902" />
                    </div>
                    <div className="njadfskdfns-dsfsad">
                      <Chart1 chart={Dashboard?.completed} label="Completed" value={Dashboard?.total_completed} color={"#03BCD4"} strokeColor="#0BACC0" />

                    </div>
                    <div className="njadfskdfns-dsfsad">
                      <Chart1 chart={Dashboard?.inprogress} label="Total Enrolled" value={Dashboard?.total_enrolled} color={"#5469C9"} strokeColor="#2C42A5" />

                    </div>
                  </div>
                  <div className="d-flex w-100 kafsdfidsa-fen">
                    <div className="w-100 kdsafjdas-sadn">
                      <h5 className="jdiofsdf-fndsf">Daily Learning Activity</h5>
                      <div className="odsafoskdf-dsnaier">
                        <Chart chart={Dashboard?.progress_daily} />
                      </div>
                    </div>
                    <div className="w-100 diafdsfi-dsaf">
                      <h5 className="jdiofsdf-fndsf">Weekly Status</h5>
                      <div className="odsafoskdf-dsnaier" style={{ height: '87%' }}>
                        <BarChart chart={Dashboard?.progress_weekly} />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </section>
    </>
  );
};

export default withAuth(Home);
