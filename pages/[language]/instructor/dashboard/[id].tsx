import type { NextPage } from "next";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Chart1 from "../../../../src/components/instructor/chart1";
import DashboardRightBar from "../../../../src/components/instructor/DashboardRightBar";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDashbaordStatic, getTransactionStatic, getTransactions, getAllCourse } from "../../../../src/redux/actions/instructor/courses";
import { SweetAlert } from "../../../../src/function/hooks";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { Small } from "../../../../src/components/instructor/loader";
import ZyBooks from "../../../../src/components/instructor/zyCourses";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState([])
  const { User, token } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { Statistic , Courses } = useSelector((state: RootStateOrAny) => state?.InsDash)

  const dispatch = useDispatch()

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });

  useEffect(() => {
    try {
      setLoading(true)
      let fetchStatic = async () => {
        let resCourse = await AxInstance.get('api//instructor/courses')
        let res = await AxInstance.get('api//instructor/dashboard-stats')
        let transaction = await AxInstance.get('api//instructor/transaction-stats')
        let Alltransaction = await AxInstance.get('api//instructor/transactions')
        if (res.data.success === true) {
          dispatch(getAllCourse(resCourse.data.response.courses))
          dispatch(getDashbaordStatic(res.data.response.data))
          dispatch(getTransactionStatic(transaction.data.response.data))
          dispatch(getTransactions(Alltransaction.data.response.transactions))
          setLoading(false)
        }
      }
      fetchStatic()
    }
    catch (err) {
      setLoading(false)
      SweetAlert({ icon: 'error', text: err })
    }
  }, [])



  if (loading === true) {
    return (
      <div className="inst" style={{ paddingTop: '20rem' }}>

        {Small()}
      </div>
    )
  }

  else {
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
              <div id="show-above">
                <Sidebar />
              </div>
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

                </div>
                <div className="sanlsad-ajw3e">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="aljskdfids-asdawe adofjiads-dfjiads">
                        <div className="aisdad-j3n2eidaw dsjfasdo-sadasd">
                          <h4>List Your Course</h4>
                          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p> */}
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
                          <Link href="/en/instructor/withdraw">
                            <button className="withdraw lkadsjfkadsf-sad">Withdraw</button>

                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-wrap my-5">
                  <div className="njadfskdfns-dsfsad" id="char-card">
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

                <div >
                  <h3>Courses </h3>
                  <Link href="/en/instructor/adopt">Add Adopt</Link>
                </div>
                <br/>
                <div className="zybook_container">
                  {Courses && Courses.map((item) => (
                    <ZyBooks item={item} key={item.id} />
                  ))}


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
  }
};

export default withAuth(Home);
