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
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
    <NavigationBar1/>
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar/>
              <div className="hdsf0s-sadmsa">
              <h3 className="lsjadf-sadnsd">
                <span>Hi Tam Tran,</span>
              </h3>
              <h3>Welcome back👋</h3>
              </div>
              <div className="d-flex flex-wrap my-5" >
              <div className="njadfskdfns-dsfsad">
              <Chart1 label="Inprogress" value="04" color={"#FCCE40"} strokeColor="#E1A902"/>

              </div>
              <div className="njadfskdfns-dsfsad">
              <Chart1 label="Completed" value="10" color={"#03BCD4"} strokeColor="#0BACC0"/>

              </div>
              <div className="njadfskdfns-dsfsad">
              <Chart1 label="Total Enrolled" value="15" color={"#5469C9"} strokeColor="#2C42A5"/>

              </div>
              </div>
            <div className="d-flex w-100 kafsdfidsa-fen">
            <div className="w-100 kdsafjdas-sadn">
                <h5 className="jdiofsdf-fndsf">Daily Learning Activity</h5>
                  <div className="odsafoskdf-dsnaier">
                  <Chart/>
                  </div>
              </div>
              <div className="w-100 diafdsfi-dsaf">
                <h5 className="jdiofsdf-fndsf">Weekly Status</h5>
                  <div className="odsafoskdf-dsnaier">
                    <h5 className="sanfkf-dafn">From Jan 10-18</h5>
                  <BarChart/>
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
    </>
  );
};

export default withAuth(Home);
