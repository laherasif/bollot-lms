import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { Dropdown } from "react-bootstrap";
import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/instructor/TopNavbar";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
import Chart from "../../../../src/components/instructor/chart";
import Chart1 from "../../../../src/components/instructor/chart1";
import BarChart from "../../../../src/components/instructor/barchart";
import Link from "next/link";
import CourseCard from "../../../../src/components/instructor/CourseCard1";
import { db } from "../../../../src/confiq/firebase/firebase";
import { useEffect, useState } from "react";
import { useCollection , useDocumentData  , useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc , doc, orderBy, query , serverTimestamp } from "@firebase/firestore";
const options = ["one", "two", "three"];

const UserChatCard = () => {





  return (
    <div className="user-card-inbox">
      <div className="user-card-inbox-inner">
        <img src="/assets/images/umpire-1.svg" />
        <div>
          <h3>gurulaher@gmail.com</h3>
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

  const [messages, setMessages] = useState([])
  const [snapshot, loading, error] = useCollection(collection(db, "Users"));
  const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log("chats" , chats)

  // const chatExists = email => chats?.find(chat => (chat.includes(email)))

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    // if (!chatExists(input) && (input != user.email)) {
    await addDoc(collection(db, "Users"), { students: ["asifali@gmail.com"] })
    // }
  }

  // const getMessages = () =>
  //   messages?.map(msg => {
  //     const sender = msg.sender === user.email;
  //     return (
  //       <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
  //         <Text>{msg.text}</Text>
  //       </Flex>
  //     )
  //   })

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   await addDoc(collection(db, `chats/${id}/messages`), {
  //     text: input,
  //     sender: user.email,
  //     timestamp: serverTimestamp()
  //   })
  //   setInput("");
  // }


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
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="card-daskfj-e dskfajs-asjds">
                  <div className="dsnodi-sdjsad">
                    <FiSearch color="#8A8A8A" size={17} />
                    <input type="text" placeholder="Search" />
                  </div>
                  {/* {
                    chats?.filter(chat => chat.students.includes("gurulaher@gmail.com"))
                      .map((chat) => (
                        <UserChatCard />

                      ))
                  } */}
                  {/* {
                     chats?.filter(chat => chat.users.includes(user.email))
                     .map(
                       chat => 
                     )
  )
                  } */}
                        <UserChatCard />

                </div>
                <div className="card-daskfj-e kjadsfl-sajdfiwew">
                  <div className="user-card-inbox kjhadfd-sdfas ">
                    <div className="user-card-inbox-inner kjhadfd-sdfas">
                      <div>
                        <h3>John Doe</h3>
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
                  <div className="kdsjfosd-jdamw3e">
                    <UserChatCard />
                    <UserChatCard />
                    <UserChatCard />
                  </div>
                  <div className="kasdjfsdsa-ewds">
                    <Icons name="i14" />
                    <input placeholder="Write a message" type="text" />
                    <Icons name="i15" />
                    <Icons name="i16" />
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

export default Home;
