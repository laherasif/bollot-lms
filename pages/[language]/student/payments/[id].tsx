import type { NextPage } from "next";
import Dropdown from "../../../../src/components/student/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/student/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import CourseCard from "../../../../src/components/student/CourseCard";
import BookmarkCard from "../../../../src/components/student/BookmarkCard";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import Link from "next/link";
import BarChart1 from "../../../../src/components/student/barchart1";
import withAuth from "../../../../src/components/Hoc/authRoute";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <h3>Settings</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst">
                      <div className="maxima">
                        <Link href="/en/settings">
                          <button className="upload-1 ">
                            Account Security
                          </button>
                        </Link>
                        <button className="upload-1 sdisad-dsdactive">
                          Payment
                        </button>
                        <button className="upload-1">Notification</button>
                        <button className="upload-1">Manage Devices</button>
                        <button className="upload-1">Close Account</button>
                      </div>
                    </div>
                  </div>
                  <div className="hjsaisa-sdnjassd">
                    <h5>Choose a Payment Method</h5>
                    <div className="d-flex-1">
                      <div className="cst-c-card sjdsa-sadssc3">
                        <div className="cst-c-card jidsa-dsnwiwdx sf-sdsdx22e">
                          <div className="sjadksa-sdd">
                            <Icons name="c48" />
                          </div>
                          <div className="jdsa0-sdsmd">
                            <div className="jsodisd-dsd">
                              <img src="/assets/images/pay-1.svg" alt="" />
                              <p>
                                Your paypal account has been authorized for
                                checkout at Bollot
                              </p>
                            </div>
                            <div className="skansd-dsdc">
                              <button>Deauthorize</button>
                            </div>
                          </div>
                        </div>
                        <div className="jdsoisd-sawe">
                          <div className="cst-c-card jidsa-dsnwiwdx cjskdf-sddsa">
                            <div className="sjadksa-sdd">
                              <Icons name="c49" />
                            </div>
                            <div className="jdsa0-sdsmd">
                              <div className="jsodisd-dsd">
                                <img src="/assets/images/debit.svg" alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="cst-c-card jidsa-dsnwiwdx cjskdf-sddsa">
                            <div className="sjadksa-sdd">
                              <Icons name="c49" />
                            </div>
                            <div className="jdsa0-sdsmd">
                              <div className="jsodisd-dsd">
                                <img src="/assets/images/google.svg" alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="cst-c-card jidsa-dsnwiwdx cjskdf-sddsa cjskdf-sddsa-1">
                            <div className="jdsa0-sdsmd">
                              <div className="jsodisd-dsd jdsaod-sawesc d-flex align-items-center">
                                <Icons name="c47" />
                                <p>Add new Method</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cst-c-card pioner-ch nkjdsa-snefds">
                        <BarChart1 />
                        <h3>Total Balance</h3>
                        <h2>$454.55</h2>
                        <button className="withdraw">Withdraw</button>
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

export default withAuth( Home );
