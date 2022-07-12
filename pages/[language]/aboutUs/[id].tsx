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
                Your energy should be consumed in teaching not in travelling miles for teaching – following this motive, we provide a free platform for instructors who believe that they are good teachers, to join Bolloot and start teaching from anywhere across the world.
              </p>
            </div>
            <div className="col-md-6">
              <Image className="images-2" src={CardImage} alt="" />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-6">
              <Image className="images-2" src={CardImage} alt="" />
            </div>
            <div className="col-md-6">
              <h4>Our Services for Students</h4>
              <p>
                Having thousands of courses on our platform, we help students who are eager to learn multiple skills and stacks, to get all they need on the same platform. Keeping your notes and handling multiple drives and accounts usually results in misplacement of your valuable work and books, unlike other traditional learning techniques, we offer modern ways of learning. You can enroll into uploaded courses or if you are not used to self-learning and need some tutor who can solve your queries on-time we have live courses for you.
              </p>
            </div>
          </div>
        </section>

        <section className="jadsiw0ds-adwdmd">
          <div className="container-3">
            <h4>Solutions we provide to Business</h4>
          </div>
          <div>
            <div className="container-3 my-5 kdsfsad-wmesaw">
              <div className="all-numbers">
                <div className="one" id="cd-1">
                  <h3 className="text-center">We have membership plans for businesses to purchase multiple courses in a fixed monthly price. </h3>
                </div>
                <div className="one" id="cd-2">

                  <h3 className="text-center">
                  Bolloot allows you to train your employees without getting them purchase the course separately – one plan for multiple employees.                 </h3>
                </div>
                <div className="one" id="cd-3">
                  <h3 className="text-center">Get special discounts and deals when you register as a company. </h3>
                </div>
                <div className="one" id="cd-4">
                  <h3 className="text-center">Add more to your employees’ skills set to get most out of it. </h3>
                </div>
              </div>
            </div>

          </div>
        </section>
        <section className="jadsiw0ds-adwdmd bg-white py-5">
          <div className="container-3">
            <h4>What our Users Say about us</h4>
          </div>
          <div>
            <div className="container-3 my-5 kdsfsad-wmesaw">
              <MulticarouselReviews type="about" />

            </div>

          </div>
        </section>
        <section className="">
          <div className="container-3">
            <div className="ajsooan3w-aswj2em">
              <Icons name="c44" />
              <div>
                <h4>Mission and Goal Statement</h4>
                <p>Founded in 2021 Bolloot aims to give a vision to the new generation to take the most out of technological advancements and make this be their partner in growth not in crime. To help people learn their desired subjects in an easier and cheaper way is also one of our primary objectives. To help experts spend more time on their productivity instead of travelling from school to school, is one of the motivations that led us start this online learning service so that we can provide a platform to teachers to sell their skills easily.</p>

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
            <div className="container-3 my-5 kdsfsad-wmesaw d-flex justify-content-between w-100 flex-wrap">
              <JoinUsCard title="Learn With Us" para="Find your desired course from thousands of online and uploaded courses to start learning with us today. Learning is easier more than you can imagine – just a few clicks and you got the course. " color={1} btext="Register as Student" link="/en/signup/?join=student" />
              <JoinUsCard title="Teach With Us" para="Get the most out of your teaching skills by starting your courses on Bolloot. Teach the way and the time you want, with easy & free course listing options. " color={2} btext="Register as Teacher" link="/en/signup/?join=instructor" />
              <JoinUsCard title="Grow With Us" para="Upgrade the skillset of your employees by teaching them new coming stacks in the market, in an organized way. Get your business registered on Bolloot and add courses to your employees. " color={3} btext="Register as Company" link="/en/businessSignup" />
            </div>

          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
