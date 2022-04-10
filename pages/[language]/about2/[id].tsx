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
const CardImage = require("../../../src/images/abt-1.png");
const CardImage2 = require("../../../src/images/abt-2.png");
const CardImage3 = require("../../../src/images/abt-3.png");

const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <div>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>        <section className="browse browse-bg1">
          <div className="container-3 all-browse">
            <div className="our mx-5">
              <h3>We’re Bollootian An E-Learning Platform From USA</h3>
              <p>Be informed! Never miss a single post</p>
            </div>
          </div>
        </section>

        <section className="container-3 my-5 hsajdk-sadnwi">
          <div className="row">
            <div className="col-md-6">
              <h4>Our Services for Students</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="col-md-6">
              <Image className="images-2" src={CardImage} alt="" />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-6">
              <Image className="images-2" src={CardImage2} alt="" />
            </div>
            <div className="col-md-6">
              <h4>Our Services for Students</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Our Services for Students</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="col-md-6">
              <Image className="images-2" src={CardImage3} alt="" />
            </div>
          </div>
        </section>
{/* 
        <section className="jadsiw0ds-adwdmd">
          <div className="container-3">
            <h4>Solutions we provide to Business</h4>
          </div>
          <div>
          <div className="container-3 my-5 kdsfsad-wmesaw">
            <div className="all-numbers">
              <div className="one" id="cd-1">
                 <h3 className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
              </div>
              <div className="one" id="cd-2">
                
                <h3 className="text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.                 </h3>
              </div>
              <div className="one" id="cd-3">
                 <h3 className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
              </div>
              <div className="one" id="cd-4">
                 <h3 className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
              </div>
            </div>
          </div>
          
          </div>
        </section> */}
        <section className="jadsiw0ds-adwdmd bg-white py-5">
          <div className="container-3">
            <h4>What our Users Say about us</h4>
          </div>
          <div>
          <div className="container-3 my-5 kdsfsad-wmesaw">
          <MulticarouselReviews type="about"/>

          </div>
          
          </div>
        </section>
        <section className="">
          <div className="container-3">
            <div className="ajsooan3w-aswj2em">
            <Icons name="c44"/>
              <div>
              <h4>Mission and Goal Statement</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s also the leap into electronic typesetting, <span> remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</span> standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>

              </div>
            </div>
            
          </div>
          <div>
          </div>
        </section>
        <section className="jadsiw0ds-adwdmd bg-white py-5">
          <div className="container-3">
            <h4>Join Us</h4>
          </div>
          <div>
          <div className="jsakd-emw container-3 my-5 kdsfsad-wmesaw d-flex justify-content-between w-100 flex-wrap">
        <JoinUsCard title="Learn With Us" para="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. " color={4} btext="Register as Student"/>
        <JoinUsCard title="Teach With Us" para="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. " color={4} btext="Register as Teacher"/>
        <JoinUsCard title="Grow With Us" para="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. " color={4} btext="Register as Company"/>
          </div>
          
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
