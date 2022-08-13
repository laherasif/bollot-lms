import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
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
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import RefundReason from '../../../../src/components/student/refundReason'
import Link from "next/link";
import { Small } from "../../../../src/components/student/loader";
import { SweetAlert } from "../../../../src/function/hooks";
const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [transtion, setTransaction] = useState([])
  const [refund, setRefund] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  const router = useRouter()

  const courseId = router.query.id


  useEffect(() => {
    let fetchPayment = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/refunds`)
        if (res.data.success === true) {
          setTransaction(res.data.response.transactions)
          setLoading(false)
        }
        else {
          setLoading(false)

        }

      }
      catch (error) {
        SweetAlert({ icon: "error", text: error })

      }

    }
    fetchPayment()
  }, [courseId])


  return (
    <>
      <NavigationBar1 />
      <section className="dash-board">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              {loading ? Small()
                :
                <div className="hdsf0s-sadmsa">

                  <div className="complete-web-1">
                    <div className="umpire w-100">
                      <div className="umpire-1 umpire-1-cst">
                        <div className="maxima">
                          <Link href="/en/student/purchase">
                            <button className="upload-1">Transactions</button>
                          </Link>
                          <Link href="/en/instructor/refund">
                            <button
                              className="upload-1  sdisad-dsdactive"
                              id="activetab"
                            >Refund</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="pay-method">
                      <h4>Purchase date</h4>
                      <h4>Refund deadline</h4>
                    </div>
                    <div className="seting-method-payment">
                      {transtion && transtion.length ? transtion.map((list: any, index: number) => (
                        <div className="complete-web-1" key={index}>
                          <div className="seting-method-payment">
                            <div className="first-payment-1">
                              <div className="special-bar">
                                {/* <h3>Course</h3> */}
                                {/* <h3>
                              <span>.</span>5 of 5 courses
                            </h3> */}
                              </div>
                              <div className="com-flex-1">
                                <h3>{list?.particular}</h3>
                                <h3>${list?.checkout?.amount}</h3>
                                <h4>{moment(list?.createdAt).format('ll')}</h4>
                                <h4>{moment(list?.refund_date).format('ll')}</h4>


                              </div>
                              <div className="certificate">
                                <h4>Course:</h4>
                                {/* <h5>Earn before 01 Jul 2022</h5> */}
                              </div>
                              <div className="start-list-item">
                                <ul>
                                  {list?.checkout?.courses?.map((item: any) => (
                                    <li key={item.id}>
                                      {item?.course?.title}
                                    </li>
                                  ))}

                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      )) : <div>Record not found</div>}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>


        {refund && <RefundReason
          permition={refund}
          Toggle={(value: any) => setRefund(value)} />}

      </section>
    </>
  );
};

export default withAuth(Home);
