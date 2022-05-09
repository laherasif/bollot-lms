import type { NextPage } from "next";
import { useIntl } from "react-intl";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { Dropdown, Spinner } from "react-bootstrap";
import { IoMailOutline } from "react-icons/io5";
import Chart from "../../../../src/components/student/chart";
import Chart1 from "../../../../src/components/student/chart1";
import BarChart from "../../../../src/components/student/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/student/CourseCard1";
import { db } from "../../../../src/confiq/firebase/firebase";
import { useEffect, useState , useRef } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import axios from "axios";
import { RootStateOrAny, useSelector } from "react-redux";
import moment from "moment";

const options = ["one", "two", "three"];

const Home: NextPage = () => {
  // const intl = useIntl();

  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState([])
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [state, setState] = useState('')
  const ScrollRef = useRef<HTMLDivElement>(null);
    const { token, User } = useSelector(
    (state: RootStateOrAny) => state?.userReducer
  );

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: "https://dev.thetechub.us/bolloot/",
    headers: {
      token: token,
    },
  });
  


  useEffect(() => {
    if (ScrollRef.current) {
      ScrollRef.current.scrollIntoView({ behavior: "smooth", });
    }
  }, [messages , loading])



  useEffect(() => {
    let fetchMesg = async () => {
      try {
        setLoader(true)
        let res = await AxInstance.post('api//get-conversations')
        if (res.data.success === true) {
          setLoader(false)
          setConversation(res.data.response.conversations)

        }
      }
      catch (err) {
        console.log("err", err)
      }
    }
    fetchMesg()
  }, [])


  let instructors: any = []
  conversation.filter(function (k: any) {
    if (k.user_details.email === User.email) {
      instructors.push(k.user_two_details)
    }
    else {
      return k.user_details
    }
    return k
  });


  let find = conversation.filter(function (k: any) {
    if (k.user_id == User.id) {
      return k
    }
  });

  console.log("find", find)





  const getMessages = async (data: any, id: number) => {
    setUser(data)
    let value = {
      conversation_id: id,
      page_no: 1,
      rows_per_page: 10
    }

    try {
      setLoading(true)
      let res = await AxInstance.post('api//get-messages', value)
      setMessages(res.data.response.messages)
      setLoading(false)
      
    }
    catch (err) {

    }
  }


  const SendMessage = async () => {
    let value = {
      to_user_id: user.id,
      message: state,
    }

    try {
      // setLoading(true)
      let res = await AxInstance.post('api//send-message', value)
      setMessages([...messages, res.data.response.message])
      setState('')
      // setLoading(false)
    }
    catch (err) {

    }
  }


  console.log("mesage", messages)





  return (
    <>
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="dash-board-1">
          <Sidebar />
          <div className="dash-2">
            <div className="my-course">
              <TopNavbar />
              <div className="hdsf0s-sadmsa">
                <div>
                  <h3>Inbox</h3>
                </div>


              </div>
              <br />

              {/* <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="maxima ">
                      <div className="idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          Messages
                        </button>
                      </div>
                      <div>
                        <button className="upload-1" onClick={() => newChat()}>Add</button>
                      </div>

                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Assignments</button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Announcements</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="d-flex justify-content-between align-items-center">
                <div className="card-daskfj-e dskfajs-asjds" style={{ position: 'relative' }}>
                  <div className="dsnodi-sdjsad">
                    <FiSearch color="#8A8A8A" size={17} />
                    <input type="text" placeholder="Search" />
                  </div>
                  {conversation?.length ? conversation?.map((ins: any, index: number) => {
                    if (ins?.user_id == User?.id)
                      return (
                        <div className="user-card-inbox" onClick={() => getMessages(ins.user_two_details, ins.id)} key={index}>
                          <div className="user-card-inbox-inner">
                            <img src={ ins?.user_two_details?.image || "/assets/images/umpire-1.svg"} />
                            <div>
                              <h3>{ins?.user_two_details?.fullname}</h3>
                              <p>{ins?.user_two_details?.tagline}</p>
                            </div>
                          </div>
                          <div>
                            <p>12 Jun</p>
                          </div>
                        </div>
                        // <UserChatCard users={ins.user_two_details} key={index} handleClick={(value) => getMessages(value)} />
                      )
                  })
                    :
                    <div className="spinner-chatbox">
                      <Spinner animation="border" />
                    </div>
                  }



                </div>
                <div className="card-daskfj-e kjadsfl-sajdfiwew">
                  {messages && messages.length || loading === true ?
                    <>
                      <div className="d-flex justify-content-between kjhadfd-sdfas ">
                        <div className="user-card-inbox-inner kjhadfd-sdfas">
                          <div>
                            <h3>{user?.fullname} </h3>
                            <p>Last active: 10 min ago</p>
                          </div>
                        </div>
                        <div className="pos-redsfnds">
                          <div className="assahdwe0-ass">
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

                      </div>

                      <div className="kdsjfosd-jdamw3e" >
                        {loading ?
                          <div className="spinner-chatbox">
                            <Spinner animation="border" />
                          </div>
                          :
                          messages?.map((ms: any, index: number) => (
                            <div className="user-card-inbox mt-0" key={index} ref={ScrollRef}>
                              <div className="user-card-inbox-inner" >
                                <img src={User.id ? User.image : user.image} />
                                <div>
                                  <h3 style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    {user?.fullname}
                                    <span className="data-time">{moment(ms.createdAt).format('ll')}</span>

                                  </h3>
                                  {ms.message}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div />
                      </div>
                      <div className="kasdjfsdsa-ewds">
                        <input placeholder="Write a message" name="state " value={state} onChange={(e) => setState(e.target.value)} type="text" />
                        <div onClick={() => SendMessage()}>
                          <i className="fa fa-paper-plane" ></i>

                        </div>
                      </div>

                    </>
                    :
                    <div>
                      <p className="select-mesage">Please Select Conversation to start Chat </p>
                    </div>
                  }
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
