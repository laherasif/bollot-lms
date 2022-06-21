import type { NextPage } from "next";
import { Dropdown, Spinner } from "react-bootstrap";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import CourseAccordian from "../../../src/components/accordian";
import BoughtCourseCard from "../../../src/components/BoughtCourseCard";
import InstructorCard from "../../../src/components/InstructorCard";
import RatingBar from "../../../src/components/RatingBar";
import Review from "../../../src/components/Review";
import MulticarouselCourse from "../../../src/components/MulticarouselCourse";
import instance from "../../../src/confiq/axios/instance";
import Rating from "../../../src/components/ratingStar";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { SaveCart, SaveBookmark } from "../../../src/redux/actions/course/course";
import { useState, useEffect } from "react";
import Link from 'next/link'
import InfoCart from "../../../src/components/cartInfoPopup";
import PreviewModel from "../../../src/components/preview";
import { useRouter } from "next/router";
import axios from "axios";
import { SweetAlert } from "../../../src/function/hooks";


const Home: NextPage = ({ Course }: any) => {

  // React State hooks 
  const [message, setMessage] = useState(false)
  const [loader, setLoader] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [Info, setInfo] = useState(false)
  const [show, setShow] = useState(false)
  const [preview, setPreview] = useState(false)
  const [course_show, setCourse_show] = useState(false)

  //  Redux disptach action hook
  const dispatch = useDispatch()

  // Router Navigation hook
  const router = useRouter()

  // Redux get state value hook
  const { AddCart, BookMark } = useSelector((state: RootStateOrAny) => state.cartReducer)
  const { User, token } = useSelector((state: RootStateOrAny) => state.userReducer)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  // React manageState hook like (update , mount )

  useEffect(() => {
    // base javascript for loop 
    for (let index = 0; index < AddCart?.length; index++) {
      const element = AddCart[index].id;
      if (element === Course?.id) {
        setMessage(true)
      }
    }

  }, [])


  // Find bookmark object 
  let find = BookMark?.some((f: any) => f.id === Course?.id)

  // Find no of lectures in a course 
  let numberofLect = 0
  Course?.sections?.forEach((datum: any) => numberofLect += datum.lectures.length)


  // Register cart function 
  const RegisterCart = async () => {
    if (message === true) {
      setPopUp(false)
    }
    else {
      setPopUp(true)
      let pair = { Quantity: 1 };
      let newObj = { ...Course, ...pair }
      dispatch(SaveCart(newObj))
      // Timmer stopper function 
      setTimeout(() => {
        setPopUp(false)
        setMessage(true)
        setInfo(true)

      }, 1000);
    }
  }

  // Register bookmark course  
  const RegisterBookMark = async () => {
    if (User) {
      let pair = { Quantity: 1 };
      let newObj = { ...Course, ...pair }
      try {
        setLoader(true)
        await AxInstance.post('api//student/bookmarks/save', { course_id: Course?.id })
        dispatch(SaveBookmark(newObj))
        setLoader(false)
      } catch (error) {
        SweetAlert({ icon: "error", text: error })

      }

    }
    else {
      router.push('/en/login')
    }
  }


  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>
        <section className="browse browse-bgc">
          <div className="container-3 all-browse">
            <div className="adsmfsf-w3rmasidw">
              <h5>
                {Course?.category_tree.map((tre: any) => (
                  <>
                    {tre}
                    <Icons name="p3" />
                  </>
                ))}

              </h5>
              <h4>{Course?.title}</h4>
              <p>
                {Course?.short_desc}
              </p>
              <p>
                <span>Reviews : ({Course?.avg_rating.total_reviews})</span>
                <Rating value={Course?.avg_rating.aggr_rating} />


              </p>
              <p>
                <span>Created by</span> {Course?.instructor.fullname}
              </p>

            </div>
          </div>
        </section>
        <div className="d-flex container " style={{ paddingLeft: '4rem' }}>
          <section className="inner-course-cont">
            {Course?.outcomes.length > 0 ?
              <div className="learning-jsiae">
                <h5>What you'll learn</h5>
                <div className="outcoms">
                  <ul>
                    {Course?.outcomes.map((out: any) => (

                      <li>
                        <div className="course_outcoms">
                          <div>
                            <i className="fa fa-check"></i>
                          </div>
                          <span>{out?.outcome}</span>
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>
              : null}

            {Course?.sections?.length > 0 ?
              <div className="learning-jsiae">
                <h5>Course content</h5>
                <div className="jdisad0ewew-2edsad">
                  <div className="jksad-sadsnkd">
                    <h6 className="kasjdasd-aweaidae">• {Course?.sections_count} sections</h6>
                    <h6 className="kasjdasd-aweaidae">• {Course?.lectures_count} lectures </h6>
                    <h6 className="kasjdasd-aweaidae"></h6>
                  </div>

                </div>
                <div className="cosaidjse-wea">
                  <div style={course_show ? { display: 'block' } : { display: 'block' }}>
                    <CourseAccordian section={Course?.sections} />
                  </div>
                  {Course?.sections.length > 6 ?
                    <div className="learning-jsiae no-brd ">
                      <button className="mt-3" onClick={() => setCourse_show(!course_show)}>{course_show ? "Show less" : "Show more"}</button>
                    </div>
                    : null}
                </div>
              </div>
              : null}

            <div className="learning-jsiae">
              <h5>Requirements</h5>
              <div className="outcoms">
                <ul>
                  {Course?.requirements.map((req: any) => (

                    <li>
                      <div className="course_outcoms">
                        <div>
                          <i className="fa fa-check"></i>
                        </div>
                        <span>{req?.requirement}</span>
                      </div>
                    </li>
                  ))}

                </ul>
              </div>

              <h5>Description</h5>
              <div className="kasjdasd-aweaidae">
                <h6>{Course?.long_desc}</h6>

              </div>

              <h5>Who this course is for:</h5>
              <div className="outcoms">
                <ul>
                  {Course?.course_for.map((req: any) => (

                    <li>
                      <div className="course_outcoms">
                        <div>
                          <i className="fa fa-check"></i>
                        </div>
                        <span>{req?.for}</span>
                      </div>
                    </li>
                  ))}

                </ul>
              </div>

            </div>

            {Course?.other_courses.length > 0 ?
              <div className="learning-jsiae no-brd ">
                <h5>See Also</h5>
                <div style={show ? { display: 'block' } : { overflow: 'hidden', height: '36rem' }} >
                  {Course?.other_courses.map((item: any, i: number) => {
                    return (

                      <BoughtCourseCard item={item} key={i} />
                    )
                  })
                  }
                </div>
                {Course?.other_courses.length > 3 ?
                  <button className="mt-3" onClick={() => setShow(!show)}>{show ? "Show less" : "Show more"}</button>
                  : null
                }
              </div>
              : null}
            <div className="learning-jsiae no-brd">
              <h5>Instructor</h5>
              <InstructorCard
                allCourses={Course?.all_courses_count}
                instructor={Course?.instructor}
                enrolled={Course?.students_enrolled}
                reviews={Course?.instructor?.avg_instructor_reviews}
                tagline={Course?.instructor.tagline}
                about={Course?.instructor.about}
              />
            </div>
            <div className="hasjdiaw-sD no-brd">
              <h2>Student feedback</h2>
              <div className="dosjafos-ewwae">
                <div className="sdjafis-awjes">
                  <h1>{Course?.avg_rating.avg_rating || 0}</h1>
                  <div className="njadfsdz-aenwew">
                    <Rating value={Course?.avg_rating.avg_rating || 0} />

                  </div>
                  <h3>Course Rating</h3>
                </div>
                <div className="w-100">
                  {Course?.ratings_breakdown.map((rat: any, i: number) => (
                    <RatingBar stars={i} rates={rat} />
                  )).reverse()
                  }

                </div>
              </div>
            </div>

            {Course?.reviews.length && Course?.other_courses.length > 0 ?
              <div className="learning-jsiae">
                <h5>Reviews</h5>

                {Course?.reviews.map((rev: any, index: number) => (
                  <Review item={rev} key={index} />

                ))}


                <h4 className="jkdasfasd-neidasd">
                  More Courses
                  <span>
                    by {Course?.instructor?.fullname}
                  </span>
                </h4>
                {Course?.other_courses.length > 0 ?
                  <>
                    < MulticarouselCourse OtherCourse={Course?.other_courses} />
                  </>
                  : null}
              </div>
              : null}
          </section>
          <section className="kasjdsaidw-asjew">
            <div className="card-bar-sec-1">
              <div className="image_containers" onClick={() => Course?.previews.length ? setPreview(true) : null}>
                <img src={Course?.cover_image}
                  alt="course_image"
                />
                {Course?.previews.length ?
                  <div className="play_icons">
                    <i className="fa fa-play-circle"  ></i>
                  </div>
                  : null
                }

              </div>
              <div className="kjisdofa-0ewkraf">
                <div className="num-flex-1">
                  <h3>${Course?.price}</h3>
                  <h5 className="text-decoration-line">${Course?.discounted_price}</h5>
                </div>
                <div className="">
                  <div className="d-flex-wh align-items-center">

                    <button className="added-to-cart" >
                      <div onClick={() => RegisterCart()} >
                        {popUp ?
                          <div style={{ marginLeft: '110px' }}>
                            <Spinner animation="border" />
                          </div>
                          : message ?
                            <Link href="/en/checkout">
                              <p> {"Proceed to cart"}</p>
                            </Link>
                            : <p> {"Add to cart"}</p>
                        }
                      </div>

                      <span >
                        {loader ?
                          <>
                            <Spinner animation="border" style={{ marginTop: '7px' }} />
                          </>
                          :
                          <div onClick={() => RegisterBookMark()} className={find ? "filled" : ""} >

                            <i className="fa fa-heart"></i>
                          </div>
                        }
                      </span>
                    </button>
                  </div>
                  <Link href={`/en/checkout/?id=${Course?.slug}`}>
                    <div className="btn-add">
                      <button className="buy-now">Buy Now</button>
                    </div>
                  </Link>
                </div>
                <h6 className="text-center">3-Day Money-Back Guarantee</h6>
                <Link href="/en/bollotBusiness">
                  <button className="try-it">Try Bolloot Business</button>
                </Link>
              </div>

            </div>
          </section>
        </div>
        <Footer />
        {preview && <PreviewModel previews={Course?.previews} Toggle={(value: any) => setPreview(value)} />}
        {Info && <InfoCart Course={Course} />}
      </div >
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {

  const res = await instance.get(
    `api//courses/${params.id}`,
  );
  return {
    props: {
      Course: res.data.response.course,
    },
  };
};


export default Home;
