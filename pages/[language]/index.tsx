import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import Navbar from "../../src/components/header/Navbar";

import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from 'next/link'
import styles from "../../styles/Home.module.css";
import CourseCard from "../../src/components/card/CourseCard";
import CategoryCard from "../../src/components/card/CategoryCard";
import Icons from "../../src/icons";
import CourseCard1 from "../../src/components/card/CourseCard1";
import InformationCard from "../../src/components/card/InformationCard";
import CommentCard from "../../src/components/card/CommentCard";
import Footer from "../../src/components/footer";
import Carousel from "../../src/components/carousel";
import Multicarousel from "../../src/components/Multicarousel";
import Multicarousel1 from "../../src/components/Multicarousel1";
import MulticarouselReviews from "../../src/components/MulticarouselReviews";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { GetCourse } from '../../src/redux/actions/courses'
import { Catagories } from '../../src/components/skeleton'
import instance from "../../src/confiq/axios/instance";
import { GET_CATAGORY } from "../../src/redux/types/types";
const Home: NextPage = () => {
  // const intl = useIntl();

  const dispatch = useDispatch()

  const { Catagory , loader  } = useSelector((state: RootStateOrAny) => state.course)

  useEffect(() => {
    dispatch(GetCourse())
  }, [])


  return (
    <>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>
      <Carousel />
      {loader ? <div style={{ margin: '50px' }}> <Catagories /> </div>
        :
        <div className="">

          <section className="container-3 all-head">
            <div className="courses-bar">
              {Catagory?.map((cat: any, i: number) => (
                <Link href={`/en/courses/${cat.slug}`}>
                  <span key={i} style={{ cursor: 'pointer' }}>
                    <h3 id="bol" >{cat.name}</h3>
                  </span>
                </Link>
              ))}

            </div>
          </section>
          <section className="container-3">
            <div className="feature">
              <h3>Featured Courses</h3>
            </div>
            <div className="container-3">
              <div className="" >
                <Multicarousel cata="feature" />
              </div>
            </div>
          </section>
          <div className="grey">
            <section className="container-3 mt-100 ">
              <div className="feature">
                <h3 className="pt-5">Newest courses</h3>
              </div>
              <div className="container-3">
                <Multicarousel cata="latest" />
              </div>
            </section>
          </div>
          <section className="container-3">
            <h3 className="future text-center">Top Category</h3>
            <div className="container-3">
              <div className="all-category">
                {Catagory ? Catagory.map((cat: any) => (
                  <CategoryCard icon={cat.icon} catagory={cat} key={cat.id} />
                ))
                  : <div>Catagory not Avaliable </div>
                }

              </div>

            </div>
          </section>
          <section className="gr1">
            <div className="all-contant balBus">
              <div className="container mx-auto my-5 ">
                <div className="contant ">
                  <h3>Bolloot for Buisness</h3>
                  <h4>
                    With the right skills,
                    <span>
                      anything's <br /> possible
                    </span>
                  </h4>
                  <p id="trust">
                    Give your team the tools they need to learn and lead
                  </p>
                  <p id="mb-18">
                    Bolloot Buisness is trusted by 10,500+buisness <br />
                    around the world
                  </p>
                  <Link href="/en/bollotBusiness">
                    <button className="btn-1s" >Get started</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="how container-3  mt-100">
            <h3 className="future brown text-center">How it Works</h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet,consectetur sadipiscing elit, sed diam{" "}
              <br />
              nonumy eirmod tempor invidunt ut labore at dolore.
            </p>
            <div className="container-3">
              <div className="all-numbers">
                <div className="one" id="cd-1">
                  <Icons name="c9" />
                  <h3 className="text-center">Register with bolloot</h3>
                </div>
                <div className="one" id="cd-2">
                  <Icons name="c10" />
                  <h3 className="text-center">
                    Purchase a course <br /> that fits you
                  </h3>
                </div>
                <div className="one" id="cd-3">
                  <Icons name="c11" />
                  <h3 className="text-center">Complete the course</h3>
                </div>
                <div className="one" id="cd-4">
                  <Icons name="c12" />
                  <h3 className="text-center">Get certified</h3>
                </div>
              </div>
            </div>
          </section>
          <section className="gry">
            <div className="container-3 pt5p">
              <div className="all-self">
                <div className="self">
                  <h3>Not used To self learning?</h3>
                  <p>
                    'Not used to self learning? Enroll in live courses to take{" "}
                    <br /> scheduled live classes from expert teachers'.
                  </p>
                </div>
                <div className="learn">
                  <Icons name="c13" />
                </div>
              </div>
            </div>
            <div className="container-3">
              <h3 className="future brown">Upcoming Online Classes</h3>
            </div>
            <div className="container-3">
              <div className="">
                <Multicarousel1 />
              </div>
            </div>
          </section>
          <section className="vector-section">
            <div className="container-3">
              <div className="all-vector">
                <InformationCard
                  number="5,679"
                  title="Registered Students"
                  icon="c14"
                />
                <InformationCard
                  number="2,679"
                  title="Student has been helped to achieve their dreams"
                  icon="c15"
                />
                <InformationCard
                  number="10,000"
                  title="More than 10,000 people visits our site monthly"
                  icon="c16"
                />
                <InformationCard
                  number="#10"
                  title="Ranked among the top 10 growing online learning startups in West Africa"
                  icon="c17"
                />
              </div>
            </div>
          </section>
          <section className="student">
            <h3 className="further bold brown text-center ">What Student Say</h3>
            <p className="text-center f-size bold further-2">
              Bolloot is an online education platform that delivers video courses,
              programs and resources for <br /> Individual, Advertising &amp;
              Media Specialist,.
            </p>
            <div className="container-3">
              <MulticarouselReviews />
            </div>
          </section>
          <section className="instructor-section pos-rel">
            <div className="all-ins">
              <div className="ins">
                <img src="/abt.png" alt="" />
              </div>
              <div className="instruc">
                <h3 className="bold brown">Become an Instructor</h3>
                <p>
                  Instructors from around the world teach millions of students on
                  Bolloot. We <br />
                  provide the tools and skills to teach what you love.
                </p>
                <button className="btn-1s">Start Now !!</button>
              </div>
            </div>
            <img src="/side-left.png" className="side-leftimg" />
          </section>
          <div className="last-sec">
            <div>
              <section className="sub">
                <div className="container-3">
                  <div className="all-subs">
                    <div className="subscribe">
                      <h3 className="bold">
                        Subscribe to <br /> Our Newsletter
                      </h3>
                      <p>
                        Get exclusive discounts and latest news deliverd <br /> to
                        your inbox for free!
                      </p>
                    </div>
                    <div className="email">
                      <input
                        type="email"
                        placeholder=" email"
                        className="email-1"
                      />
                      <button className="btn-2s">Submit</button>
                    </div>
                  </div>
                </div>
              </section>
              <div className="all-div-p">
                <section className="all-build">
                  <div className="build">
                    <img src="/bg2.png" alt="" />
                  </div>
                  <div className="build-text">
                    <h3 className="bold">
                      Let’s Build <br /> Something <br /> Great Together
                    </h3>
                    <p>
                      Bolloot is an online education platform that delivers video
                      courses, <br /> programs and resources for Individual,
                      Advertising &amp; Media Specialist, <br /> Online Marketing
                      Professionals, Freelancers and anyone looking to <br />{" "}
                      pursue a career in digital marketing, Accounting, Web
                      development, <br /> Programming. Multimedia and CAD design.
                    </p>
                    <button className="btn-2s">Register Now</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default Home;
