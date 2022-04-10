import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";

import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import MulticarouselReviews from "../../../src/components/MulticarouselReviews";
import JoinUsCard from "../../../src/components/card/JoinUsCard";
const CardImage = require("../../../src/images/int-img.png");
const CardImage2 = require("../../../src/images/abt-2.png");

const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <div>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>        <section className="how container-3  mt-100">
          <h3 className="future brown my-5">How it works for students</h3>

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

        <div className="dsamnfssae-sd d-flex justify-content-center">
          <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
        </div>

        <div className="sahdaidsa-wedasd">
          <section className="how container-3  mt-100 my-5 py-5">
            <h3 className="future brown my-5">How it works for instructors</h3>

            <div className="container-3">
              <div className="connect">
                <div className="connect-1">1</div>
                <div className="connect-2"></div>
                <div className="connect-3">
                  <Icons name="c48" />
                  <h3>Register as instructor</h3>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center ">
                <div className="skds-aj3weids9jw"></div>
              </div>
              <div className="d-flex flex-column align-items-end w-100 ">
                <div className="connect w-100 bsjfdjdaf-sadf">
                  <div className="connect-1">2</div>
                  <div className="connect-2"></div>
                  <div className="connect-3">
                    <Icons name="c49" />
                    <h3>Upload courses</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white ">
          <div className="container py-5">
          <h3 className="future brown my-5">How it works for companies</h3>

            <div className="d-flex justify-content-center align-items-center jsad-idsja">
            <div className="mx-5">
              <div className="oadjsfi-awe lsdafjsdc-df lsdafjsdc-dfcsdt">
                <Icons name="c50"/>
              </div>
              <div className="ojds0eds">
              <div className="asjdas-saewsjx1 lsdafjsdc-df lsdafjsdc-dfcsdt">
              <div className="connect-1 asjdas-saewsjx">2</div>
                <h5 >Upload courses</h5>
              </div>
              </div>
              <div className="oadjsfi-awe lsdafjsdc-df lsdafjsdc-dfcsdt">
                <Icons name="c51"/>
              </div>
              <div className="ojds0eds">
              <div className="asjdas-saewsjx1 lsdafjsdc-df lsdafjsdc-dfcsdt">
              <div className="connect-1 asjdas-saewsjx">4</div>
                <h5 >Have a skilled team</h5>
              </div>
              </div>
             
            </div>
            <div className="vl">
            <div className="mx-5">
              
              <div className=" ">
              <div className="asjdas-saewsjx1 lsdafjsdc-df">
              <div className="connect-1 asjdas-saewsjx">1</div>
                <h5 >Register as company</h5>
              </div>
              </div>
              <div className="oadjsfi-awe lsdafjsdc-df">
                <Icons name="c52"/>
              </div>
             
              <div className="">
              <div className="asjdas-saewsjx1 lsdafjsdc-df">
              <div className="connect-1 asjdas-saewsjx">3</div>
                <h5 >Connect your employees</h5>
              </div>
              </div>
              <div className="oadjsfi-awe lsdafjsdc-df">
                <Icons name="c53"/>
              </div>
             
            </div>

            </div>
            </div>
          </div>

          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
