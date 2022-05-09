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


  const handleScroll = (e) => {
    console.log(e.target.documentElement.scrollTop);
    console.log(window.innerHeight);
    console.log(e.target.documentElement.scrollHeight);
    // console.log(
    //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
    // );
    // const scrollHeight = e.target.documentElement.scrollHeight;
    // const currentHeight = Math.ceil(
    //   e.target.documentElement.scrollTop + window.innerHeight
    // );
    // if (currentHeight + 1 >= scrollHeight) {
    //   loadTenPokemon();
    // }
  };

  // useEffect(() => {
  //   // loadTenPokemon();
  //   window.addEventListener("scroll", handleScroll);
  // }, []);




  useEffect(() => {
    if (ScrollRef.current) {
      ScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages, loading])






  useEffect(() => {
    let fetchMesg = async () => {
      try {
        setLoader(true)
        let res = await AxInstance.post('api//get-conversations')
        console.log("res", res)
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

    console.log("value", value)

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


  // const fetchMoreData = () => {
  //   if (messages.length >= 500) {
  //     // this.setState({ hasMore: false });
  //     return;
  //   }
  //   // a fake async api call like which sends
  //   // 20 more records in .5 secs
  //   setTimeout(() => {
  //     alert("heellow")
  //   }, 500);
  // };



  console.log("mesage", messages)

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
                    :
                    <div className="spinner-chatbox">
                      <Spinner animation="border" />
                    </div>
                  }



                </div>
                <div className="card-daskfj-e kjadsfl-sajdfiwew">
                  {messages && messages.length  ?
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

                      {/* <div id="scrollableDiv" style={{
                        height: 300,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column"
                      }}>
                        <InfiniteScroll
                          dataLength={messages.length}
                          next={fetchMoreData}
                          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                          inverse={false} //
                          hasMore={true}
                          loader={<h4>Loading...</h4>}
                          scrollableTarget="scrollableDiv"
                          // below props only if you need pull down functionality
                          refreshFunction={fetchMoreData}
                          pullDownToRefresh
                          pullDownToRefreshThreshold={50}
                          pullDownToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8595;</h3>
                          }
                          releaseToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8593;</h3>
                          }
                        >

                           { messages?.map((ms: any, index: number) => (
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

                        </InfiniteScroll>
                      </div> */}



                      <div className="kdsjfosd-jdamw3e" >
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
    </div>
  );
};

export default Home;
