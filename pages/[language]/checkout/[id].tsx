import type { NextPage } from "next";
import { Form, Spinner } from "react-bootstrap";

import { useIntl } from "react-intl";
// import OrderDetailCard from "../../../src/components/card/OrderDetailCard";
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
import { useRouter } from 'next/router'
import { SweetAlert } from "../../../src/function/hooks";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [acoountDetail, setAcoountDetail] = useState({
    number: "",
    experyDate: "",
    year: '',
    SecourtyCode: "",
    focus: "",
  });
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('')
  const [cardType, setCardType] = useState(0)
  const [cvc, setCvc] = useState('');
  const [card, setCard] = useState('');
  const [exMoth, setExMoth] = useState('');
  const [exYear, setExYear] = useState('');
  const [cardDetail, setCardDetail] = useState([]);
  const [payments, setPayments] = useState(false);
  const [complPay, setComplPay] = useState(false);
  const [buynow, setBuyNow] = useState([])
  const [cards, setCards] = useState([
    '/assets/images/card-amex.svg',
    '/assets/images/card-discover.svg',
    '/assets/images/card-visa.svg',
    '/assets/images/mastercard.svg',
  ])

  // const checkSubstring = (length: number, match: any) => {
  //   return acoountDetail.cardNumber.substring(0, length) === match;
  // };


  console.log("cards", cards)



  const dispatch = useDispatch()

  const router = useRouter()
  let buyNowId = router.query.id


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "number") {
      event.target.value = formatCreditCardNumber(event.target.value);
    } else if (event.target.name === "experyDate") {
      event.target.value = formatMonth(event.target.value);
    } else if (event.target.name === "SecourtyCode") {
      event.target.value = formatCVC(event.target.value);
    }
    setAcoountDetail({
      ...acoountDetail,
      [event.target.name]: event.target.value,
    });
  };


  const { AddCart } = useSelector(
    (state: RootStateOrAny) => state.cartReducer
  );


  const { token, User } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });

  console.log("buyID", buyNowId)

  useEffect(() => {
    if (buyNowId) {
      let fetchBuyNow = async () => {
        try {
          // let res = await AxInstance.get('api//stripe/card/all')
          let res = await AxInstance.get(`api//courses/${buyNowId}`)
          if (res.data.success === true) {
            setBuyNow(res.data.response.course)
          }
        }
        catch (err) {
          console.log("ee", err)
        }
      }
      fetchBuyNow()
    }
  }, [buyNowId])

  useEffect(() => {
    if (!User) {
      router.push('/en/login?checkout=true')
    }
  }, [])


  useEffect(() => {

    let fetchCart = async () => {
      try {
        let res = await AxInstance.get('api//stripe/card/all')
        if (res.data.success === true) {
          setCardDetail(res.data.response.cards)
        }
      }
      catch (err) {
        console.log("ee", err)
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 2000)


    fetchCart()
  }, [])



  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true)
    try {

      let parts = experyDate.split('/');
      let month = parts[0];
      let year = parts[1];

      let detail = {
        card_number: number,
        exp_month: month,
        exp_year: year,
        cvc: SecourtyCode
      }
      let res = await AxInstance.post("api//stripe/card/store", detail)
      if (res.data.success === true) {
        dispatch(SaveCard(res.data.response.card.id))
        setAcoountDetail('')
        setLoader(false)
        setPayments(false)
        setErrors('')
        SweetAlert({ icon: "success", text: "Payment Method Successfuly Added" })

      }
      else {
        let check = typeof res.data.errors
        if (check === "string") {
          setErrors(res.data.errors)
          SweetAlert({ icon: "error", text: res.data.errors })
          setLoader(false)
        }
        else {
          setLoader(false)
          setCard(res.data.errors?.card_number[0])
          setExMoth(res.data.errors?.exp_month[0])
          setExYear(res.data.errors?.exp_year[0])
          setCvc(res.data.errors?.cvc[0])
        }

      }

    } catch (err) {
      setLoader(false)

    }
  };




  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // debugger
    e.preventDefault();
    let courses = []
    if (!buyNowId) {
      for (let index = 0; index < AddCart.length; index++) {
        const id = AddCart[index].id;
        const price = AddCart[index].id;
        courses.push({ id: id, price: price })
      }
    }
    else {
      courses.push({ id: buynow?.id, price: parseInt(buynow?.price) })

    }

    setComplPay(true)
    let res = await AxInstance.post('api//checkout', { courses: courses, payment_method: cardType })
    if (res.data.success === true) {
      setComplPay(false)
      dispatch(ResetCart())
      router.push('/en/student/courses')
    }
    else {
      setLoader(false)

    }
  };


  // let totalamount = AddCart ?
  //   .reduce(
  //   (total: number, product: string) =>
  //     total + product.price * product.Quantity,
  //   0
  // )
  //     .toFixed(2);
  // let discount = 120;

  const totalamount = AddCart.reduce(function (currentTotal: any, obj: any) {
    let str = obj.price.replace(",", "");
    var price = parseFloat(str);
    if (!isNaN(price)) return currentTotal + price * obj.Quantity;
    return currentTotal;
  }, 0).toFixed(2)

  let discountAmount = totalamount;


  const {
    number,
    experyDate,
    SecourtyCode,

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

          <div className="container-3">
            <div className="shipping-2">
              <h3>Checkout</h3>
              <p className="msakdo-sda">Billing Address:</p>
            </div>
            <div className="d-flex justify-content-between hdsafjf-dsa ">
              <div className="jasdf-dsandase">
                {cardDetail ? cardDetail.map((card) => (
                  <div key={card?.id}>
                    <button className="btn" onClick={() => setCardType(card?.id)}>
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="cardType"
                            checked={cardType === card?.id}
                            onChange={(e) => setCardType(card?.id)}
                          />
                        </span>
                        {card?.brand} ( {card?.last4} )
                      </div>
                      <div style={{ display: 'flex' }}>
                        <img src={`/assets/images/${card?.brand}.svg`} alt="cards" style={{ border: '1pt solid ', marginLeft: '5px', width: '40px', padding: '2px', height: '30px' }} />

                      </div>
                    </button>
                  </div>
                ))
                  : <div>No payment method Found </div>
                }

                <div>
                  <span
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => setPayments(!payments)}
                  >
                    + Add another payment method
                  </span>
                </div>

                {payments ?
                  <>
                    <div className="d-flex justify-content-between flex-wrap mt-3">

                      <div className={card ? "check-input  input_filed_error" : "check-input"} style={{ display: 'flex', flexDirection: 'column' }}>
                        <input
                          pattern="[\d| ]{16,22}"
                          type="tel"
                          className="input_filed_error"
                          name="number" value={number} onChange={(e) => handleChange(e)} placeholder="Card Number " />
                        {card && <div className="invalid mt-2">{card}</div>}

                      </div >
                      <div className={exMoth ? "check-input  input_filed_error" : "check-input"} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <input
                          pattern="\d\d/\d\d"
                          type="tel"
                          name="experyDate" value={experyDate} onChange={(e) => handleChange(e)} placeholder="mm/yy" />

                        {exMoth && exYear && <div className="invalid mt-2">{`${exMoth} & ${exYear}`}</div>}
                      </div>
                      <div className={cvc ? "check-input mt-3 input_filed_error " : "check-input mt-3 "} style={{ display: 'flex', flexDirection: 'column' }} >
                        <input
                          pattern="\d{3,4}"
                          type="tel"
                          maxLength={3} name="SecourtyCode" value={SecourtyCode} onChange={(e) => handleChange(e)} placeholder="Security Code " type="number" />
                        {cvc && <div className="invalid mt-2">{cvc}</div>}

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
                  cardType ?
                    "" : <div style={{ color: 'red' }}>Please Add payment then able to checkout </div>
                }
                <h4>Summary</h4>
                <div className="hdsafj-dsae1">
                  <div className="d-flex justify-content-between w-100">
                    <h6>Total:</h6>
                    <h6>${totalamount !== "0.00" ? totalamount : buynow?.price}</h6>
                  </div>
                  <div className="d-flex justify-content-between w-100">
                    <h6>Coupon discount:</h6>
                    <h6>-$ {0}</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between hdsafj-dsae">
                  <h6>Total:</h6>
                  <h6>${discountAmount !== "0.00" ? discountAmount : buynow?.price}</h6>
                </div>
                {/* <h6 className="mb-0">
                    <Icons name="c34" />
                    MARCH-T22122 is applied
                  </h6>
                  <h6 className="mb-0">
                    <Icons name="c34" />
                    ST11MT22122 is applied
                  </h6> */}
                <button
                  className="btn-2s w-100 mt-3"
                  onClick={(e) => handleSubmit(e)}
                  disabled={cardType ? false : true}
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

export default (Home);
