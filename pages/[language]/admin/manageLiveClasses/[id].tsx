import type { NextPage } from "next";
import Sidebar from "../../../../src/components/admin/sidebar2";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar3";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from 'next/router'
import { Small } from "../../../../src/components/admin/loader";
import { SweetAlert } from "../../../../src/function/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { parse } from 'date-fns'
import { Breadcrumb, Spinner } from "react-bootstrap";
import AdminAuth from "../../../../src/components/Hoc/adminRoute";
const Home: NextPage = () => {
  let router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [dateTime, setDateTime] = useState([])
  const [errors, setErrors] = useState([])

  const { token } = useSelector((state: RootStateOrAny) => state?.admin)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  let courseId = router.query.id
  const courseTitle = router.query.live
  const Title = router.query.title


  useEffect(() => {
    let fetchLive = async () => {
      try {
        setLoading(true)
        let res = await AxInstance.get(`api//admin/courses/schedule/get/${courseId}`)
        if (res.data.response) {
          setDateTime(res.data.response.course_with_schedule.schedule)
          setLoading(false)
        }
        else {
          setLoading(false)

        }
      }
      catch (err) {
        setLoading(false)
        SweetAlert({ icon: "error", text: err })

      }
    }
    fetchLive()
  }, [courseId])

  const handleDateChange = (name: string, i: number, date: any) => {
    let formValues: any = [...dateTime];
    if (name === "date") {
      formValues[i][name] = moment(date).format('YYYY-MM-DD');
      setDateTime(formValues)
    }
    else if (name === "from_time") {
      formValues[i][name] = moment(date).format('hh:mm:ss');
      setDateTime(formValues)
    }
    else {
      formValues[i][name] = moment(date).format('hh:mm:ss');
      setDateTime(formValues)
    }


  }

  const addFormFields = () => {

    setDateTime([
      ...dateTime,
      {
        date: '',
        from_time: '',
        to_time: '',

      },])

  }


  const SaveLiveClasses = async () => {

    let arr = [];
    for (let i = 0; i < dateTime.length; i++) {
      const element = dateTime[i];
      let value = { date: moment(element.date).format('YYYY-MM-DD'), from_time: moment(element.from_time).format('HH:mm'), to_time: moment(element.to_time).format('HH:mm') }
      arr.push(value)

    }

    let values = {
      course_id: courseId,
      schedule: dateTime
    }

    try {
      setLoader(true)
      let res = await AxInstance.post('api//admin/courses/schedule/update', values)
      if (res.data.success === true) {
        setLoader(false)
        SweetAlert({ icon: "success", text: res.data.message })
        if (courseTitle) {
          router.push('/en/admin/liveCourses')
        }
        else{
          router.push('/en/admin/courses')

        }
      }
      else {
        setLoader(false)
        setErrors(res.data.error)

      }
    } catch (error) {
      setLoader(false)

    }
  }


  const DelSedule = (index: number) => {
    const rows = [...dateTime];
    rows.splice(index, 1);
    setDateTime(rows);

    if (errors.schedule) {
      let convert = errors.schedule ? Object?.values(errors.schedule) : {}
      let find = convert.filter((item, i) => {
        return i !== index
      })
      setErrors({ schedule: Object.assign({}, find) })
    }

  }

  console.log("error", errors)
  return (
    <div className="inst">
      <NavigationBar1 />
      <section className="dash-board jadsifd-asdasid">
        <div className="ksadsa-w4a3k4">
          <div className="jcoiasd03-eakw3e1">
            <Sidebar />
          </div>
        </div>
        {loading ? Small()
          :
          <div className="dash-board-1">
            <div className="dash-2 ">
              <div className="my-course">
                <div className="hdsf0s-sadmsa">

                  <div className="back-btn">
                    <Breadcrumb>
                      <Breadcrumb.Item linkAs={Link} href="/en/admin/dashboard">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item linkAs={Link} href={courseTitle ? "/en/admin/liveCourses" : "/en/admin/courses"} >
                        {courseTitle ? "Live Courses" : "Courses"}
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Course : {courseTitle ||  Title} </Breadcrumb.Item>
                    </Breadcrumb>

                    {/* <Link href={`/en/admin/liveCourses`} >
                      <h3>
                        <i className="fa fa-arrow-left"></i>
                        Back</h3>
                    </Link>
                    <h3>Manage Live Classes Secdule </h3> */}
                  </div>
                  <div className=" jidfjsd-asjreid ">

                  </div>
                </div>

                <div className="complete-web-1 mt-2">
                  <div className="umpire w-100">
                    <div className="umpire-1 umpire-1-cst ">
                      <div className="d-flex mb-3 idfadsf-sads">

                        <button className="upload-1 sdisad-dsdactive"
                          id="activetab"
                          onClick={() => addFormFields()}

                        >
                          + Add more classes </button>
                        <button className="upload-1 sdisad-dsdactive"
                          id="activetab"

                          onClick={() => SaveLiveClasses()}
                        >
                          <i className="fa fa-save" style={{ marginRight: '10px' }}></i>
                          {loader ?
                            <Spinner animation="border" />
                            :
                            "Save"

                          }

                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="complete-web-1 mb-3">
                  <div className="datepicker-container-main" >

                    {dateTime ? dateTime.map((dat, i) => {
                      return (
                        <div className="datepicker_container" key={i}>
                          <div className="p-field mt-2 ">
                            <p>Schedule cards</p>
                            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                              <div>
                                {/* <Icons name="i24" /> */}
                                <label>Date</label>
                              </div>
                              {(dateTime.length !== 1) ?
                                <div onClick={() => DelSedule(i)}>
                                  <i className='fa fa-trash'></i>
                                </div>
                                : null}

                            </div>
                            <DatePicker
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              selected={dat?.id || dat.date !== '' ? parse(dat.date, "yyyy-MM-dd", new Date()) : null}
                              // selected={dat.date}
                              locale="en-GB"
                              placeholderText={'YYYY-MM-DD'}
                              showWeekNumbers
                              onChange={(date) => handleDateChange("date", i, date)}
                              dateFormat="yyyy-MM-dd"
                            />

                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.date}</div> : null}


                          </div>
                          <div className="p-field mt-2 ">
                            <div className="d-flex">
                              {/* <Icons name="i24" /> */}
                              <label>From</label>
                            </div>
                            <DatePicker
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              placeholderText={'HH-MM'}

                              selected={dat?.id || dat.from_time !== '' ? parse(dat.from_time, "HH:mm:ss", new Date()) : dat.from_time}
                              // selected={dat.from_time}
                              onChange={(date) => handleDateChange("from_time", i, date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm "
                            />
                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.from_time}</div> : null}

                          </div>
                          <div className="p-field mt-2 ">
                            <div className="d-flex">
                              {/* <Icons name="i24" /> */}
                              <label>To </label>
                            </div>
                            <DatePicker
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                              placeholderText={'HH-MM'}

                              name="to_time"
                              selected={dat?.id || dat.to_time !== '' ? parse(dat.to_time, "HH:mm:ss", new Date()) : dat.to_time}
                              // selected={dat.to_time}
                              onChange={(date) => handleDateChange("to_time", i, date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm"
                            />

                            {errors && errors?.schedule ? <div className="invalid mt-1">{errors?.schedule[i]?.to_time}</div> : null}


                          </div>
                        </div>

                      )
                    })
                      : <div>Record not found </div>
                    }


                  </div>



                </div>
              </div>
            </div>
          </div>
        }
      </section >
    </div >
  );
};

export default AdminAuth(Home);
