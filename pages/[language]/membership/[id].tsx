import axios from "axios";
import moment from "moment";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import instance from "../../../src/confiq/axios/instance";
import { SweetAlert } from "../../../src/function/hooks";


const Home: NextPage = () => {
  // const intl = useIntl();

  const [member, setMember] = useState({})
  const [membership, setmemberships] = useState(null)
  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)
  const { MemberShip } = useSelector((state: RootStateOrAny) => state?.course)


  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  useEffect(() => {
    try {
      let fetchMembership = async () => {
        let res = await AxInstance.get('api//company/current-status')
        if (res.data.success === true) {
          setMember(res.data.response.status)
          setmemberships({ auto_renew: Number(res.data.response?.status?.auto_renew) })
        }
      }
      fetchMembership()
    } catch (error) {

    }
  }, [])

  const handleChange = async (data: number) => {
    console.log("data", data)
    setmemberships({
      ...membership,
      auto_renew: data ? 1 : 0
    });
    let value = {
      subscription_id: member?.id,
      auto_renew: data ? 1 : 0
    }
    try {
      let res = await AxInstance.post('api//company/edit-subscription', value)
      if (res.data.success === true) {
        SweetAlert({ icon: "success", text: res.data.message })
      }
    }
    catch (err) { }

  };


  const EditMemberShip = async (id: number) => {

  }

  const UpgradePlan = async () => {
    let value = {
      // membership_id: find?.id,
      // payment_method: cardType,
      // auto_renew: true
    }
    try {
      let res = await AxInstance.post('')
    }
    catch (err) { }
  }


  console.log("member", member)

  return (
    <>
      <div className="navBar-cst">
        <div className="container-nav">
          <Navbar />
        </div>
      </div>
      <div className="membership ">
        <div className="container">
          <div className="shipping-2">
            <h3>Membership Info</h3>
            <p>Current Membership</p>
          </div>

          {member ?

            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr>
                    <th> Plan </th>
                    <th>  </th>
                    <th>  </th>
                    <th> Price per month </th>
                    <th> Validate Date </th>
                    <th> Renew </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{member?.membership?.title}</td>
                    <td></td>
                    <td></td>
                    <td>${member?.membership?.price_per_month}</td>
                    <td>{moment(member?.valid_till).format('ll')}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        name="renew"
                        onChange={(e) => handleChange(!membership.auto_renew)}
                        checked={membership?.auto_renew === 1 ? true : false}
                        label="Renew Plan"
                      />
                    </td>
                  </tr>
                  {/* {membership && membership.length > 0 ? membership.map((st, i) => (
                  <tr key={i}>
                    <td className="py-1">
                      <img
                        src={st?.image}
                        alt="image"
                        width={50}
                        height={50}
                      />
                    </td>
                    <td> {st?.fullname}</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>{st?.email}</td>
                    <td> {st?.role} </td>
                  </tr>
                ))
                  : <div className='mt-3'>No record Found </div>
                } */}


                </tbody>
              </table>
            </div>
            :
            <h3>You are not subscribed to any membership plan yet </h3>
            // <div style={{fontSize:'2rem' , fontWeight:'500'}}>You are not subscribed to any membership plan yet </div>
          }

        </div>

        <div>
          <section className="layer plans container">
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
                  {/* <Link href={`/en/paymentMethod/?id=${m?.id}`}>
                    <button className="btn-2s" >Get Upgrade now</button>
                  </Link> */}
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
                      User && member?.length > 0
                        ?
                        <Link href={User ? "/en/membership" : "/en/businessSignup"}>
                          <button className="btn-2s">
                            Subscribe
                          </button>
                        </Link>
                        :
                        <Link href={`/en/paymentMethod/${m?.id}`}>
                          <button className="btn-2s" >
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
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
