import React, { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { SweetAlert } from '../../function/hooks'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Conversation from "./messageForm";
const CricculumSidebar = ({ lecture }: any) => {
    const [courseId, setCourseId] = useState(0)
    const [section, setSections] = useState([])
    const [conversation, setConversation] = useState(false)

    const router = useRouter()
    const { Lectures } = useSelector((state: RootStateOrAny) => state.studentCourse)
    console.log("lectures", Lectures)
    useEffect(() => {
        lecture(Lectures?.sections[courseId])
    }, [lecture])


    let courseTitle = router.query.id
    let path = router.asPath
    // console.log("router" , router )

    // const AxInstance = axios.create({
    //     // .. where we make our configurations
    //     baseURL: 'https://dev.thetechub.us/bolloot/',
    //     headers: {
    //         token: token
    //     }
    // });




    // useEffect(() => {
    //     let fetchCourse = async () => {
    //         try {
    //             let res = await AxInstance.get(`api//student/my-courses/${courseTitle}`)
    //             setSections(res.data.response.course)
    //             setCourseId(res.data.response.course.id)
    //         } catch (error) {
    //             SweetAlert({ icon: "error", text: error })

    //         }

    //     }
    //     fetchCourse()
    // }, [courseTitle])




    return (
        <>

            <div className="hsaid9iawdeka">
                <div>
                    <Link href={`/en/student/details/${Lectures?.slug}`}>

                        <h2 className={path === `/en/student/details/${courseTitle}` ? " ksdfhd-active activelink" : ""}>Content</h2>
                    </Link>

                    <div className="content-section" style={path === `/en/student/details/${courseTitle}` ? { display: 'block' } : { display: 'none' }}>
                        {Lectures && Lectures?.sections?.length ? Lectures?.sections?.map((sec: any, i: number) => {
                            return (
                                <div className="ksajdfds-sads" onClick={() => { lecture(sec?.lectures), setCourseId(i) }} key={i}>
                                    {i === courseId || sec?.is_completed === 1 ? (
                                        <svg
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx={9} cy={9} r={9} fill="#D0565C" />
                                            <path d="M4 9L6.5 12L13.5 5" stroke="white" />
                                        </svg>
                                    ) : (
                                        <svg
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx={9} cy={9} r="8.5" stroke="#D0565C" />
                                        </svg>
                                    )}
                                    <h3 style={{ paddingTop: '10px' }}>{sec?.title}</h3>
                                </div>
                            )


                        })
                            : <div className="px-4">Lectures not Avaliable </div>
                        }

                    </div>
                </div>
                {/* <div>
                <h2>Notes</h2>
              </div>
              <div>
                <h2>Announcements</h2>
              </div>
              <Link href={`/en/student/resource/${courseTitle}`}>
                <h2>Resources</h2>
              </Link>
              <div>
                <h2>Live Classes</h2>
              </div> */}
                <div onClick={() => setConversation(true)}>
                    <h2>Message to Instructor</h2>
                </div>
                <div>
                    <Link href={`/en/student/quiz/${courseId}`}>
                        <h2>Quiz</h2>
                    </Link>
                </div>
                <div className={path === `/en/student/codeEditor/${courseTitle}` ? " ksdfhd-active activelink" : ""}>
                    <Link href={`/en/student/codeEditor/${courseTitle}`}>
                        <h2>CodeEditor</h2>
                    </Link>
                </div>
                {/* <div>
                <h2>Review</h2>
              </div> */}
            </div>
            {conversation && <Conversation permition={conversation} Toggle={(value: any) => setConversation(value)} user_id={section?.instructor?.id} />}

        </>
    )



}


export default CricculumSidebar 