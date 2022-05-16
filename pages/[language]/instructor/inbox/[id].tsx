import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { Spinner, Dropdown } from "react-bootstrap";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Chart from "../../../../src/components/instructor/chart";
import Chart1 from "../../../../src/components/instructor/chart1";
import BarChart from "../../../../src/components/instructor/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { RootStateOrAny, useSelector } from "react-redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { pusher } from '../../../../src/confiq/pusher/pusher'
const options = ["one", "two", "three"];


const Home: NextPage = () => {
  // const intl = useIntl();

  const [messages, setMessages] = useState([])
  const [messagess, setMessagess] = useState([])
  const [conversation, setConversation] = useState([])
  const [user, setUser] = useState('')
  const [convId, setConvId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loaders, setLoaders] = useState(false)
  const [state, setState] = useState('')
  const [page, setPages] = useState(1)
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
    const channel = pusher.subscribe("messages-channel");
    channel.bind('new-message', function (data: any) {
      debugger

      const { message } = data
      setMessages((prevState: any) => [
        message,
        ...prevState,
      ]);
      // setMessages([message, ...messages]) 
      // setMessages([...messages, message])

    });

    return () => {
      pusher.unsubscribe("messages-channel");
    };




  }, []);


  console.log("messages", messages)


  // useEffect(() => {
  //   if (ScrollRef.current) {
  //     ScrollRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [messages, loading])





  useEffect(() => {
    let fetchMesg = async () => {
      try {
        setLoaders(true)
        let res = await AxInstance.post('api//get-conversations')
        console.log("res", res)
        if (res.data.success === true) {
          setLoaders(false)
          setConversation(res.data.response.conversations)

        }
      }
      catch (err) {
        console.log("err", err)
      }
    }
    fetchMesg()
  }, [])





  const getMessages = async (data: any, id: number) => {
    setUser(data)
    setConvId(id)
    setPages(1)
    let value = {
      conversation_id: id,
      page_no: 1,
      rows_per_page: 10
    }

    try {
      page > 1 ? setLoading(true) : setLoader(true)
      let res = await AxInstance.post('api//get-messages', value)
      setMessages(res.data.response.messages)
      page > 1 ? setLoading(false) : setLoader(false)


    }
    catch (err) {

    }
  }


  const SendMessage = async () => {
    let value = {
      to_user_id: user.id,
      message: state,
    }

    console.log("value", value)

    try {
      // setLoading(true)
      let res = await AxInstance.post('api//send-message', value)
      // setMessages([res.data.response.message, ...messages])
      setState('')
      // setLoading(false)
    }
    catch (err) {

    }
  }


  const fetchMoreData = async () => {

    setPages(page + 1)


    let value = {

      conversation_id: convId,
      page_no: page + 1,
      rows_per_page: 10
    }

    try {

      setLoading(true)
      let res = await AxInstance.post('api//get-messages', value)
      console.log(res)
      if (res.data.success === true) {
        setMessages([...messages, ...res.data.response.messages])
        setLoading(false)
      }
      else {
        setLoading(false)

      }


    }
    catch (err) {

    }
  };



  console.log("messages", messages)

  return (
    <div className="inst">
      <NavigationBar1 />
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
                  <Link href="/en/instructor/courses">
                    <h3 style={{ cursor: 'pointer' }}>
                      <i className="fa fa-arrow-left"></i>
                      Back</h3>
                  </Link>
                  <h3>Inbox</h3>
                </div>


              </div>

              <div className="complete-web-1 ">
                <div className="umpire w-100">
                  <div className="umpire-1 umpire-1-cst ">
                    <div className="maxima ">
                      <div className="idfadsf-sads">
                        <button className="upload-1 sdisad-dsdactive">
                          Messages
                        </button>
                      </div>


                      {/* <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Assignments</button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Announcements</button>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="card-daskfj-e dskfajs-asjds" style={{ position: 'relative' }}>
                  <div className="dsnodi-sdjsad">
                    <FiSearch color="#8A8A8A" size={17} />
                    <input type="text" placeholder="Search" />
                  </div>
                  {conversation?.length ? conversation?.map((ins: any, index: number) => {
                    if (ins?.user_two_id == User?.id)
                      return (
                        <div className="user-card-inbox" onClick={() => getMessages(ins.user_details, ins.id)} key={index}>
                          <div className="user-card-inbox-inner">
                            <img src={ins?.user_details?.image || "/assets/images/umpire-1.svg"} />
                            <div>
                              <h3>{ins?.user_details?.fullname}</h3>
                              <p>{ins?.user_details?.tagline}</p>
                            </div>
                          </div>
                          <div>
                            <p>{moment(ins.createdAt).format('ll')}</p>
                          </div>
                        </div>
                        // <UserChatCard users={ins.user_two_details} key={index} handleClick={(value) => getMessages(value)} />
                      )
                  })
                    : ""
                    // <div>No conversation </div>
                  }
                  {loaders ?
                    <div className="spinner-chatbox">
                      <Spinner animation="border" />
                    </div>
                    : null}



                </div>
                <div className="card-daskfj-e kjadsfl-sajdfiwew">
                  {messages && messages.length || loader === true ?
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
                      {loader ?
                        <div className="spinner-message" style={{ textAlign: 'center', marginTop: '4rem' }}>
                          <Spinner animation="border" />
                        </div>
                        :
                        <>

                          <div id="scrollableDiv" style={{
                            height: '82%',
                            overflowY: "scroll",
                            display: "flex",
                            flexDirection: "column-reverse"
                          }}>
                            <InfiniteScroll
                              dataLength={messages.length}
                              next={fetchMoreData}
                              style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'hidden' }}
                              inverse={true}
                              hasMore={true}
                              loader={loading ? <div style={{ textAlign: 'center', zIndex: 2, marginTop: '20px' }}><Spinner animation="border" /> </div> : ''}
                              scrollableTarget="scrollableDiv"


                            >

                              {messages ? messages?.map((ms: any, index: number) => {
                                return (
                                  <div className="user-card-inbox mt-0" key={index}   >
                                    <div className="user-card-inbox-inner" >
                                      <img src={ms?.sender.image} />
                                      <div>
                                        <h3 style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                          {ms?.sender?.fullname}
                                          <span className="data-time">{moment(ms.createdAt).format('ll')}</span>
                                        </h3>
                                        {ms?.message}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                                : null
                              }



                            </InfiniteScroll>


                          </div>
                          <div className="kasdjfsdsa-ewds">
                            <input placeholder="Write a message" name="state " value={state} onChange={(e) => setState(e.target.value)} type="text" />
                            <div onClick={() => SendMessage()}>
                              <i className="fa fa-paper-plane" ></i>

                            </div>
                          </div>
                        </>
                      }



                      {/* <div className="kdsjfosd-jdamw3e" >
                        {loading ?
                          <div className="spinner-chatbox">
                            <Spinner animation="border" />
                          </div>
                          :
                          messages?.map((ms: any, index: number) => (
                            <div className="user-card-inbox mt-0" key={index} ref={ScrollRef}>
                              <div className="user-card-inbox-inner" >
                                <img src={ms.from_user_id === User.id ? User.image : user.image} />
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
                      </div> */}

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
    </div>
  );
};

export default Home;
