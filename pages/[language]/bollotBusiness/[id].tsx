import type { NextPage } from "next";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { useIntl } from "react-intl";
import BlogCard from "../../../src/components/card/BlogCard";
import CommentCard from "../../../src/components/card/CommentCard";
import CommentCard1 from "../../../src/components/card/CommentCard1";
import CommentCard2 from "../../../src/components/card/CommentCard2";
import CourseCard from "../../../src/components/card/CourseCard";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import instance from '../../../src/confiq/axios/instance'
import { GetMembership } from "../../../src/redux/actions/courses";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SweetAlert } from "../../../src/function/hooks";
const Home: NextPage = () => {
  // const intl = useIntl();

  const [member, setMember] = useState({})

  const dispatch = useDispatch()

  const { MemberShip } = useSelector((state: RootStateOrAny) => state?.course)
  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    dispatch(GetMembership())
    try {
      let fetchMembership = async () => {
        let res = await AxInstance.get('api//company/current-status')
        setMember(res.data.response.status)
      }
      fetchMembership()
    }
    catch (err) { 
      SweetAlert({ icon: "error", text: err })

    }
  }, [])


  // const UpgradePlan = async () => {
  //   let value = {
  //     membership_id: find?.id,
  //     payment_method: cardType,
  //     auto_renew: true
  //   }
  //   try {
  //     let res = await AxInstance.post('')
  //   }
  //   catch (err) { }
  // }


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
          {/* <section className="container-3 three-product-sec">
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
          </section> */}
          <section className="container-3 comission-plan">
            <div className="comission-head">
              <h3 className="text-center">Our Plans</h3>
            </div>
            <div className="main-comission">
              <section className="layer plans">
                <section>
                  {MemberShip && MemberShip.map((m: any) => (
                    <section
                      className="third lift plan-tier callout"
                      key={m?.id}
                    >
                      <h4>{m?.title}</h4>
                      <h5>
                        <sup className="superscript">$</sup>
                        <span className="plan-price">{m?.price_per_month}</span>
                      </h5>
                      <p className="early-adopter-price"> Per Month</p>
                      {User && member?.membership?.id === m?.id ?
                        <button className="btn-1s" >
                          Subscribed
                        </button>

                        : User && member ?
                          <Link href={`/en/paymentMethod/${m?.id}`}>
                            <button className="btn-2s" >
                              Get Upgrade now
                            </button>
                          </Link>
                          :
                          <Link href={User ? "/en/membership" : "/en/businessSignup"}>
                            <button className="btn-2s">
                              Subscribe
                            </button>
                          </Link>
                      }
                      <ul>
                        <li>
                          <strong>{m?.courses_allowed}</strong> Course Allowed
                        </li>
                        <li>
                          <strong>{m?.users_per_course_allowed}</strong> Users Allowed
                        </li>

                        <li>
                          {m?.free_trial_days} day <strong>free trial</strong>
                        </li>
                      </ul>
                    </section>
                  ))}
                </section>
              </section>

              {/* <div className="commission-ch-1">
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
              </div> */}
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
