import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/instructor/sidebar2";
import { FiSearch } from "react-icons/fi";
import NavigationBar1 from "../../../../src/components/instructor/NavigationBar3";
// import instance from "../../../../src/confiq/axios/instance";
import axios from 'axios'
import NewCourse from "../../../../src/components/instructor/newCourse";
import withAuth from "../../../../src/components/Hoc/authRoute";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

import { useRouter } from "next/router";



import { Main } from "../../../../src/components/instructor/loader";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { parse } from "date-fns";
const Home: NextPage = () => {
  // const intl = useIntl();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  let router = useRouter()

  let CourseId = router.query.id

  const { token } = useSelector((state: RootStateOrAny) => state?.userReducer)

  console.log("token", token)
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    let fetchCourse = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//instructor/courses/live-courses/schedule/${CourseId}`)
        if (res.data.success === true) {
          setCourses(res.data.response.course_with_schedule.schedule)
          setLoading(false)
        }
      } catch (error) {

      }
    }
    fetchCourse()
  }, [CourseId])


  const handleDateChange = (name: string, i: number, date: any) => {
    debugger
    let formValues: any = [...courses];
    formValues[i][name] = date;
    setCourses(formValues)


  }


  // const removeInputFields = (index: number, i: number) => {


  //   const list: any = [...courses];
  //   for (let j = 0; j < list.length; j++) {
  //     if (j === index) {
  //       const element = list[j];
  //       let find = element.lectures
  //       find.splice(i, 1)
  //     }

  //   }
  //   setCourses(list)
  // }

  const removeInputField = (index: number,) => {
    debugger
    const rows = [...courses];
    rows.splice(index, 1);
    setCourses(rows);


    setCourses(rows)
  }





  const addFormFields = () => {
    debugger

    //  courses?.schedule.push(  { date: '', from_time: '', to_time: '' })

    setCourses([...courses, { date: new Date(), from_time: '', to_time: '' }])
  }


  const SaveForm = async () => {
    try {

      let arr = [];
      for (let i = 0; i < courses.length; i++) {
        const element = courses[i];
        element.date = moment(element.date).format('YYYY-MM-DD')
        if (!element.id) {
          element.from_time = moment(element.from_time).format('HH:mm:ss'),
            element.to_time = moment(element.to_time).format('HH:mm:ss')
        }
        // let value = {  date: moment(element.date).format('YYYY-MM-DD'), from_time: moment(element.from_time).format('HH:mm:ss'), to_time: moment(element.to_time).format('HH:mm:ss') }
        // arr.concat(...element ,  value)
        arr.push(element)


      }

      let values = {
        course_id: CourseId,
        schedule: arr
      }
      console.log("values", values)

      let res = await AxInstance.post('api//instructor/courses/schedule/update', values)
      if (res.data.success === true) {
          // setLoading()
          router.push('/en/instructor/liveCourses')
      }
    }
    catch (err) { }
  }


  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="jcoiasd03-eakw3e1">
          <Sidebar />
        </div>
        {loading ? Main()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">
                  <div>
                    <Link href='/en/instructor/liveCourses'>
                      <h3 style={{ cursor: 'pointer' }}>
                        <i className="fa fa-arrow-left "></i>
                        Back
                      </h3>
                    </Link>
                    <h3 className="ml-2">My Live Courses</h3>
                  </div>

                </div>
                <div className="complete-web-1 ">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="maxima ">
                        <div className="idfadsf-sads">
                          <button className="upload-1 sdisad-dsdactive">
                            <i className="fa fa-refresh"></i>
                          </button>
                        </div>
                        <div className="idfadsf-sads">
                          <button className="upload-1 sdisad-dsdactive" onClick={() => addFormFields()}>
                            + Add more
                          </button>
                        </div>

                        <div className="idfadsf-sads">
                          <button className="upload-1 sdisad-dsdactive" onClick={() => SaveForm()}>
                            Save
                          </button>
                        </div>

                        {/* <div>
                        <Link href="/en/payments">
                          <button className="upload-1">Published</button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/en/payments">
                          <button className="upload-1">In Review</button>
                        </Link>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="seting-method-payment">
                  <div className="first-payment-1">


                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="active-member">
                              <div className="table-responsive">
                                <table className="table table-xs mb-0">
                                  <thead>
                                    <tr>
                                      <th>Sedule #</th>
                                      <th>Date</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th>Hours</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {courses && courses?.map((s: any, i: number) => (
                                      <tr key={i} className="p-field">
                                        <td>

                                          {i + 1}
                                        </td>
                                        <td >
                                          <DatePicker
                                            onKeyDown={(e) => {
                                              e.preventDefault();
                                            }}
                                            selected={moment(s?.date).toDate()}
                                            onChange={(date) => handleDateChange("date", i, date)}
                                            dateFormat="yyyy-MM-dd"
                                          />
                                        </td>
                                        <td >
                                          <DatePicker
                                            onKeyDown={(e) => {
                                              e.preventDefault();
                                            }}
                                            selected={s?.course_id ? parse(s?.from_time, "HH:mm:ss", new Date()) : s?.from_time}
                                            onChange={(date) => handleDateChange("from_time", i, date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={24}
                                            timeCaption="Time"
                                            dateFormat="HH:mm:ss"
                                          />
                                          {/* <span>{s?.from_time}</span>{" "} */}
                                        </td>
                                        <td>
                                          <DatePicker
                                            onKeyDown={(e) => {
                                              e.preventDefault();
                                            }}
                                            // selected={moment(s?.date).toDate()}
                                            selected={s?.course_id ? parse(s?.to_time, "HH:mm:ss", new Date()) : s?.to_time}

                                            onChange={(date) => handleDateChange("to_time", i, date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={24}
                                            timeCaption="Time"
                                            dateFormat="HH:mm:ss "
                                          />
                                        </td>
                                        <td>
                                          <p>{s?.hours}</p>
                                        </td>
                                        <td>

                                          <p style={{cursor:'pointer'}} onClick={() => removeInputField(i)}> <i className="fa fa-trash"  ></i></p>
                                        </td>
                                      </tr>

                                    ))}


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
          </div>
        }
      </section>
    </div>
  );
};



export default withAuth(Home);
