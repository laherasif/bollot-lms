import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";
import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import CourseAccordian from "../../../src/components/accordian";
import FeaturedReview from "../../../src/components/FeaturedReview";
import BoughtCourseCard from "../../../src/components/BoughtCourseCard";
import CourseCard1 from "../../../src/components/card/CourseCard1";
import CourseCardBig from "../../../src/components/card/CourseCardBig";
import FBTCard from "../../../src/components/card/FBTCard";
import FBCBox from "../../../src/components/FBCBox";
import InstructorCard from "../../../src/components/InstructorCard";
import RatingBar from "../../../src/components/RatingBar";
import Review from "../../../src/components/Review";
import CourseCard from "../../../src/components/card/CourseCard";
import Multicarousel from "../../../src/components/Multicarousel";
import MulticarouselCourse from "../../../src/components/MulticarouselCourse";
import instance from "../../../src/confiq/axios/instance";
import Rating from "../../../src/components/ratingStar";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { SaveCart } from "../../../src/redux/actions/course/course";
import { useState, useEffect } from "react";
import Link from 'next/link'
import InfoCart from "../../../src/components/cartInfoPopup";


const Home: NextPage = ({ Course }: any) => {
  // const intl = useIntl();


  const [message, setMessage] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [Info, setInfo] = useState(false)



  const dispatch = useDispatch()

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



  let numberofLect = 0
  Course?.sections?.forEach(datum => numberofLect += datum.lectures.length)



  const RegisterCart = async () => {
    if (message === true) {
      setPopUp(false)
    }
    else {
      setPopUp(true)
      let  pair = { Quantity: 1 };
      let newObj = { ...Course, ...pair }
      dispatch(SaveCart(newObj))
      setTimeout(() => {
        setPopUp(false)
        setMessage(true)
        setInfo(true)

      }, 1000);
    }
  }

  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>{" "}
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
              <div className="skdnasdsda-weiad">
                <p>Last updated 12/2021</p>
                <p>English</p>
                <p>English [Auto]</p>
              </div>
            </div>
          </div>
        </section>
        <div className="d-flex container">
          <section className="inner-course-cont">
            <div className="learning-jsiae">
              <h5>What you'll learn</h5>
              <div className="jdisad0ewew-2edsad">
                <p>Understand how Apache Kafka works</p>
                <p>
                  Practice to create producers and consumers using built-in
                  console producer and console consumer
                </p>
                <p>
                  Create fault-tolerant clusters with topics replication across
                  multiple brokers
                </p>
                <p>Write custom producer and consumer in Java</p>
                <p>Apache Kafka Architecture</p>
                <p>Use Python and Node to produce and consume messages</p>
                <p>How to create Kafka cluster with multiple Brokers</p>
                <p>Learn components of the Apache Kafka Cluster</p>
              </div>
            </div>
            <div className="learning-jsiae">
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
            </div>
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
              <div className="kasjdasd-aweaidae">
                <h6>
                  You could have completely no prior knowledge about Apache
                  Kafka
                </h6>
                <h6 className="">
                  Prepare only your Mac, Windows or Linux/Unix computer.
                  Anything will work.
                </h6>
                <h6 className="">
                  Also you could know nothing about Java, Node or Python. I will
                  explain all of these from beginning We will start from the
                  very beginning by installing Apache Kafka and exploring it's
                  components
                </h6>
              </div>

              <h5>Description</h5>
              <div className="kasjdasd-aweaidae">
                <h6> This course is all about Apache Kafka</h6>
                <h6>
                  Understand HOW Apache Kafka works and learn its core features
                  ON PRACTICE. This is 80% practice course without no useless
                  demos!
                </h6>
                <h6>
                  Build custom Apache Kafka Producers and Consumers using native
                  Java API. Also you will build projects using APIs for other
                  programming languages like Node.js and Python.
                </h6>
                <h6>
                  Become a master of Apache Kafka by understanding and
                  practicing its architecture and main features.
                </h6>
                <h6>
                  All project files and mostly used commands are available in
                  the GitHub repository.
                </h6>
                <h6>
                  This is the most complete practical Apache Kafka guide here on
                  Udemy that includes tons of practical activities. Most
                  important is that you will learn how Apache Kafka works and
                  knowing it you will be able much more easier use its features
                  and fix mistakes in the future after you'll finish this
                  course. You can have zero knowledge about Apache Kafka, Java,
                  Node.js or Python. All will be taught from scratch, from basic
                  to advanced features. If you want to get deep knowledge of
                  Apache Kafka this course is for you!
                </h6>
                <h6>
                  Afterwards we will jump into tons of practice activities and
                  use different Apache Kafka features and built-in scripts. You
                  will launch Zookeeper, multiple Brokers, Console Consumer and
                  Console Producer. Also you will test performance of the Kafka
                  Cluster using built-in utility called Performance Monitor. In
                  practice sections you will perform multiple practice Apache
                  activities: Create cluster with multiple brokers Create topic
                  with multiple partitions spread across different brokers
                  Create topics with replication factor that allows you to store
                  copy of every message on different brokers for redundancy
                  Produce messages using built-in Console Producer Consume
                  messages using built-in Console Consumer
                </h6>
              </div>

              <h5>Who this course is for:</h5>
              <div className="kasjdasd-aweaidae">
                <h6>Beginners who want to learn Apache Kafka</h6>
                <h6>
                  Advanced Apache Kafka users who want to learn how to build
                  producers and consumers in other languages like Node or Python
                </h6>
                <h6>
                  This course is for you if you want to PRACTICE using Kafka and
                  it's APIs
                </h6>
              </div>
              <div className="kjdkdsa-ekodd d-flex align-items-center">
                <h6 className="mx-3 my-3">See More</h6>
                <Icons name="cp6" />
              </div>
            </div>

            <div className="learning-jsiae">
              <FeaturedReview />
            </div>
            <div className="learning-jsiae no-brd">
              <h5>Students also bought</h5>
              <BoughtCourseCard />
              <BoughtCourseCard />
              <BoughtCourseCard />
              <div className="sljdasoeda0WE">
                <BoughtCourseCard />
              </div>
              <h6 className="dasfjos-dejris">Show More</h6>
            </div>
            <FBCBox />
            <div className="learning-jsiae no-brd">
              <h5>Instructor</h5>
              <InstructorCard />
            </div>
            <div className="hasjdiaw-sD no-brd">
              <h2>Student feedback</h2>
              <div className="dosjafos-ewwae">
                <div className="sdjafis-awjes">
                  <h1>4.6</h1>
                  <div className="njadfsdz-aenwew">
                    <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc4" />
                    <Icons name="ipc3" />
                  </div>
                  <h3>Course Rating</h3>
                </div>
                <div className="w-100">
                  <RatingBar stars={5} rates="57%" />
                  <RatingBar stars={4} rates="12%" />
                  <RatingBar stars={3} rates="23%" />
                  <RatingBar stars={2} rates="18%" />
                  <RatingBar stars={1} rates="7%" />
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
                  by Bogdan Stashchuk | Software Engineer, MBA, PhD, CCIE
                </span>
              </h4>
              <MulticarouselCourse />
              <button className="kasjdfsa-eaidas w-100">Report Abuse</button>
            </div>
          </section>
          <section className="kasjdsaidw-asjew">
            <div className="card-bar-sec-1">
              <img src={Course?.cover_image} />
              <div className="kjisdofa-0ewkraf">
                <div className="num-flex-1">
                  <h3>${Course?.price}</h3>
                  <h5 className="text-decoration-line">$84.99</h5>
                  <h5>84% off</h5>
                </div>
                <p className="text-center day-one">1 day left at this price!</p>
                <div className="">
                  <div className="d-flex-wh align-items-center">

                    <button className="added-to-cart" onClick={() => RegisterCart()}>
                      {popUp ?
                        <div className="spinner-border text-primary" style={{ marginLeft: '7rem' }} role="status">
                        </div>
                        : message ?
                          <Link href="/en/checkout">
                            <p> {"Proceed to Cart"}</p>
                          </Link>
                          : <p> {"Added to cart"}</p>

                      }

                      <span>
                        <Icons name="ipc6" />
                      </span>
                    </button>
                  </div>
                  <div className="btn-add">
                    <button className="buy-now">Buy Now</button>
                  </div>
                </div>
                <h6 className="text-center">30-Day Money-Back Guarantee</h6>
                <h5>This course includes:</h5>
                <p>8.5 hours on-demand video</p>
                <p>6 articles</p>
                <p>Access on mobile and TV</p>
                <p>Certificate of completion</p>
                <div className="apply-coupon">
                  <button>Apply Coupon</button>
                  <button>Gift this course</button>
                </div>
                <h2>Training 5 or more people?</h2>
                <h4>
                  Get your team access to 6,000+ top Udemy courses anytime,
                  anywhere.
                </h4>
                <button className="try-it">Try Bolloot Business</button>
              </div>

            </div>
          </section>
        </div>
        <Footer />

        { Info && <InfoCart Course={Course}/>}
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
