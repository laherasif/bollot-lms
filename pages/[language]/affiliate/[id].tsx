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
        </div>

        <div>
          <section className="container-3 boost-sec my-5">
            <div className="main-boost row">
              <div className="boost-ch-1 col-md-6">
                <h3 className="mb-29">
                  Boost your earnings by Referring Bolloot
                </h3>
                <p className="mb-29">
                  Use your unique link to refer new customer to Bolloot. You
                  earn one time commission on any new transaction that's tied to
                  your referral link. Get commission of 2.5% if you refer a
                  student, 3% if you refer an Instructor and 5% if you refer a
                  company.
                </p>
                <button className="get-started-btn">Get Started</button>
              </div>
              <div className="boost-ch-2 col-md-6">
                <img className="w-100" src="/girls-doc.svg" alt="" />
              </div>
            </div>
          </section>
          <section className="container-3 three-product-sec">
            <h3 className="work-design-sec text-center">How it works</h3>
            <div className="main-pro-sec">
              <div className="parts-1 wh-249 pt-21">
                <img src="/pro-1.svg" alt="" />
                <h3>Join Bolloot</h3>
                <p>It’s free to get started. Refer a friend via link</p>
              </div>
              <div className="parts-1 wh-279">
                <img src="/pr-2.svg" alt="" />
                <h3>Promote Bolloot</h3>
                <p>Your friend registers and you promote Bolloot</p>
              </div>
              <div className="parts-1 wh-320 pt-20">
                <img src="/pro-3.svg" alt="" />
                <h3>Start Earning</h3>
                <p>
                  Earn right from the moment your traffic converts. Check out
                  our commission plan.
                </p>
              </div>
            </div>
            <div className="btn-brown">
              <button>Join Now</button>
            </div>
          </section>
          <section className="container-3 comission-plan">
            <div className="comission-head">
              <h3 className="text-center">Our Commission Plan</h3>
            </div>
            <div className="main-comission">
              <div className="commission-ch-1">
                <img src="/com-1.svg" alt="" />
                <h3>Commission of 2.5% if you refer a student </h3>
              </div>
              <div className="commission-ch-1">
                <img src="/com-2.svg" alt="" />
                <h3>Commission of 2.5% if you refer a student </h3>
              </div>
              <div className="commission-ch-1">
                <img src="/com-3.svg" alt="" />
                <h3>Commission of 2.5% if you refer a student </h3>
              </div>
            </div>
          </section>
          <section className="container-3 Bolloot-Affiliate">
            <div className="Affiliate">
              <h3 className="text-center">Bolloot Affiliate Benefits</h3>
            </div>
            <div className="main-affliate">
              <div className="affliate-img">
                <img src="/dollar.svg" alt="" />
              </div>
              <div className="affliate-text">
                <div className="affliate-ch">
                  <h3>Maximum Earnings</h3>
                  <p>
                    Get paid for every first-time buyer, with no referral limit
                    and a lifetime attribution
                  </p>
                </div>
                <div className="affliate-ch">
                  <h3>Maximum Earnings</h3>
                  <p>
                    Get paid for every first-time buyer, with no referral limit
                    and a lifetime attribution
                  </p>
                </div>
                <div className="affliate-ch">
                  <h3>Maximum Earnings</h3>
                  <p>
                    Get paid for every first-time buyer, with no referral limit
                    and a lifetime attribution
                  </p>
                </div>
                <div className="affliate-ch">
                  <h3>Maximum Earnings</h3>
                  <p>
                    Get paid for every first-time buyer, with no referral limit
                    and a lifetime attribution
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="interested-section">
            <div className="main-interest">
              <div className="interest-ch">
                <h3 className="text-center">
                  Interested in becoming a Bolloot Affiliate?
                </h3>
              </div>
              <div className="affliate-btn">
                <button className="earning">Start Earning Now</button>
              </div>
            </div>
          </section>
        </div>

        <div style={{ marginTop: 80 }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
