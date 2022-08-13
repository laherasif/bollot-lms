import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";

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
const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>{" "}
        <section className="browse browse-bgii">
       
        </section>
        <div className="container">
        <div>
             <div className="jidsaof-ajwmei">
             <img src="/usr2.png"/>
             <div >
              <div className="kfasjd-3kamwe3"> <h1>Laura Henry</h1>
               <h4>4.6 <Icons name="ipc4"/></h4>
               </div>
               <div className="dksfjaos0-3ekw">
                 <h5>Software Engineer, MBA, PhD, CCIE</h5>
               </div>
               <div className="kasdfjse-sfdsa223">
                 <Icons name="cs1"/>
                 <Icons name="cs2"/>
                 <Icons name="cs3"/>
                 <Icons name="cs4"/>
                 <Icons name="cs5"/>
               </div>
             </div>
             </div>
           </div>

           <div>
             <div className="mkdsoaf-3i34ds">
               <Icons name="cs7"/>
               <h4>11,312 Reviews</h4>
             </div>
             <div className="mkdsoaf-3i34ds">
               <Icons name="cs7"/>
               <h4>199,432 Students</h4>
             </div>
             <div className="mkdsoaf-3i34ds">
               <Icons name="cs7"/>
               <h4>09 Courses</h4>
             </div>
           </div>

           <div className="ljasdf-i3eawj">
           <p>Do you really want to understand and practice instead of sitting and watching long presentations or trying to code along without any clue what is happening behind the scenes?</p>
           <p>Join me in any of my courses and you will get real knowledge based on the deep understanding of every single topic.</p>
<p>But who am I?</p>
<p>Pianalytix Edutech Pvt Ltd uses cutting-edge AI technology & innovative product design to help users learn Machine Learning more efficiently and to implement Machine Learning in the real world. Pianalytix also leverages the power of cutting edge Artificial Intelligence to empower businesses to make massive profits by optimizing processes, maximizing efficiency and increasing profitability. Pianalytix Edutech Pvt Ltd uses cutting-edge AI technology & innovative product design to help users learn Machine Learning more efficiently and to implement Machine Learning in the real world. Pianalytix also leverages the power of cutting edge Artificial Intelligence to empower businesses to make massive profits by optimizing processes, maximizing efficiency and increasing profitability. My name is Bogdan Stashchuk and I teach students more than 20 years. I am working as Software Engineer and love to teach and learn myself.  Pianalytix Edutech Pvt Ltd uses cutting-edge AI technology & innovative product design to help users learn Machine Learning more efficiently and to implement Machine Learning in the real world.</p>
<p>Pianalytix also leverages the power of cutting edge Artificial Intelligence to empower businesses to make massive profits by optimizing processes, maximizing efficiency and increasing profitability.</p>
<p>I have a huge experience in explaining difficult things in an easy to understand format backed up with practice activities. That is the perfect combination that enables you to really learn and retain gained knowledge for a long period of time.</p>
<p>Let's connect in the Social Networks! All links you could find under the profile picture. See you on my courses!
</p>
           </div>
           <p className="ajdsifoe-rerr">See Less <Icons name="cs8"/></p>
           <section className="container-3 mt-100 ">
            <div className="feature">
              <h3 className="pt-5">Newest courses</h3>
            </div>
            <div className="container-3 akdjfd-aserms">
            <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />            </div>

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
                <div className="w-100 kjadfd-sjfe">
                  <RatingBar stars={5} rates="57%" />
                  <RatingBar stars={4} rates="12%" />
                  <RatingBar stars={3} rates="23%" />
                  <RatingBar stars={2} rates="18%" />
                  <RatingBar stars={1} rates="7%" />
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
