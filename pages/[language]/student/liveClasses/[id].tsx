import type { NextPage } from "next";
import Sidebar from "../../../../src/components/student/sidebar";
import TopNavbar from "../../../../src/components/student/TopNavbar";
import NavigationBar1 from "../../../../src/components/student/NavigationBar1";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'
import axios from 'axios'
import moment from "moment";
import { Small } from '../../../../src/components/student/loader'
import Link from "next/link";
const Home: NextPage = () => {
  // const intl = useIntl();

  const router = useRouter()

  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(false)
  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  let CourseId = router.query.id

  useEffect(() => {
    let fetchQuiz = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//student/my-live-courses/schedule/${CourseId}`)
        console.log("REs", res)
        if (res.data.success === true) {
          setLoading(false)
          setQuiz(res.data.response.course_with_schedule)
        }

      } catch (error) {

      }

    }
    fetchQuiz()
  }, [CourseId])

  console.log("res", quiz)


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
                  <Link href="/en/student/courses">
                    <h3 style={{ cursor: 'pointer' }}>
                      <i className="fa fa-arrow-left"></i>
                      Back
                    </h3>
                  </Link>
                  <h3>Schedule of upcoming classes </h3>
                  <div className="complete-web-1">
                    <div className="umpire w-100">

                    </div>

                    <div className="seting-method-payment">
                      <div className="first-payment-1">


                        <div className="row">
                          <div className="col-lg-12">
                            <div className="card">
                              <div className="card-body">
                                <div className="active-member">
                                  <div className="table-responsive" style={{ height: '400px' }}>
                                    <table className="table table-xs mb-0" >
                                      <thead>
                                        <tr>
                                          <th>Sedule #</th>
                                          <th>Date</th>
                                          <th>Start Time</th>
                                          <th>End Time</th>
                                          <th>Hours</th>
                                          <th>Meeting Link</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {quiz && quiz?.schedule?.length ? quiz?.schedule?.map((s: any, i: numeber) => (
                                          <tr key={i}>
                                            <td>

                                              {i + 1}
                                            </td>
                                            <td>{moment(s?.date).format("LL")}</td>
                                            <td>
                                              <span>{s?.from_time}</span>{" "}
                                            </td>
                                            <td>
                                              <span>{s?.to_time}</span>
                                            </td>
                                            <td>
                                              <span>{s?.hours}</span>
                                            </td>
                                            <td style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                              <div className="d-flex ">
                                                <button onClick={() => window.open(s?.zoom_url_for_students)} className="upload-1 sdisad-dsdactive">Connect on Zoom</button>
                                              </div>
                                              <div style={{ display: 'flex', flexDirection: 'column' , paddingLeft:'20px' }}>
                                                <h5>Alternate :</h5>{" "}
                                                <span className="m-0 pl-3">
                                                  zoom meeting id :  {s?.zoom_meeting_id}
                                                </span>
                                                <span className="m-0 pl-3">
                                                  meeting Password  :  {s?.zoom_meeting_password}
                                                </span>
                                              </div>
                                            </td>
                                          </tr>

                                        ))
                                          : <div>Record Not Found</div>
                                        }


                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
  )
}

// export const getServerSideProps = async ({ params }: any) => {

//   const res = await instance.get(
//     `api//courses/${params.id}`,
//   );
//   return {
//     props: {
//       Course: res.data.response.course,
//     },
//   };
// };


export default Home