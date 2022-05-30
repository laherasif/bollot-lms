import type { NextPage } from "next";
// import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { IoMailOutline } from "react-icons/io5";
// import Icons from "../../../../src/icons";
// import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import Chart from "../../../../src/components/instructor/chart";
import Chart1 from "../../../../src/components/instructor/chart1";
// import BarChart from "../../../../src/components/instructor/barchart";
import DashboardRightBar from "../../../../src/components/instructor/DashboardRightBar";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { getDashbaordStatic , getTransactionStatic , getTransactions } from "../../../../src/redux/actions/instructor/courses";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const { User , token  } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { Statistic  } = useSelector((state: RootStateOrAny) => state?.InsDash)

  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });

useEffect(()=>{
  try{
    let fetchStatic = async() => {
      let res = await AxInstance.get('api//instructor/dashboard-stats')
      let transaction = await AxInstance.get('api//instructor/transaction-stats')
      let Alltransaction = await AxInstance.get('api//instructor/transactions')
      if(res.data.success === true ){
        dispatch(getDashbaordStatic(res.data.response.data))
        dispatch(getTransactionStatic(transaction.data.response.data))
        dispatch(getTransactions(Alltransaction.data.response.transactions))
      }
      // console.log("REs trns" , res )
    }
    fetchStatic()
  }
  catch(err){}
},[])


  return (
    <div className="inst">

      <NavigationBar1 />
      <div className="kjfads0-asdi3">
        <Sidebar />
        <DashboardRightBar />

      </div>
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
                  <h3 className="lsjadf-sadnsd">
                    <span>Hi {User?.fullname},</span>
                  </h3>
                  <h3>Welcome back👋</h3>
                </div>
                {/* <div className="dsnodi-sdjsad">
                  <FiSearch color="#8A8A8A" size={17} />
                  <input type="text" placeholder="Search" />
                </div> */}
              </div>
              <div className="sanlsad-ajw3e">
                <div className="row">
                  <div className="col-md-8">
                    <div className="aljskdfids-asdawe adofjiads-dfjiads">
                      <div className="aisdad-j3n2eidaw dsjfasdo-sadasd">
                        <h4>List Your Course</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                        <Link href="/en/instructor/addCourse">
                          <button className="withdraw">Add new course</button>
                        </Link>
                      </div>
                      <div className="">

                        <img className="w-100" src="/assets/images/Rectangle 4110.png" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="cst-c-card pioner-ch">
                      <div>
                        <h3>Wallet balance</h3>
                      </div>
                      <div className="aisdad-j3n2eidaw">
                        <h2>${Statistic?.wallet_balance}</h2>
                        <button className="withdraw lkadsjfkadsf-sad">Withdraw</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap my-5">
                <div className="njadfskdfns-dsfsad">
                  <Chart1
                    label="Courses"
                    value={Statistic?.total_courses}
                    color={"#FCCE40"}
                    strokeColor="#E1A902"
                    chart={Statistic?.courses_chart}
                  />
                </div>
                <div className="njadfskdfns-dsfsad">
                  <Chart1
                    label="Total students"
                    value={Statistic?.total_students}
                    color={"#03BCD4"}
                    strokeColor="#0BACC0"
                    chart={Statistic?.students_chart}

                  />
                </div>
                <div className="njadfskdfns-dsfsad">
                  <Chart1
                    label="Revenue"
                    value={Statistic?.total_revenue}
                    color={"#5469C9"}
                    strokeColor="#2C42A5"
                    chart={Statistic?.revenue_chart}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="jcoiasd03-eakw3e jkdasfis-adaerin ">
          <DashboardRightBar />

        </div>
      </section>
    </div>
  );
};

export default Home;
