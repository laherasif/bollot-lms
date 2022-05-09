import type { NextPage } from "next";
import { Dropdown, Spinner } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";
// import { useIntl } from "react-intl";
// import BlogCard from "../../../src/components/card/BlogCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import CourseAccordian from "../../../src/components/accordian";
import FeaturedReview from "../../../src/components/FeaturedReview";
import BoughtCourseCard from "../../../src/components/BoughtCourseCard";
// import CourseCard1 from "../../../src/components/card/CourseCard1";
// import CourseCardBig from "../../../src/components/card/CourseCardBig";
// import FBTCard from "../../../src/components/card/FBTCard";
import FBCBox from "../../../src/components/FBCBox";
import InstructorCard from "../../../src/components/InstructorCard";
import RatingBar from "../../../src/components/RatingBar";
import Review from "../../../src/components/Review";
// import CourseCard from "../../../src/components/card/CourseCard";
// import Multicarousel from "../../../src/components/Multicarousel";
import MulticarouselCourse from "../../../src/components/MulticarouselCourse";
import instance from "../../../src/confiq/axios/instance";
import Rating from "../../../src/components/ratingStar";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { SaveCart } from "../../../src/redux/actions/course/course";
import { useState, useEffect } from "react";
import Link from 'next/link'
import InfoCart from "../../../src/components/cartInfoPopup";
import PreviewModel from "../../../src/components/preview";
import { loginUser } from "../../../src/redux/actions/auth/user";
import { SweetAlert } from "../../../src/function/hooks";
import { useRouter } from "next/router";


const Home: NextPage = ({ Course, invite }: any) => {
  // const intl = useIntl();

  console.log("course", invite)
  const [message, setMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Info, setInfo] = useState(false)
  const [show, setShow] = useState(false)
  const [preview, setPreview] = useState(false)



  const dispatch = useDispatch()

  const router = useRouter()

  const { AddCart } = useSelector((state: RootStateOrAny) => state.cartReducer)

  useEffect(() => {
    // let findCart = AddCart?.includes({id : 3} )
    for (let index = 0; index < AddCart?.length; index++) {
      const element = AddCart[index].id;
      if (element === Course?.id) {
        setMessage(true)

      }
    }
  }, [])


  // const ratings = () => {

  //   Object.entries(Cours?.ratings_breakdown).map((key, value) => {
  //     return (
  //       <RatingBar stars={key} rates={value} />
  //     )
  //   });
  // }





  let numberofLect = 0
  Course?.sections?.forEach(datum => numberofLect += datum.lectures.length)



  const AcceptInv = async () => {
    try {
      setLoading(true)
      let res = await instance.post('api//company/accept-invite',{ invite_code :  invite?.invite_code } ) 
      if (res.data.success === true) {
        setLoading(false)
        dispatch(loginUser(res.data))
        router.push('/en/instructor/profile')
      }
      else if(res.data.error){
        SweetAlert({icon : "error" , text :res.data.error})
        setLoading(false)

      }

    } catch (error) {

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
        <div className="info ">

          <div className="info-bar">
            <h5>information from Invitaion  </h5>
            <button onClick={() => AcceptInv()}> Accept</button>

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
                <span>{Course?.avg_rating.aggr_rating}</span>
                <Rating value={3.5} />

                {/* <Icons name="p1" />
                <Icons name="p1" />
                <Icons name="p1" />
                <Icons name="p1" />
                <Icons name="p2" /> */}
                {/* (513 ratings) 13,107 students */}
              </p>
              <p>
                <span>Created by</span> {Course?.instructor.fullname}
              </p>
              {/* <div className="skdnasdsda-weiad">
                <p>Last updated 12/2021</p>
                <p>English</p>
                <p>English [Auto]</p>
              </div> */}
            </div>
          </div>
        </section>
        <div className="d-flex container " style={{ paddingLeft: '4rem' }}>
          <section className="inner-course-cont">
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
            {/* <div className="learning-jsiae">
              <h5>Top companies offer this course to their employees</h5>
              <div className="jdisad0ewew-2edsad">
                <h6 className="kasjdasd-aweaidae">
                  This course was selected for our collection of top-rated
                  courses trusted by businesses worldwide.
                  <a>Learn more</a>
                </h6>
                <div className="com-fsf">
                  <Icons name="cp1" />
                  <Icons name="cp2" />
                  <Icons name="cp3" />
                  <Icons name="cp4" />
                  <Icons name="cp5" />
                </div>
              </div>
            </div> */}
            {Course?.sections?.length > 0 ?
              <div className="learning-jsiae">
                <h5>Course content</h5>
                <div className="jdisad0ewew-2edsad">
                  <div className="jksad-sadsnkd">
                    <h6 className="kasjdasd-aweaidae">• {Course?.sections?.length} sections</h6>
                    <h6 className="kasjdasd-aweaidae">• {numberofLect} lectures </h6>
                    <h6 className="kasjdasd-aweaidae">• 8h 39m total length</h6>
                  </div>

                  <div className="kjdkdsa-ekodd">
                    <h6>Expand all Sections</h6>
                  </div>
                </div>
                <div className="cosaidjse-wea">
                  <CourseAccordian section={Course?.sections} />

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

            <div className="learning-jsiae">
              <FeaturedReview
                instructor={Course?.instructor}
                allCourses={Course?.all_courses_count}
                reviews={Course?.reviews_count} />
            </div>
            <div className="learning-jsiae no-brd ">
              <h5>See Also</h5>
              <div style={show ? { display: 'block' } : { overflow: 'hidden', height: '36rem' }} >
                {Array.from({ length: 10 }, (x, i) => {
                  return (
                    <BoughtCourseCard />
                  )
                })
                }
              </div>

              <button className="mt-3" onClick={() => setShow(!show)}>{show ? "Show less" : "Show more"}</button>
            </div>
            {/* <FBCBox /> */}
            <div className="learning-jsiae no-brd">
              <h5>Instructor</h5>
              <InstructorCard
                allCourses={Course?.all_courses_count}
                instructor={Course?.instructor}
                enrolled={Course?.students_enrolled}
                reviews={Course?.reviews_count} />
            </div>
            <div className="hasjdiaw-sD no-brd">
              <h2>Student feedback</h2>
              <div className="dosjafos-ewwae">
                <div className="sdjafis-awjes">
                  <h1>{Course?.avg_rating.avg_rating || 0}</h1>
                  <div className="njadfsdz-aenwew">
                    <Rating value={Course?.avg_rating.avg_rating || 0} />
                    {/* <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc3" /> */}
                  </div>
                  <h3>Course Rating</h3>
                </div>
                <div className="w-100">
                  {Course?.ratings_breakdown.map((rat: any, i: number) => (
                    <RatingBar stars={i} rates={rat} />
                  ))}
                  {/* <RatingBar stars={4} rates="12%" />
                  <RatingBar stars={3} rates="23%" />
                  <RatingBar stars={2} rates="18%" />
                  <RatingBar stars={1} rates="7%" /> */}
                </div>
              </div>
            </div>

            <div className="learning-jsiae">
              <h5>Reviews</h5>

              <div className="kjsakdad-a3med">
                <div className="sijadas-awjie">
                  <input
                    type="text"
                    className=""
                    placeholder="Search  Reviews"
                  />
                  <button>
                    <Icons name="ipc5" />
                  </button>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    All Ratngs
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Review />
              <Review />
              <Review />
              <Review />
              <div>
                <button className="kasjdfsa-eaidas w-100">
                  See More Reviews
                </button>
              </div>
              <h4 className="jkdasfasd-neidasd">
                More Courses{" "}
                <span>
                  by {Course?.instructor?.fullname}
                </span>
              </h4>
              <MulticarouselCourse OtherCourse={Course?.other_courses} />
              <button className="kasjdfsa-eaidas w-100">Report Abuse</button>
            </div>
          </section>
          <section className="kasjdsaidw-asjew">
            <div className="card-bar-sec-1">
              <div className="image_container" onClick={() => Course?.previews.length ? setPreview(true) : null}>
                <img src={Course?.cover_image} />
                {Course?.previews.length ?
                  <div className="play_icon">
                    <i className="fa fa-play-circle" id="icon" ></i>
                  </div>
                  : null
                }

              </div>
              <div className="kjisdofa-0ewkraf">
                <div className="num-flex-1">
                  <h3>${Course?.price}</h3>
                  <h5 className="text-decoration-line">${Course?.discounted_price}</h5>
                  {/* <h5>84% off</h5>4 */}
                </div>
                {/* <p className="text-center day-one">1 day left at this price!</p> */}
                <div className="">

                    <div className="btn-add" onClick={() => AcceptInv()}>
                      <button className="buy-now" style={{ fontSize: '18px' }}>Accept Invitation</button>
                    </div>
                </div>
                <h6 className="text-center">30-Day Money-Back Guarantee</h6>
                <h5>This course includes:</h5>
                <p>8.5 hours on-demand video</p>
                <p>6 articles</p>
                <p>Access on mobile and TV</p>
                <p>Certificate of completion</p>
                {/* <div className="apply-coupon">
                  <button>Apply Coupon</button>
                  <button>Gift this course</button>
                </div> */}
                <h2>Training 5 or more people?</h2>
                <h4>
                  Get your team access to 6,000+ top Udemy courses anytime,
                  anywhere.
                </h4>
              </div>

            </div>
          </section>
        </div>

        
        {
              loading &&
              <div style={{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.7)', opacity: '1', textAlign: 'center', top: 0, left: 0, right: 0, bottom: 0, zIndex: '999' }}>
                <div style={{ marginTop: '20rem', zIndex: '9999' }}>
                  <Spinner animation="border" variant="primary" />
                </div>

              </div>
            }


        <Footer />
        {preview && <PreviewModel previews={Course?.previews} Toggle={(value: any) => setPreview(value)} />}
        {Info && <InfoCart Course={Course} />}
      </div >
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {

  const res = await instance.get(
    `api//company/invite-details/${params.id}`,
  );
  return {
    props: {
      Course: res.data.response.course_details,
      invite: res.data.response.invite_details,
    },
  };
};


export default Home;
