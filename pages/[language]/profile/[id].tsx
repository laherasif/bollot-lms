import type { NextPage } from "next";
import { Dropdown } from "react-bootstrap";

import { useIntl } from "react-intl";
import BadgeCard from "../../../src/components/card/BadgeCard";
import BlogCard from "../../../src/components/card/BlogCard";
import CartCard from "../../../src/components/card/CartCard";
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
      </div>             <div className="container-3">
          <div className="shipping-2">
            <h3 className="mb-0">Profile</h3>
            <p className="">Add information about yourself</p>
          </div>
          <div>
            <div className="d-flex justify-content-between hdsafjf-dsa ">
              <div className="jasdf-dsandase">
                <div className="">
                  <div className="check-input">
                    <input placeholder="First Name" type="text" />
                    <Icons name="c39" />
                  </div>
                  <div className="check-input">
                    <input placeholder="Last Name" type="text" />
                    <Icons name="c39" />
                  </div>
                  <div className="check-input">
                    <input placeholder="Email" type="text" />
                    <Icons name="c39" />
                  </div>
                  <Dropdown className="sdjfasd-sadsa">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <div>English (US)</div>
                      <div>
                        <Icons name="c35" />
                      </div>
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

                  <button className="btn dafh-dasdsaew">Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="all-card-icon mt-5">
              <BadgeCard/>
              <BadgeCard/>
              <BadgeCard/>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
