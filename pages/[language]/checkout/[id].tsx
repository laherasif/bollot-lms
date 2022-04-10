import type { NextPage } from "next";
import { Form, Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
import OrderDetailCard from "../../../src/components/card/OrderDetailCard";
import React, { useState, useEffect } from "react";
import Footer from "../../../src/components/footer";
import Navbar from "../../../src/components/header/Navbar";
import Icons from "../../../src/icons";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
// import cart from "../cart";
import { ResetCart, SaveCard } from "../../../src/redux/actions/course/course";
import axios from "axios";
import instance from "../../../src/confiq/axios/instance";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatMonth,
} from "../../../src/components/util";
import StripeContainer from "../../../src/components/payment/stripContainer";
import withAuth from '../../../src/components/Hoc/authRoute'
import SucessCheckout from '../../../src/components/sucessCheckout'
const Home: NextPage = () => {
  // const intl = useIntl();
  const [acoountDetail, setAcoountDetail] = useState({
    country: "",
    accountHolder: "",
    number: "",
    month: "",
    year: '',
    SecourtyCode: "",
    zipCode: "",
    focus: "",
    cardType: 0,
  });
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('')
  const [cvc, setCvc] = useState();
  const [card, setCard] = useState();
  const [exMoth, setExMoth] = useState();
  const [exYear, setExYear] = useState();
  const [message, setMessage] = useState(false);
  const [cardDetail, setCardDetail] = useState('');
  const [payments, setPayments] = useState(false);
  const [complPay, setComplPay] = useState(false);

  // const checkSubstring = (length: number, match: any) => {
  //   return acoountDetail.cardNumber.substring(0, length) === match;
  // };


  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "number") {
      event.target.value = formatCreditCardNumber(event.target.value);
    } else if (event.target.name === "month") {
      event.target.value = formatMonth(event.target.value);
    } else if (event.target.name === "year") {
      event.target.value = formatExpirationDate(event.target.value);
    } else if (event.target.name === "SecourtyCode") {
      event.target.value = formatCVC(event.target.value);
    }
    setAcoountDetail({
      ...acoountDetail,
      [event.target.name]: event.target.value,
    });
  };


  const { AddCart, payment_method } = useSelector(
    (state: RootStateOrAny) => state.cartReducer
  );

  const token = useSelector((state: RootStateOrAny) => state?.userReducer?.token)

  console.log("token", token)
  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });



  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true)
    try {
      let detail = {
        card_number: number,
        exp_month: month,
        exp_year: year,
        cvc: SecourtyCode
      }
      let res = await AxInstance.post("api//stripe/card/store", detail)
      if (res.data.success === true) {
        // setCardDetail(res.data.response.card.id)
        dispatch(SaveCard(res.data.response.card.id))
        setAcoountDetail('')
        setLoader(false)
        setPayments(false)
        setComplPay(false)
        setMessage(true)
        setErrors('')

        // router.push("/en/login");
      }
      else {
        let check = typeof res.data.errors
        if (check === "string") {
          setErrors(res.data.errors)
          setLoader(false)
        }
        setLoader(false)
        setCvc(res.data.errors?.cvc[0])
        setCard(res.data.errors?.card_number[0])
        setExMoth(res.data.errors?.exp_month[0])
        setExYear(res.data.errors?.exp_year[0])

      }

    } catch (err) {
      console.log("err", err)

    }
  };

  // const publishableKey =
  //   "pk_test_51KdbUqClKeR1kzza4zH3iiG3UwHY8K29bieZ50VV0BnCtQLQOHuEis2zLBU6ZpjUUibOEmzL6Av9NZelnF8m8uOk00c0mEUCVY";
  // const stripePromise = loadStripe(publishableKey);







  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // debugger
    e.preventDefault();
    setComplPay(true)
    let courses = []
    for (let index = 0; index < AddCart.length; index++) {
      const id = AddCart[index].id;
      const price = AddCart[index].id;
      courses.push({ id: id, price: price })
    }
    let res = await AxInstance.post('api//checkout', { courses: courses, payment_method: payment_method })
    if (res.data.success === true) {
      setComplPay(false)
      dispatch(ResetCart())

    }
    else {
      setLoader(false)

    }
  };


  let totalamount = AddCart ?
    .reduce(
    (total: number, product: string) =>
      total + product.price * product.Quantity,
    0
  )
      .toFixed(2);
  let discount = 120;
  let discountAmount = totalamount - discount;
  // console.log("cart" , AddCart )

  const {
    country,
    accountHolder,
    number,
    month,
    year,
    SecourtyCode,
    zipCode,
    cardType,
  } = acoountDetail;
  return (
    <>
      <div>
        <div className="navBar-cst">
          <div className="container-nav">
            <Navbar />
          </div>
        </div>{" "}
        {loading ? <div style={{ textAlign: 'center', margin: '10rem' }}>
          <Spinner animation="border" />
        </div>
          :
          AddCart.length === 0 ?
            <SucessCheckout />
            :
            <div className="container-3">
              <div className="shipping-2">
                <h3>Checkout</h3>
                <p className="msakdo-sda">Billing Address:</p>
              </div>
              <div className="d-flex justify-content-between hdsafjf-dsa ">
                <div className="jasdf-dsandase">
                  <div className="d-flex">
                    <div style={{ width: "50%" }}>
                      <Form.Select
                        name="country"
                        className="check-input "
                        value={country}
                        onChange={(e) => handleChange(e)}
                      >
                        <option defaultChecked>Select Country</option>
                        <option defaultChecked>Pak</option>
                        <option defaultChecked>Ind</option>
                        <option defaultChecked>USA</option>
                      </Form.Select>
                    </div>

                  </div>
                  <div>
                    <button className="btn">
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="cardType"
                            value={cardType}
                            checked={cardType === 0}
                            onChange={(e) => setAcoountDetail({ cardType: 0 })}
                          />
                        </span>{" "}
                        Credit/Debit Card
                      </div>
                      <div>
                        <img src="/pay.png" />
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="btn">
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="cardType"
                            value={cardType}
                            checked={cardType === 1}
                            onChange={(e) => setAcoountDetail({ cardType: 1 })}
                          />
                        </span>
                        Paypal
                      </div>
                      <div>
                        <img src="/pay1.png" />
                      </div>
                    </button>
                  </div>
                  <div>
                    <span
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => setPayments(!payments)}
                    >
                      + Add another payment method
                    </span>
                  </div>
                  {payment_method ? <div className="alert alert-success s-sm">Payment Method are Added</div>
                    : errors ? <div className="alert alert-danger s-sm"> {errors} </div> : ""}



                  {payments ?
                    <>
                      <div className="d-flex justify-content-between flex-wrap mt-3">
                        <div className="check-input">
                          <input name="accountHolder" value={accountHolder} onChange={(e) => handleChange(e)} placeholder="Cardholders Name" type="text" />
                          {/* {errorss.accountHolder && <div className="invalid mb-1">{errorss?.accountHolder[0]}</div>} */}

                        </div>

                        <div className="check-input " style={{ display: 'flex', flexDirection: 'column' }}>
                          <input
                            pattern="[\d| ]{16,22}"
                            type="tel"
                            name="number" value={number} onChange={(e) => handleChange(e)} placeholder="Card Number " />
                          {card && <div className="invalid mt-2">{card}</div>}

                        </div >
                        <div className="check-input" style={{ margin: '10px 0px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                          <input
                            pattern="\d\d/\d\d"
                            type="tel"
                            name="month" value={month} onChange={(e) => handleChange(e)} placeholder="MM" />

                          {exMoth && <div className="invalid mt-2">{exMoth}</div>}
                        </div>

                        <div className="check-input " style={{ margin: '10px 0px', width: '100%', display: 'flex', flexDirection: 'column' }} >
                          <input
                            pattern="\d\d/\d\d"
                            type="tel"

                            name="year" value={year} onChange={(e) => handleChange(e)} placeholder="YY" />
                          {exYear && <div className="invalid mt-2 ">{exYear}</div>}


                        </div>


                        <div className="check-input mt-3" style={{ display: 'flex', flexDirection: 'column' }} >
                          <input
                            pattern="\d{3,4}"
                            type="tel"
                            maxLength={3} name="SecourtyCode" value={SecourtyCode} onChange={(e) => handleChange(e)} placeholder="Security Code " type="number" />
                          {cvc && <div className="invalid mt-2">{cvc}</div>}

                        </div>
                        <div className="check-input mt-3">
                          <input name="zipCode" value={zipCode} onChange={(e) => handleChange(e)} placeholder="Zip/Postal Code" type="number" />

                        </div>


                      </div>

                      <div style={{ margin: '25px 0px', cursor: 'pointer ' }}>
                        <span
                          className="btn-1s w-100"
                          style={{ padding: '15px 50px' }}
                          onClick={(e) => handleClick(e)}
                        >
                          {loader ?
                            <div className="spinner-border text-light" style={{ marginBottom: '-5px', fontSize: '20px', width: '25px', height: '25px' }} role="status">
                            </div>
                            :
                            "Add "
                          }
                        </span>
                      </div>

                    </>
                    : null}


                </div>
                <div className="photo-maker-2">
                  {
                    payment_method ?
                      "" : <div style={{ color: 'red' }}>Please Add payment then able to checkout </div>
                  }
                  <h4>Summary</h4>
                  <div className="hdsafj-dsae1">
                    <div className="d-flex justify-content-between w-100">
                      <h6>Original price:</h6>
                      <h6>${totalamount}</h6>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <h6>Coupon discount:</h6>
                      <h6>-${discount}</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between hdsafj-dsae">
                    <h6>Total:</h6>
                    <h6>${discountAmount}</h6>
                  </div>
                  <h6 className="mb-0">
                    <Icons name="c34" />
                    MARCH-T22122 is applied
                  </h6>
                  <h6 className="mb-0">
                    <Icons name="c34" />
                    ST11MT22122 is applied
                  </h6>
                  <button
                    className="btn-2s w-100 mt-3"
                    onClick={(e) => handleSubmit(e)}
                    disabled={payment_method ? false : true}
                  >
                    {complPay ?
                      <div className="spinner-border text-light" style={{ marginBottom: '-5px', fontSize: '20px', width: '25px', height: '25px' }} role="status">
                      </div>
                      :
                      " Complete Payment "
                    }

                  </button>
                </div>
              </div>
            </div>
        }
        <Footer />
        {/* {payments ? (
          <StripeContainer openToggle={(e) => setPayments(e)} open={payments} />
        ) : null} */}
      </div>
    </>
  );
};

export default withAuth(Home);
