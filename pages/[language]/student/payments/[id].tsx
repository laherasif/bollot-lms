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
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { LogoutIns } from "../../../../src/redux/actions/auth/user";
import { Small } from "../../../../src/components/student/loader";
const options = ["one", "two", "three"];

const Home: NextPage = () => {

  //State Hook
  const [loading, setLoading] = useState(true)

  // Redux Dispatch Action Hook
  const dispatch = useDispatch()

  // Redux Access State Hook 
  const { Payment } = useSelector((state: RootStateOrAny) => state.studentCourse)
  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)


  // Router Hook
  const router = useRouter()



  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });


  // UseEffect React Hook

  useEffect(() => {
    // Timer Stopper function
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])


  //  User Account Delete function 
  const DelAccount = () => {
    Swal.fire({
      title: 'Are your sure?',
      text: "You want to delete this account?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes"

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AxInstance.get('api//delete-my-account')
          .then(res => {
            Swal.fire({
              title: "Done!",
              text: res.data.message,
              icon: "success",
              // timer: 2000,
              // button: false
            })
            dispatch(LogoutIns())
            router.push('/en/login')
          });
      } else if (result.isDenied) {
        Swal.fire('Account account are not deleted', '', 'info')
      }
    })

  }


  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small() :
                <div className="hdsf0s-sadmsa">
                  <h3>Payments</h3>
                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst">
                        <div className="maxima">
                          <Link href="/en/student/settings">
                            <button className="upload-1 " >Account Security</button>
                          </Link>
                          <button className="upload-1 sdisad-dsdactive" id="activetab">Payment</button>
                          <Link href="/en/student/notification">
                            <button className="upload-1">Notification</button>
                          </Link>
                          <Link href="/en/student/device">
                            <button className="upload-1">Manage Devices</button>
                          </Link>
                          <button className="upload-1" onClick={() => DelAccount()}>Close Account</button>
                        </div>
                        {/* <div className="maxima">
                        <Link href="/en/settings">
                          <button className="upload-1 ">
                            Account Security
                          </button>
                        </Link>
                        <button className="upload-1 sdisad-dsdactive" id="activetab">
                          Payment
                        </button>
                        <button className="upload-1">Notification</button>
                        <button className="upload-1">Manage Devices</button>
                        <button className="upload-1">Close Account</button>
                      </div> */}
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
                          <h2>${Payment?.wallet_balance}</h2>
                          <button className="withdraw">Withdraw</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Home);
