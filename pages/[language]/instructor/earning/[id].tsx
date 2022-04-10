import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
import { Dropdown } from "react-bootstrap";
// import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
// import TopNavbar from "../../../src/components/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import Chart from "../../../src/components/chart";
// import Chart1 from "../../../src/components/chart1";
import BarChart from "../../../../src/components/instructor/barchart3";
// import BarChart1 from "../../../src/components/barchart1";
// import Link from "next/link";
// import CourseCard from "../../../src/components/CourseCard1";
import  PieChart  from '../../../../src/components/instructor/pieChart';
import withAuth from "../../../../src/components/Hoc/authRoute";
const options = ["one", "two", "three"];

const UserChatCard = () => {
  return (
    <div className="user-card-inbox">
      <div className="user-card-inbox-inner">
        <img src="/assets/images/umpire-1.svg" />
        <div>
          <h3>John Doe</h3>
          <p>Me: What is difficulty...</p>
        </div>
      </div>
      <div>
        <p>12 Jun</p>
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
      <div className="jcoiasd03-eakw3e1">
        <Sidebar />
        </div>
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course kadjsfs3e0we-112x">
              <div className="hdsf0s-sadmsa">
                <div>
                  <h3>Earnings Report</h3>
                </div>

                <div className="idfadsf-sads adsjkfdsao-sadsk">
                  <h5>Withdraw to:</h5>
                  <button className="upload-1 sdisad-dsdactive">
                    <img src="/assets/images/payoneer.png" />
                    Payoneer
                  </button>
                  <button className="upload-1 sdisad-dsdactive">
                    {" "}
                    <img src="/assets/images/payoneer.png" /> Bank Account
                  </button>
                  <button className="upload-1 sdisad-dsdactive">
                    {" "}
                    <img src="/assets/images/paypal.png" /> Paypal
                  </button>
                </div>
              </div>
              <div className="aidsisaf-ajes3di8d">
              <div className="hjsaisa-sdnjassdsdas">
                <div className="kjdaf-sadasnqeow-samd">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Earnings Report</h5>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Last 06 months
                        <Icons name="i8" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="jagodis-3jendsd">
                  <div className="jfadsof-sadnfe">
                    <div>
                      <h2>$454.55</h2>

                      <div className="sjasd-3edwmsa9">
                        <img src="/assets/images/Group 6168.png" />
                        <p>Your total earnings</p>
                      </div>
                      <h3>Update your payout method in Settings</h3>
                    </div>
                    <div className="w-100 cladsf-asdk3emd">
                      <BarChart />
                    </div>
                  </div>
                  <div className="kajfds-adsnfwej">
                    <div className="mkdsof0sa-dokwe kjfahdsf-asdda">
                      <div className="d-flex align-items-center kdasfnodpas-ke3maws">
                        <div className="mksafsd-askwe">
                          <Icons name="i17" />
                        </div>
                        <p>Pending Clearence</p>
                      </div>
                      <h4>$550.55</h4>
                    </div>
                    <div className="mkdsof0sa-dokwe kjfahdsf-asdda">
                      <div className="d-flex align-items-center kdasfnodpas-ke3maws">
                        <div className="mksafsd-askwe">
                          <Icons name="i18" />
                        </div>
                        <p>Used for purchase</p>
                      </div>
                      <h4>$22.55</h4>
                    </div>
                    <div className="mkdsof0sa-dokwe">
                      <div className="d-flex align-items-center kdasfnodpas-ke3maws">
                        <div className="mksafsd-askwe">
                          <Icons name="i19" />
                        </div>
                        <p>Available for withdrawl</p>
                      </div>
                      <h4>$124.55</h4>
                    </div>
                  </div>
                  </div>
                 
                </div>
              </div>
              <div className="kdasjfs-aj3wesdjxsw">
                <div className="jasdf0s-adadsf3j">
                <PieChart/>
                <h4>Earnings by course</h4>
                <h3>$454.55</h3>
                </div>
                <div>
                <div className="iadfs0a3-eijdsan-213">
                  <div className="iadfs0a3-eijdsan"></div>
                  <p>Complete Web & Mobile Designer in 2022</p>
                </div>
                <div className="iadfs0a3-eijdsan-213">
                  <div className="iadfs0a3-eijdsan1"></div>
                  <p>Motion Design with Figma: Animations, 
Motion Gra...</p>
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

export default withAuth(Home);
