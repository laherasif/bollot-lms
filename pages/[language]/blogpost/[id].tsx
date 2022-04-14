import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";

import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import CommentCard from "../../../src/components/card/CommentCard";
import CommentCard1 from "../../../src/components/card/CommentCard1";
import CommentCard2 from "../../../src/components/card/CommentCard2";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";

const Home: NextPage = () => {
  // const intl = useIntl();

  return (
    <>
      <div>
 <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>        <div className="sm-box">
          <section className="containerms">
            <div className="music">
              <h3>How To; Have A Good Music LIstening Ear</h3>
              <p>19 Augs, 2050 - by Tommy Lang</p>
            </div>
            <div className="music-img">
              <button className="btn p-0">
                <Icons name="c31" />
              </button>
              <button className="btn p-0 hsad0sa-dsd">
                <Icons name="c32" />
              </button>
            </div>
          </section>
          <section className="container-3s">
            <div className="music-text">
              <p className="mb-59">
                Luxury is something everyone deserves from time to time. Such an
                indulgence can make a vacation a truly rejuvenating experience.
                One of the best ways to get the luxury of the rich and famous to
                fit into your budget can be yours through yacht charter
                companies. These companies specialize in creating custom sailing
                vacations that redefine travel.
                <br />
                <br />
                Planning Your Luxury Trip
                <br />
                <br />
                With your budget in mind, it is easy to plan a chartered yacht
                vacation. Companies often have a fleet of sailing vessels that
                can accommodate parties of various sizes. You may want to make
                it a more intimate trip with only close family. There are
                charters that can be rented for as few as two people. These
                include either a sailboat or motorboat and can come with or
                without a crew and captain to sail the ship for you. If you
                choose not to hire a crew, you will have to show that you are
                knowledgeable of sailing and can handle the ship competently.
                <br />
                <br />
                The next part of planning is to determine your starting and
                ending ports. This could be a place close to home and sail in
                one area or start and finish at two different ports. Generally,
                starting and stopping in the same port will save you money and
                is usually more convenient. You can also fly to a destination
                far from home and then sail another exotic sea. There are luxury
                yacht charter companies that cruise the Caribbean and
                Mediterranean seas or around Alaska, the Panama Canal, or
                anyplace you can imagine.
                <br />
                <br />
                Determining the type of cruise is another aspect of planning a
                chartered yachting trip. You can have as little or many crew
                members as the ship will hold. A captain takes all the worries
                out of navigating and onboard housekeeping services make it a
                real vacation that rivals the finest hotel services. You can
                also choose to have a chef and service crew as part of your
                vacation package.
              </p>
              <h2>
                Another Sub-heading Information
                <br />
                will be a perfect fit here.
              </h2>
              <p>
                Luxury is something everyone deserves from time to time. Such an
                indulgence can make a vacation a truly rejuvenating experience.
                One of the best ways to get the luxury of the rich and famous to
                fit into your budget can be yours through yacht charter
                companies. These companies specialize in creating custom sailing
                vacations that redefine travel.
                <br />
                <br />
                Planning Your Luxury Trip
                <br />
                <br />
                With your budget in mind, it is easy to plan a chartered yacht
                vacation. Companies often have a fleet of sailing vessels that
                can accommodate parties of various sizes. You may want to make
                it a more intimate trip with only close family. There are
                charters that can be rented for as few as two people.
              </p>
            </div>
            <div className="music-text">
              <img className="lptp" src="/bg4.png" alt="aaa" />
            </div>
            <div className="music-text">
              <p className="mb-62">
                Luxury is something everyone deserves from time to time. Such an
                indulgence can make a vacation a truly rejuvenating experience.
                One of the best ways to get the luxury of the rich and famous to
                fit into your budget can be yours through yacht charter
                companies. These companies specialize in creating custom sailing
                vacations that redefine travel.
                <br />
                <br />
                Planning Your Luxury Trip
                <br />
                <br />
                With your budget in mind, it is easy to plan a chartered yacht
                vacation. Companies often have a fleet of sailing vessels that
                can accommodate parties of various sizes. You may want to make
                it a more intimate trip with only close family. There are
                charters that can be rented for as few as two people.
              </p>
            </div>
            <div className="music-text">
              <div className="d-flex justify-content-between">
                <div>
                  <h3>Tags: Technology, Design, Computer</h3>
                </div>
                <div className="jaskdf-sdda">
                  <h3>Share with</h3>
                  <img src="/s1.png" alt="" />
                  <img src="/s2.png" alt="" />
                  <img src="/s3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="music-text">
              <div className="dis-flex pd-50  pd-121">
                <h5>9 Marketing Techniques in 2050</h5>
                <h4>
                  Learn What Makes A <br /> Successful Business
                </h4>
              </div>
            </div>
            <div className="music-text">
              <div className="dis-flex pd-50">
                <p>Prev Post</p>
                <p>Next Post</p>
              </div>
            </div>
          </section>

          <section className="music-text">
            <h4 className="come">4 Comment</h4>

            <div className="box-sha">
              <div className="brd-cst1">
                <CommentCard2 />
                <div className="ml5per">
                  <CommentCard2 />
                </div>
              </div>
              <div className="brd-cst1">
                <CommentCard2 />
              </div>
              <div className="brd-cst1">
                <CommentCard2 />
              </div>
            </div>
          </section>
          <section className="music-text">
            <h4 className="come">Leave A Comment</h4>
            <p className="mb-45">
              Your email address will not be published. Required fields are
              marked *
            </p>
          </section>
        </div>
        <div className="pos-rel">
          <div className="form-blog-box-p">
            <div className="form-blog-box">
              <div className="form-blog-box-input mx-2">
                <input placeholder="Name" type="text" />
              </div>
              <div className="form-blog-box-input mx-2">
                <input placeholder="Email" type="text" />
              </div>
            </div>
            <div className="form-blog-box flex-column">
              <div className="form-blog-box-input form-blog-box-input1">
                <textarea rows={10}></textarea>
              </div>
              <div className="d-flex justify-content-center w-100">
              <button className="btn-1 px-5 my-4">Send</button>
            
              </div>
             </div>
          </div>
        </div>
       <div style={{marginTop:80}}>
       <Footer/>
       </div>
      </div>
    </>
  );
};

export default Home;
