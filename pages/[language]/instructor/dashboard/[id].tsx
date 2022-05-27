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
import { RootStateOrAny, useSelector } from "react-redux";
import Link from "next/link";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const { User } = useSelector((state: RootStateOrAny) => state?.userReducer)


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
                        <h3>Your earning this monthe</h3>
                      </div>
                      <div className="aisdad-j3n2eidaw">
                        <h2>$454.55</h2>
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
                    value="05"
                    color={"#FCCE40"}
                    strokeColor="#E1A902"
                  />
                </div>
                <div className="njadfskdfns-dsfsad">
                  <Chart1
                    label="Total students"
                    value="105"
                    color={"#03BCD4"}
                    strokeColor="#0BACC0"
                  />
                </div>
                <div className="njadfskdfns-dsfsad">
                  <Chart1
                    label="Revenue"
                    value="$45k"
                    color={"#5469C9"}
                    strokeColor="#2C42A5"
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
