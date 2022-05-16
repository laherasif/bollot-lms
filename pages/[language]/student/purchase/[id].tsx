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

const options = ["one", "two", "three"];
const Home: NextPage = () => {
  // const intl = useIntl();

  const [transtion, setTransaction] = useState([])

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
        let res = await AxInstance.get(`api//student/transactions`)
        setTransaction(res.data.response.transactions)
      }
      catch (err) {

      }

    }
    fetchPayment()
  }, [courseId])

  console.log("tr" , transtion)

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
                <h3>My purchase</h3>
                <div className="complete-web-1">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst">
                      <div className="maxima">
                        <button className="upload-1">Transactions</button>
                        <button className="upload-1">Refund</button>
                        <button className="upload-1">Vouchers</button>
                      </div>
                    </div>
                  </div>
                  <div className="pay-method">
                    <h4>Purchase date</h4>
                    <h4>Refund deadline</h4>
                  </div>
                  <div className="seting-method-payment">
                    {transtion && transtion ? transtion.map((list: any, index: number) => (
                      <div className="complete-web-1" key={index }>
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
    
                            <div className="jaskdaosd-sadsa">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <img src="/assets/images/black..svg" alt="" />
                                </Dropdown.Toggle>
    
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    Action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    Another action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">
                                    Something else
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="certificate">
                            <h4>Course:</h4>
                            {/* <h5>Earn before 01 Jul 2022</h5> */}
                          </div>
                          <div className="start-list-item">
                            <ul>
                              {list?.checkout?.courses?.map((item:any) => (
                              <li key={item.id}>
                               {item?.course?.title}
                              </li>
                              ))}
                              
                            </ul>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    )) : null }
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
