import type { NextPage } from "next";
import Dropdown from "../../../../src/components/instructor/dropdown";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import BookmarkCard from "../../../../src/components/instructor/BookmarkCard";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar1";
import Link from "next/link";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  const intl = useIntl();

  return (
    <>
    <NavigationBar1/>
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
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="maxima">
                        <button className="upload-1 sdisad-dsdactive">Account Security</button>
                        <Link href="/en/payments">
                        <button className="upload-1">Payment</button></Link>
                        <button className="upload-1">Notification</button>
                        <button className="upload-1">Manage Devices</button>
                        <button className="upload-1">Close Account</button>
                      </div>
                    </div>
                  </div>
                  <div className="sdkahfsndj-sadsd">
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Email
                      </label>
                      <div className="skdajfs-dsdhnsd">
                        <input type="text" placeholder="johndoe@gmail.com" />
                        <div className="sjs0dskd-dsfs">
                          <button>
                            <svg
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.6792 4.8L6.73248 16.3867C6.31915 16.8267 5.91915 17.6933 5.83915 18.2933L5.34582 22.6133C5.17248 24.1733 6.29248 25.24 7.83915 24.9733L12.1325 24.24C12.7325 24.1333 13.5725 23.6933 13.9858 23.24L24.9325 11.6533C26.8258 9.65334 27.6792 7.37334 24.7325 4.58667C21.7992 1.82667 19.5725 2.8 17.6792 4.8Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.8535 6.73334C16.4268 10.4133 19.4135 13.2267 23.1202 13.6"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 29.3333H28"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="label-bar-1">
                      <label className="mb-5cst"  >
                        Password
                      </label>
                      <div className="skdajfs-dsdhnsd">
                        <input type="text" placeholder="......" />
                        <div className="sjs0dskd-dsfs">
                          <button>
                            <svg
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.6792 4.8L6.73248 16.3867C6.31915 16.8267 5.91915 17.6933 5.83915 18.2933L5.34582 22.6133C5.17248 24.1733 6.29248 25.24 7.83915 24.9733L12.1325 24.24C12.7325 24.1333 13.5725 23.6933 13.9858 23.24L24.9325 11.6533C26.8258 9.65334 27.6792 7.37334 24.7325 4.58667C21.7992 1.82667 19.5725 2.8 17.6792 4.8Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.8535 6.73334C16.4268 10.4133 19.4135 13.2267 23.1202 13.6"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 29.3333H28"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hjsaisa-sdnjassd">
                    <h5>Linked Accounts</h5>
                    <div className="logo-2 sadjasoad-sad">
                      <button>
                       <Icons name="c46"/>
                        <p>Link with Facebook</p>
                      </button>
                      <button>
                      <Icons name="c45"/>

                        <p>Link with Google</p>
                      </button>
                    </div>
                    <div className="logo-2 sadjasoad-sad1 ">
                      <button>
                        <Icons name="c44"/>
                        <p style={{color:'black'}}>Link with Apple</p>
                      </button>
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

export default Home;
