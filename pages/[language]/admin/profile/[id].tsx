import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Sidebar from "../../../../src/components/admin/sidebar2";
// import { FiSearch } from "react-icons/fi";
// import { BiBell } from "react-icons/bi";
// import { Dropdown } from "react-bootstrap";
// import { IoMailOutline } from "react-icons/io5";
import Icons from "../../../../src/icons";
import TopNavbar from "../../../../src/components/admin/TopNavbar";
import NavigationBar1 from "../../../../src/components/admin/NavigationBar4";
// import Chart from "../../../src/components/chart";
// import Chart1 from "../../../src/components/chart1";
import { useMediaQuery } from "react-responsive";
// import Link from "next/link";
import BookmarkCard from "../../../../src/components/admin/BookmarkCard";
  const options = ["one", "two", "three"];

const UserChatCard = () => {
  return (
    <div className="user-card-inbox">
      <div className="user-card-inbox-inner">
        <img src="/assets/images/umpire-1.svg" />
        <div>
          <h3>John Doe</h3>
          <p>Me: What is difficulty...</p>
        </div>
      </div>
      <div>
        <p>12 Jun</p>
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  // const intl = useIntl();
  const isTabsm = useMediaQuery({
    query: "(min-width: 767px)",
  });
  return (
    <div className="inst idnasd0w3-edsad">
      <NavigationBar1 />
      {
        isTabsm?<div className="w-100 kjaifds-dweniads container">
        <img src="/assets/images/small-logo2.png" />
        <TopNavbar />
      </div>:<></>
      }
      
      <section className="dash-board kjasf-asdasd2 jadsifd-asdasi container">
        <div className="dash-board-1">
          <div className="dash-2 ">
            <div className="my-course jifas-saw3iesd9">
              <h5>
                <Icons name="i20" />
                Go back
              </h5>
            </div>
            <div className="jdsfaf-sdfni3e-d">
              <div>
                <div className="jfoadsf-sadmad">
                  <img src="/assets/images/umpire-1.svg" />
                  <div>
                    <h5>Hardy Fowler</h5>
                    <div className="idfadsf-sads adsjkfdsao-sadsk">
                      <button className="upload-1 sdisad-dsdactive">
                        <Icons name="i21" />
                        Website
                      </button>
                      <button className="upload-1 sdisad-dsdactive">
                        <Icons name="i22" />
                        Youtube
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>Professional Illustrator & Concept Artist</p>
              </div>
            </div>

            <div className="djisajfs-3jeiasd">
              <div className="dsfjaio3-ejsd">
                <div className="fidaso-keosad">
                  <p>Total students</p>
                  <h3>190,691</h3>
                </div>
                <div className="fidaso-keosad">
                  <p>Reviews</p>
                  <h3>25,282</h3>
                </div>
              </div>

              <h4 className="sijdas-w3edj">About Me</h4>
              <div className="jdsfioas03kewsd">
                <p>
                  Hardy is a professional concept artist and illustrator working
                  in New Orleans, LA.
                </p>
                <p>
                  He has designed and painted hundreds of characters, creatures,
                  machines and scenes for numerous entertainment industry
                  clients; and his artwork is featured in elite digital art
                  annuals such as Exposé.
                </p>
                <p>
                  In his courses, Hardy distills down years of industry
                  experience—into transformative courses for serious concept
                  artists
                </p>
              </div>
              <div className="d-flex flex-wrap my-5">
                <BookmarkCard/>
                <BookmarkCard/>
                <BookmarkCard/>
                <BookmarkCard/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
